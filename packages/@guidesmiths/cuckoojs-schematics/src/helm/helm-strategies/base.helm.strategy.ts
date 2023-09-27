import {type Rule} from '@angular-devkit/schematics';

export type BaseHelmStrategy = {
	addResources: (options: any) => Rule;
};
