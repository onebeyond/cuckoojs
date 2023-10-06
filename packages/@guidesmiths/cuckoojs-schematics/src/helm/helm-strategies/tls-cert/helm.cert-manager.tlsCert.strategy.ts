import {HelmTlsCertStrategy} from './helm.tlsCert.strategy';

export class HelmCertManagerTlsCertStrategy extends HelmTlsCertStrategy {
	constructor() {
		super(true);
		this.templatePath.push('cert-manager');
	}
}
