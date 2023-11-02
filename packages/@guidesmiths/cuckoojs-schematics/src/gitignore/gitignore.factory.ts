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
import {resolve} from 'path';

type Options = {
	directory: string;
};

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating .gitignore file...');

		const templateSource = apply(url(resolve('.', 'files')), [
			template({}),
			move(normalize(options.directory)),
			renameFile(options),
		]);

		return mergeWith(templateSource, MergeStrategy.Overwrite);
	};
}

function renameFile(options: Options): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const normalizedPath = normalize(options.directory);
		tree.rename(
			resolve(normalizedPath, 'gitignore'),
			resolve(normalizedPath, '.gitignore'),
		);
		return tree;
	};
}
