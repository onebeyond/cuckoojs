import { HelmStrategy } from '../helm.strategy';

export class TlsCertStrategy extends HelmStrategy {
  protected constructor(readonly isTlsEnabled: boolean) {
    super();
    this.templatePath.push('dns-certs');
  }

  enrichOptions(options: any): any {
    return {
      ...options,
      isTlsEnabled: this.isTlsEnabled,
    };
  }
}
