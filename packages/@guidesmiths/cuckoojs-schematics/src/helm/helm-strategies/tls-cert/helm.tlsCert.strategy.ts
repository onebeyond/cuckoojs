import {BaseHelmStrategy} from '../base.helm.strategy';

export class HelmTlsCertStrategy extends BaseHelmStrategy {
	protected constructor(readonly isTlsEnabled: boolean) {
		super();
		this.templatePath.push('dns-certs');
	}
}
