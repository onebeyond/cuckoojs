import {type Tree} from '@angular-devkit/schematics';
import {type HelmTlsCertStrategy} from './helm.tlsCert.strategy';

export class HelmNoneTlsCertStrategy implements HelmTlsCertStrategy {
	isTlsEnabled = false;
	addResources = () => (tree: Tree) => tree;
}
