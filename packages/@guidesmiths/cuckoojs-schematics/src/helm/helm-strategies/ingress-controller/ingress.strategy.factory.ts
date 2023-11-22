import { HelmStrategyFactory } from '../helm.strategy.factory';
import { TraefikIngressControllerStrategy } from './traefik.Ingress.strategy';
import { GenericIngressControllerStrategy } from './generic.Ingress.strategy';
import { type IngressStrategy } from './ingress.strategy';
import { IngressTypes, type IngressType } from './ingressTypes.enum';

export class IngressStrategyFactory extends HelmStrategyFactory<IngressStrategy> {
  create(type: IngressType): IngressStrategy {
    const switcher: Record<string, () => IngressStrategy> = {
      [IngressTypes.GENERIC]: () => new GenericIngressControllerStrategy(),
      [IngressTypes.TRAEFIK]: () => new TraefikIngressControllerStrategy(),
    };
    return switcher[type]?.() || switcher.generic();
  }
}
