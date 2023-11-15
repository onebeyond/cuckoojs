import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {resolve} from 'path';

import {RuleBuilderFactory} from './rule-builder/rule.builder.factory';

interface Options {
	serviceName: string;
	imageName: string;
	resourcesLimitCpu: string;
	resourcesLimitMemory: string;
	resourcesRequestCpu: string;
	resourcesRequestMemory: string;
	autoscalingEnabled: boolean;
	autoscalingReplicasMin: number;
	autoscalingReplicasMax: number;
	autoscalingTargetCpu: number;
}

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating Helm Chart...');

		const ruleBuilder = new RuleBuilderFactory().create({
      ingressType: options.ingressController as string,
      tlsCertType: options.tlsCertManager as string,
      logger: context.logger,
    });

    const rule = ruleBuilder.build(options, tree);
    return rule(tree, context);
	};
}
