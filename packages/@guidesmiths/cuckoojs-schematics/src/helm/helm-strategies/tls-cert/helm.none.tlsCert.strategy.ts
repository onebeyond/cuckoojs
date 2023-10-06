import {HelmTlsCertStrategy} from './helm.tlsCert.strategy';

export class HelmNoneTlsCertStrategy extends HelmTlsCertStrategy {
	constructor() {
		super(false);
		this.templatePath.push('none');
	}
}
