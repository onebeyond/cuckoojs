import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply, chain,
	MergeStrategy,
	mergeWith,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Dockerfile');

	const templateSourceDockerfile = apply(url(`./files/${options.buildType}`), [
		template({...options}),
	]);
	const mergedDockerfile = mergeWith(templateSourceDockerfile, MergeStrategy.Overwrite);

	const templateSourceDockerignore = apply(url('./files/common'), [
		template({...options}),
	]);
	const mergedDockerignore = mergeWith(templateSourceDockerignore, MergeStrategy.Overwrite);

	return chain([
		mergedDockerfile,
		mergedDockerignore,
		renameDockerignore(options),
	])(tree, context);
};

const renameDockerignore = (options: any): Rule => (tree: Tree, _context: SchematicContext) => {
	const normalizedPath = normalize(options.directory);
	tree.rename(`${normalizedPath}/dockerignore`, `${normalizedPath}/.dockerignore`);
	return tree;
};
