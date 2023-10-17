import {TlsCertStrategy} from './tlsCert.strategy';

export class NoneTlsCertStrategy extends TlsCertStrategy {
	constructor() {
		super(false);
		this.templatePath.push('none');
	}
}
