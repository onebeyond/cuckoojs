import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';

import {RuleBuilderFactory} from './rule-builder/rule.builder.factory';
import {HelmNoneTlsCertStrategy} from './helm-strategies/tls-cert/helm.none.tlsCert.strategy';
import {HelmCertManagerTlsCertStrategy} from './helm-strategies/tls-cert/helm.cert-manager.tlsCert.strategy';
import {HelmGenericIngressControllerStrategy} from './helm-strategies/ingress-controller/helm.generic.IngressController.strategy';
import {HelmTraefikIngressControllerStrategy} from './helm-strategies/ingress-controller/helm.traefik.IngressController.strategy';

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Helm Chart');
	const tlsCertStrategy = options.tlsCertManager === 'none'
		? new HelmNoneTlsCertStrategy()
		: new HelmCertManagerTlsCertStrategy();
	const ingressControllerStrategy = options.ingressController === 'generic'
		? new HelmGenericIngressControllerStrategy()
		: new HelmTraefikIngressControllerStrategy();

	const ruleBuilder = new RuleBuilderFactory().create(ingressControllerStrategy, tlsCertStrategy, context.logger);

	const rule = ruleBuilder.build(options, tree);
	return rule(tree, context);
};
