import {HelmIngressControllerStrategy} from './helm.ingressController.strategy';

export class HelmTraefikIngressControllerStrategy extends HelmIngressControllerStrategy {
	constructor() {
		super();
		this.templatePath.push('traefik');
	}
}
