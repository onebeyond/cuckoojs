import {
	apply,
	MergeStrategy,
	mergeWith,
	type Rule,
	type SchematicContext,
	template,
	type Tree,
	url,
	SchematicsException,
} from '@angular-devkit/schematics';

import {join} from 'path';

type PackageJson = {
	scripts: Record<string, string>;
};

type HelmTypeStrategy = {
	filePath: string;
	helmChartName: string;
};

type HelmTypeStrategies = Record<string, HelmTypeStrategy>;

const helmTypeStrategies: HelmTypeStrategies = {
	generic: {
		filePath: 'generic',
		helmChartName: 'onebeyond/one-beyond-generic-service:0.1.9',
	},
	ob: {
		filePath: 'ob',
		helmChartName: 'onebeyond/one-beyond-service:0.1.9',
	},
};

const selectHelmTypeStrategy = (type: string): HelmTypeStrategy => helmTypeStrategies[type] || helmTypeStrategies.generic;

const execFactoryStrategy = (options: any, tree: Tree) => (strategy: HelmTypeStrategy) => {
	const packageJsonBuffer = tree.read('./package.json');
	const serviceName = options?.serviceName as string | undefined;
	if (!packageJsonBuffer) {
		throw new SchematicsException('Could not read package.json file');
	}

	if (!serviceName) {
		throw new SchematicsException('No service name specified');
	}

	const packageJsonString = packageJsonBuffer.toString();
	const packageJsonObject: PackageJson = JSON.parse(packageJsonString) as PackageJson;

	packageJsonObject.scripts = {
		...packageJsonObject.scripts,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'helm:upgrade': `helm upgrade -f ./.helm/values.yml ${serviceName} ${strategy.helmChartName}`,
	};

	tree.overwrite('./package.json', JSON.stringify(packageJsonObject, null, 2));

	const filePath = join(__dirname, 'files', strategy.filePath);
	return apply(url(filePath), [
		template({...options}),
	]);
};

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Creating Helm Chart');
	const strategy = selectHelmTypeStrategy(options?.helmType);
	const templateSource = execFactoryStrategy(options, tree)(strategy);
	return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
};
