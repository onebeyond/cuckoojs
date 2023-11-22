import { HelmStrategyFactory } from '../helm.strategy.factory';
import { NoneTlsCertStrategy } from './none.tlsCert.strategy';
import { CertManagerTlsCertStrategy } from './cert-manager.tlsCert.strategy';
import { type TlsCertStrategy } from './tlsCert.strategy';
import { TlsCertTypes, type TlsCertType } from './tlsCertTypes.enum';

export class TlsCertStrategyFactory extends HelmStrategyFactory<TlsCertStrategy> {
  create(type: TlsCertType): TlsCertStrategy {
    const switcher: Record<string, () => TlsCertStrategy> = {
      [TlsCertTypes.NONE]: () => new NoneTlsCertStrategy(),
      [TlsCertTypes.CERT_MANAGER]: () => new CertManagerTlsCertStrategy(),
    };
    return switcher[type]?.() || switcher.none();
  }
}
