import {
	apply,
	MergeStrategy,
	mergeWith,
	type Rule,
	SchematicsException,
	template,
	type Tree,
	url,
} from '@angular-devkit/schematics';
import {join} from 'path';

type PackageJson = {
	scripts: Record<string, string>;
};

export class RuleBuilder {
	constructor(
		private readonly filePath: string,
		private readonly helmChartName: string) {
		this.filePath = filePath;
		this.helmChartName = helmChartName;
	}

	buildPackageJson = (packageJsonBuffer: Buffer, serviceName: string, tree: Tree) => {
		const packageJsonString = packageJsonBuffer.toString();
		const packageJsonObject: PackageJson = JSON.parse(packageJsonString) as PackageJson;

		packageJsonObject.scripts = {
			...packageJsonObject.scripts,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'helm:upgrade': `helm upgrade -f ./.helm/values.yml ${serviceName} ${this.helmChartName}`,
		};

		tree.overwrite('./package.json', JSON.stringify(packageJsonObject, null, 2));
	};

	addHelmChartToTemplate = (options: any) => {
		const filePath = join(__dirname, 'files', this.filePath);
		return apply(url(filePath), [
			template({...options}),
		]);
	};

	build = (options: any, tree: Tree): Rule => {
		const packageJsonBuffer = tree.read('./package.json');
		const serviceName = options?.serviceName as string | undefined;
		if (!packageJsonBuffer) {
			throw new SchematicsException('Could not read package.json file');
		}

		if (!serviceName) {
			throw new SchematicsException('No service name specified');
		}

		this.buildPackageJson(packageJsonBuffer, serviceName, tree);
		const templateSource = this.addHelmChartToTemplate(options);
		return mergeWith(templateSource, MergeStrategy.Overwrite);
	};
}
