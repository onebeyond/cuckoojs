export type HelmConfig = {
	filePath: string;
	helmChartName: string;
};

type HelmConfigs = Record<string, HelmConfig>;

const genericHelmConfig: HelmConfig = {
	filePath: 'generic',
	helmChartName: './.helm',
};

const obHelmConfig: HelmConfig = {
	filePath: 'ob',
	helmChartName: 'onebeyond/one-beyond-service:0.1.9',
};

export const helmConfigs: HelmConfigs = {
	generic: genericHelmConfig,
	ob: obHelmConfig,
};
