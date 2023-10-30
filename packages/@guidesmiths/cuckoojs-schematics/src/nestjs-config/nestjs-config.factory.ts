import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith, move,
	template,
	chain,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {addConfigToModuleRule} from './utils/add-config-to-module-rule';
import {PackageJsonUtils} from '../utils/package-json.utils';

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const main = (options: {directory: string}): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Nest basic config files...');

	const appFile = './src/app.module.ts';
	if (!tree.exists(normalize('./nest-cli.json')) || !tree.exists(normalize(appFile))) {
		context.logger.info(
			'This is not a nestJs project. Schematic will not create the config files in this folder.',
		);
		return;
	}

	const templateSource = apply(url('./files'), [
		template({...options}),
		move(normalize(options.directory)),
	]);

	const rule = chain([
		mergeWith(templateSource, MergeStrategy.Overwrite),
		addConfigToModuleRule(appFile),
		updatePackageJson(),
		installDependencies(),
	]);

	return rule(tree, context);
};

const updatePackageJson = (): Rule => (tree: Tree, _context: SchematicContext) => {
	const path = 'package.json';
	const packageJsonUtils = new PackageJsonUtils(tree, path);
	packageJsonUtils.addPackage('@nestjs/config', '^3.1.1', false);
	packageJsonUtils.addPackage('class-transformer', '^0.5.1', false);
	packageJsonUtils.addPackage('class-validator', '^0.14.0', false);
	packageJsonUtils.addPackage('lodash.merge', '^4.6.2', false);

	return tree;
};

const installDependencies = (): Rule => (tree: Tree, context: SchematicContext) => {
	context.addTask(new NodePackageInstallTask());

	return tree;
};

