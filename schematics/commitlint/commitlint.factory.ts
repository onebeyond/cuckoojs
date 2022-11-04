import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	chain,
	MergeStrategy,
	mergeWith,
	move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

export function main(options: any): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding commitlint ...');
		const path = normalize(options.directory);
		const templateSource = apply(url('./files'), [
			template({}),
			move(path),
		]);

		const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

		return chain([
			merged,
			updatePackageJson(path),
		])(tree, context);
	};
}

function updatePackageJson(directory: string): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const path = `${directory}/package.json`;
		const file = tree.read(path);
		const json = JSON.parse(file!.toString());

		if (!json.devDependencies) {
			json.devDependencies = {};
		}

		json.devDependencies['@commitlint/cli'] = '^17.1.2';
		json.devDependencies['@commitlint/config-conventional'] = '^17.1.0';

		tree.overwrite(path, JSON.stringify(json, null, 2));
		return tree;
	};
}
