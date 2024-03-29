import {
  apply,
  MergeStrategy,
  mergeWith,
  type Rule,
  SchematicsException,
  template,
  type Tree,
  url,
  chain,
} from '@angular-devkit/schematics';
import { join } from 'path';
import { type LoggerApi } from '@angular-devkit/core/src/logger';
import { type IngressStrategy } from '../helm-strategies/ingress-controller/ingress.strategy';
import { type TlsCertStrategy } from '../helm-strategies/tls-cert/tlsCert.strategy';
import { type HelmStrategy } from '../helm-strategies/helm.strategy';

type PackageJson = {
  scripts?: Record<string, string>;
};

export class RuleBuilder {
  constructor(
    private readonly ingressStrategy: IngressStrategy,
    private readonly tlsCertStrategy: TlsCertStrategy,
    private readonly logger: LoggerApi,
  ) {}

  updatePackageJson = (
    packageJsonBuffer: Buffer,
    serviceName: string,
    tree: Tree,
  ) => {
    const packageJsonString = packageJsonBuffer.toString();
    const packageJsonObject: PackageJson = JSON.parse(
      packageJsonString,
    ) as PackageJson;

    if (packageJsonObject.scripts?.['helm:upgrade']) {
      this.logger.warn(
        'helm:upgrade script already exists in package.json. Skipping owerwritting it.',
      );
      return;
    }

    packageJsonObject.scripts = {
      ...packageJsonObject.scripts,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'helm:upgrade': `helm upgrade -f ./.helm/values.yml ${serviceName} ./.helm`,
    };

    tree.overwrite(
      './package.json',
      JSON.stringify(packageJsonObject, null, 2),
    );
  };

  addBaseHelmChartToTemplate = (options: any) => {
    const filePath = join(__dirname, '..', 'files', 'base');
    return mergeWith(
      apply(url(filePath), [template({ ...options })]),
      MergeStrategy.Overwrite,
    );
  };

  build = (options: Record<string, any>, tree: Tree): Rule => {
    const packageJsonBuffer = tree.read('./package.json');
    const serviceName = options?.serviceName as string | undefined;
    if (!packageJsonBuffer) {
      throw new SchematicsException('Could not read package.json file');
    }

    if (!serviceName) {
      throw new SchematicsException('No service name specified');
    }

    this.updatePackageJson(packageJsonBuffer, serviceName, tree);

    const helmStrategyStack: HelmStrategy[] = [
      this.tlsCertStrategy,
      this.ingressStrategy,
    ];
    const enrichedOptions = helmStrategyStack.reduce(
      (acc, strategy) => strategy.enrichOptions(acc),
      options,
    );

    return chain([
      this.addBaseHelmChartToTemplate(enrichedOptions),
      ...helmStrategyStack.map((strategy) =>
        strategy.addResources(enrichedOptions),
      ),
    ]);
  };
}
