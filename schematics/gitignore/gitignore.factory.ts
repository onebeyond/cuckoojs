import type {
	Rule,
	SchematicContext,
	Tree,
} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith,
	move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

export function main(options: any): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating .gitignore file');

		const templateSource = apply(url('./files'), [
			template({}),
			move(normalize(options.directory)),
			renameFile(options),
		]);

		return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
	};
}

function renameFile(options: any): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Will create files from templates');
		// create files implementation
		tree.rename(`${normalize(options.directory)}/gitignore`, `${normalize(options.directory)}/.gitignore`);
		return tree;
	};
}
