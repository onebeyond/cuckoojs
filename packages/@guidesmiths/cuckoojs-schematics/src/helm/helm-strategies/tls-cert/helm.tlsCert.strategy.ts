import {type BaseHelmStrategy} from '../base.helm.strategy';

export type HelmTlsCertStrategy = BaseHelmStrategy & {
	isTlsEnabled: boolean;
};
