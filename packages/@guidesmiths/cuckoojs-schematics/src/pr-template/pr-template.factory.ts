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
import {normalize} from "@angular-devkit/core";

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Pull Request Template');

	const templateSource = apply(url('./files'), [
		template({...options}),
		move(normalize(options.directory)),
	]);

	return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
};
