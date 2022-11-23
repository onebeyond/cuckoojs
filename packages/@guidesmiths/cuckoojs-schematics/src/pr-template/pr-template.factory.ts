import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith,
	template,
	url,
} from '@angular-devkit/schematics';

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Pull Request Template');

	const templateSource = apply(url('./files'), [
		template({...options}),
	]);

	return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
};
