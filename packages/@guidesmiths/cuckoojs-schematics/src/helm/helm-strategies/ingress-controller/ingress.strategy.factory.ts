import {HelmStrategyFactory} from '../helm.strategy.factory';
import {TraefikIngressControllerStrategy} from './traefik.Ingress.strategy';
import {GenericIngressControllerStrategy} from './generic.Ingress.strategy';
import {type IngressStrategy} from './ingress.strategy';

export class IngressStrategyFactory extends HelmStrategyFactory<IngressStrategy> {
	create(type: string): IngressStrategy {
		const switcher: Record<string, () => IngressStrategy> = {
			generic: () => new GenericIngressControllerStrategy(),
			traefik: () => new TraefikIngressControllerStrategy(),
		};
		return switcher[type]?.() || switcher.generic();
	}
}
