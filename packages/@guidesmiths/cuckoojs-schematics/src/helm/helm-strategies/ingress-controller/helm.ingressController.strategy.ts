import {type Rule} from '@angular-devkit/schematics';
import {type BaseHelmStrategy} from '../base.helm.strategy';
// import {type HelmTlsCertStrategy} from '../tls-cert/helm.tlsCert.strategy';

export abstract class HelmIngressControllerStrategy implements BaseHelmStrategy {
	abstract addResources: (options: any) => Rule;
	/*
	constructor(private readonly tlsCertStrategy: HelmTlsCertStrategy) {}
	*/
}

