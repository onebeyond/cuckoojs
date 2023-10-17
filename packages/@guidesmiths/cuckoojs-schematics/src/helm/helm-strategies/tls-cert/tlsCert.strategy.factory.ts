import {HelmStrategyFactory} from '../helm.strategy.factory';
import {NoneTlsCertStrategy} from './none.tlsCert.strategy';
import {CertManagerTlsCertStrategy} from './cert-manager.tlsCert.strategy';
import {type TlsCertStrategy} from './tlsCert.strategy';

export class TlsCertStrategyFactory extends HelmStrategyFactory<TlsCertStrategy> {
	create(type: string): TlsCertStrategy {
		const switcher: Record<string, () => TlsCertStrategy> = {
			none: () => new NoneTlsCertStrategy(),
			certManager: () => new CertManagerTlsCertStrategy(),
		};
		return switcher[type]?.() || switcher.none();
	}
}
