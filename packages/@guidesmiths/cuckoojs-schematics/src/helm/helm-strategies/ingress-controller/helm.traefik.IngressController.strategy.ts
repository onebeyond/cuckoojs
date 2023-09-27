import {apply, url, template, mergeWith, MergeStrategy} from '@angular-devkit/schematics';
import {HelmIngressControllerStrategy} from './helm.ingressController.strategy';
import {join} from 'path';

export class HelmTraefikIngressControllerStrategy extends HelmIngressControllerStrategy {
	addResources = (options: any) => {
		const filePath = join(__dirname, '..', 'files', 'ingress', 'traefik');
		return mergeWith(
			apply(url(filePath), [template({...options})]),
			MergeStrategy.Overwrite,
		);
	};
}
