import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';

import {RuleBuilderFactory} from './rule-builder/rule.builder.factory';

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Helm Chart');

	const ruleBuilder = new RuleBuilderFactory().create({
		ingressType: options.ingressController as string,
		tlsCertType: options.tlsCertManager as string,
		logger: context.logger,
	});

	const rule = ruleBuilder.build(options, tree);
	return rule(tree, context);
};
