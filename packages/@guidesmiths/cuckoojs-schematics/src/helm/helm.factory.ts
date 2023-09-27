import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';

import {RuleBuilderFactory} from './rule-builder/rule.builder.factory';

export const main = (options: any): Rule => async (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Helm Chart');
	const ruleBuilder = new RuleBuilderFactory().create(context.logger);
	const rule = ruleBuilder.build(options, tree);
	return rule(tree, context);
};
