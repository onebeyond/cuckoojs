import {IngressStrategy} from './ingress.strategy';

export class TraefikIngressControllerStrategy extends IngressStrategy {
	constructor() {
		super();
		this.templatePath.push('traefik');
	}
}
