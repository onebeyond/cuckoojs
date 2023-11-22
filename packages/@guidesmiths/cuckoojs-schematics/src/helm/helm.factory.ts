import {
  type Rule,
  type SchematicContext,
  type Tree,
} from '@angular-devkit/schematics';

import { RuleBuilderFactory } from './rule-builder/rule.builder.factory';
import { type IngressType } from './helm-strategies/ingress-controller/ingressTypes.enum';
import { type TlsCertType } from './helm-strategies/tls-cert/tlsCertTypes.enum';

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
  ingressController: IngressType;
  tlsCertManager: TlsCertType;
  domainName: string;
}

export function main(options: Options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Helm Chart...');

    const ruleBuilder = new RuleBuilderFactory().create({
      ingressType: options.ingressController,
      tlsCertType: options.tlsCertManager,
      logger: context.logger,
    });

    const rule = ruleBuilder.build(options, _tree);
    return rule(_tree, context);
  };
}
