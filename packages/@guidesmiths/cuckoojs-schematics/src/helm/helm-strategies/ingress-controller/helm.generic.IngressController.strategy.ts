import {HelmIngressControllerStrategy} from './helm.ingressController.strategy';

export class HelmGenericIngressControllerStrategy extends HelmIngressControllerStrategy {
	constructor() {
		super();
		this.templatePath.push('generic');
	}
}
