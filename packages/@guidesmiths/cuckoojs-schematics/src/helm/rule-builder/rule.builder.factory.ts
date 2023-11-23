import { type LoggerApi } from '@angular-devkit/core/src/logger';
import { RuleBuilder } from './rule.builder';
import { IngressStrategyFactory } from '../helm-strategies/ingress-controller/ingress.strategy.factory';
import { TlsCertStrategyFactory } from '../helm-strategies/tls-cert/tlsCert.strategy.factory';
import { type TlsCertStrategy } from '../helm-strategies/tls-cert/tlsCert.strategy';
import { type IngressType } from '../helm-strategies/ingress-controller/ingressTypes.enum';
import { type TlsCertType } from '../helm-strategies/tls-cert/tlsCertTypes.enum';

interface RuleBuilderFactoryInput {
  ingressType: IngressType;
  tlsCertType: TlsCertType;
  logger: LoggerApi;
}
export class RuleBuilderFactory {
  create = ({
    ingressType,
    tlsCertType,
    logger,
  }: RuleBuilderFactoryInput): RuleBuilder => {
    const ingressStrategy = new IngressStrategyFactory().create(ingressType);
    const tlsCertStrategy: TlsCertStrategy =
      new TlsCertStrategyFactory().create(tlsCertType);
    return new RuleBuilder(ingressStrategy, tlsCertStrategy, logger);
  };
}
