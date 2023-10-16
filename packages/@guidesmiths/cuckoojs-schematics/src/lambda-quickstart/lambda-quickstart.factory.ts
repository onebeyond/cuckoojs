import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith, move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const main = (options: {directory: string}): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Lambda Quickstart');

	const templateSource = apply(url('./files'), [
		template({...options}),
		move(normalize(options.directory)),
		renameFile(options),
	]);

	return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
};

function renameFile(options: any): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const normalizedPath = normalize(options.directory);
		tree.rename(`${normalizedPath}/nvmrc`, `${normalizedPath}/.nvmrc`);
		tree.rename(`${normalizedPath}/env.sample`, `${normalizedPath}/.env.sample`);
		return tree;
	};
}
