import {apply, mergeWith, url, template, MergeStrategy} from '@angular-devkit/schematics';
import {type HelmTlsCertStrategy} from './helm.tlsCert.strategy';
import {join} from 'path';

export class HelmCertManagerTlsCertStrategy implements HelmTlsCertStrategy {
	isTlsEnabled = true;
	addResources = (options: any) => {
		const filePath = join(__dirname, '..', '..', 'files', 'dns-certs', 'cert-manager');
		return mergeWith(
			apply(url(filePath), [template({...options})]),
			MergeStrategy.Overwrite,
		);
	};
}
