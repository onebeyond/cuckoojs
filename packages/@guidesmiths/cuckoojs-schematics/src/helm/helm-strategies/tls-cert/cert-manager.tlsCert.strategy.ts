import { TlsCertTypes } from './TlsCertTypes.enum';
import { TlsCertStrategy } from './tlsCert.strategy';

export class CertManagerTlsCertStrategy extends TlsCertStrategy {
  constructor() {
    super(true);
    this.templatePath.push(TlsCertTypes.CERT_MANAGER);
  }
}
