import {type LoggerApi} from '@angular-devkit/core/src/logger';
import {RuleBuilder} from './rule.builder';
import {type HelmIngressControllerStrategy} from '../helm-strategies/ingress-controller/helm.ingressController.strategy';
import {type HelmTlsCertStrategy} from '../helm-strategies/tls-cert/helm.tlsCert.strategy';

export class RuleBuilderFactory {
	create = (
		ingressControllerStrategy: HelmIngressControllerStrategy,
		tlsCertStrategycontext: HelmTlsCertStrategy,
		logger: LoggerApi,
	): RuleBuilder => new RuleBuilder(ingressControllerStrategy, tlsCertStrategycontext, logger);
}
