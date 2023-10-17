import {type LoggerApi} from '@angular-devkit/core/src/logger';
import {RuleBuilder} from './rule.builder';
import {IngressStrategyFactory} from '../helm-strategies/ingress-controller/ingress.strategy.factory';
import {TlsCertStrategyFactory} from '../helm-strategies/tls-cert/tlsCert.strategy.factory';
import {type TlsCertStrategy} from '../helm-strategies/tls-cert/tlsCert.strategy';

type RuleBuilderFactoryInput = {
	ingressType: string;
	tlsCertType: string;
	logger: LoggerApi;
};
export class RuleBuilderFactory {
	create = ({
		ingressType,
		tlsCertType,
		logger,
	}: RuleBuilderFactoryInput,
	): RuleBuilder => {
		const ingressStrategy = new IngressStrategyFactory().create(ingressType);
		const tlsCertStrategy: TlsCertStrategy = new TlsCertStrategyFactory().create(tlsCertType);
		return new RuleBuilder(ingressStrategy, tlsCertStrategy, logger);
	};
}
