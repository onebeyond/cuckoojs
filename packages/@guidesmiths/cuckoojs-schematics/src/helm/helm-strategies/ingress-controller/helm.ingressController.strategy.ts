import {BaseHelmStrategy} from '../base.helm.strategy';

export class HelmIngressControllerStrategy extends BaseHelmStrategy {
	constructor() {
		super();
		this.templatePath.push('ingress');
	}

	enrichOptions(options: any): any {
		return options;
	}
}

