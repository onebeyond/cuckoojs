import {IngressStrategy} from './ingress.strategy';

export class GenericIngressControllerStrategy extends IngressStrategy {
	constructor() {
		super();
		this.templatePath.push('generic');
	}
}
