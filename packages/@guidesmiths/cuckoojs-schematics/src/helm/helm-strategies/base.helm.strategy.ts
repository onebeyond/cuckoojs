import {type Rule} from '@angular-devkit/schematics';
import {apply, url, template, mergeWith, MergeStrategy} from '@angular-devkit/schematics';
import {join} from 'path';

export abstract class BaseHelmStrategy {
	templatePath: string[] = [__dirname, '..', 'files'];

	addResources = (options: Record<string, any>): Rule => {
		const filePath = join(...this.templatePath);
		return mergeWith(
			apply(url(filePath), [template({...options})]),
			MergeStrategy.Overwrite,
		);
	};

	abstract enrichOptions(options: Record<string, any>): Record<string, any>;
}
