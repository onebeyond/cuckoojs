import type {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {externalSchematic, branchAndMerge, chain} from '@angular-devkit/schematics';
import {RunSchematicTask} from '@angular-devkit/schematics/tasks';
import {join} from 'path';
import type {ApplicationSchema} from './application.schema';

type PackageEntry = {
	name: string;
	value: string;
};

type PackageSection = 'scripts' | 'dependencies' | 'devDependencies';

type EnsurePackageSection = {
	tree: Tree;
	name: string;
	section: PackageSection;
	entry: PackageEntry;
	sort?: boolean;
};

type PackageJson = Record<PackageSection, Record<string, string>>;

export function application(options: ApplicationSchema): Rule {
	return (tree: Tree, context: SchematicContext) => chain([
		branchAndMerge(createNestApplication(options)),
		addPackageToDevDependencies(options, {name: 'husky', value: '~8.0.1'}),
		addNpmScript(options, {name: 'prepare', value: 'husky install'}),
		initProject(options),
	])(tree, context);
}

function createNestApplication(options: ApplicationSchema): Rule {
	return externalSchematic(
		'@nestjs/schematics',
		'application',
		{name: options.name},
	);
}

const sortObjectKeys = (o: Record<string, any>): Record<string, any> => (Object(o) !== o || Array.isArray(o)
	? o
	: Object.keys(o).sort().reduce((a, k) => ({...a, [k]: sortObjectKeys(o[k])}), {}));

function ensurePackageSection({tree, name, section, entry, sort = false}: EnsurePackageSection): Tree {
	const packageJsonPath = join(name, 'package.json');
	if (tree.exists(packageJsonPath)) {
		const sourceText = tree.read(packageJsonPath)!.toString('utf-8');
		const json = JSON.parse(sourceText) as PackageJson;

		if (!(json[section])) {
			json[section] = {};
		}

		json[section][entry.name] = entry.value;

		if (sort) {
			json[section] = sortObjectKeys(json[section]);
		}

		tree.overwrite(packageJsonPath, JSON.stringify(json, null, 2));
	}

	return tree;
}

function addNpmScript(options: ApplicationSchema, script: PackageEntry) {
	return (tree: Tree, _context: SchematicContext): Tree => ensurePackageSection({
		tree, name: options.name, section: 'scripts', entry: script,
	});
}

function addPackageToDevDependencies(options: ApplicationSchema, pkg: PackageEntry): Rule {
	return (tree: Tree, _context: SchematicContext): Tree => ensurePackageSection({
		tree, name: options.name, section: 'devDependencies', entry: pkg, sort: true,
	});
}

function initProject(options: ApplicationSchema): Rule {
	return (host: Tree, context: SchematicContext): Tree => {
		const taskId = context.addTask(new RunSchematicTask('git-init', options));
		context.addTask(new RunSchematicTask('npm-install', options), [taskId]);
		return host;
	};
}
