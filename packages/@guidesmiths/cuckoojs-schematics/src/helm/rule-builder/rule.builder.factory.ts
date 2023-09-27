import {type LoggerApi} from '@angular-devkit/core/src/logger';
import {RuleBuilder} from './rule.builder';

export class RuleBuilderFactory {
	create = (logger: LoggerApi): RuleBuilder => new RuleBuilder(logger);
}
