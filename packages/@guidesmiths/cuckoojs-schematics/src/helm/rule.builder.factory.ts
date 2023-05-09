import {type HelmConfig} from './helm.configs';
import {RuleBuilder} from './rule.builder';

export class RuleBuilderFactory {
	create = (config: HelmConfig): RuleBuilder => new RuleBuilder(config.filePath, config.helmChartName);
}
