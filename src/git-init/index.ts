import type {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {execSync} from 'child_process';
import {join} from 'path';

export function gitInit(options: any): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		execSync(`git init --initial-branch main ${join(process.cwd(), options.name)}`);
	};
}
