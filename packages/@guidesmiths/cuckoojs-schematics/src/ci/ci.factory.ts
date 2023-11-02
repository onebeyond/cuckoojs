import {
	apply,
	MergeStrategy,
	mergeWith,
	type Rule,
	type SchematicContext,
	template,
	type Tree,
	url,
} from '@angular-devkit/schematics';
import {resolve} from 'path';

type Options = {
	ciProvider: string;
	dockerRegistry: string;
	imageName: string;
};

export function main(options: Options): Rule {
	return async (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating CI configuration...');

		const templateSource = apply(
			url(resolve('.', 'files', options.ciProvider)),
			[template({...options})],
		);

		return mergeWith(templateSource, MergeStrategy.Overwrite);
	};
}
