import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';

import {helmConfigs} from './helm.configs';
import {RuleBuilderFactory} from './rule.builder.factory';

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Helm Chart');
	const config = helmConfigs[options?.helmType] || helmConfigs.generic;
	const ruleBuilder = new RuleBuilderFactory().create(config);
	const rule = ruleBuilder.build(options, tree);
	return rule(tree, context);
};
