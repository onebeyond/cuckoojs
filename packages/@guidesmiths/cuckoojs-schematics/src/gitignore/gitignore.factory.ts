import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith,
	move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

interface Options {
	directory: string;
}

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating .gitignore file...');

		const templateSource = apply(url(normalize('./files')), [
			template({}),
			move(normalize(options.directory)),
			renameFile(options),
		]);

		return mergeWith(templateSource, MergeStrategy.Overwrite);
	};
}

function renameFile(options: Options): Rule {
	return (tree: Tree) => {
		tree.rename(
      normalize(`${options.directory}/gitignore`),
      normalize(`${options.directory}/.gitignore`),
		);
		return tree;
	};
}
