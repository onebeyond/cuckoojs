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
import {addConfigToModuleRule} from './add-config-to-module-rule';
import {normalize} from '@angular-devkit/core';

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
		mergeWith(templateSource, MergeStrategy.Overwrite), addConfigToModuleRule(appFile),
	]);

	return rule(tree, context);
};

