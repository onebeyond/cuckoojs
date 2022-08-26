import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {execSync} from 'child_process';
import {join} from 'path';


export function npmInstall(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    execSync(`npm i --prefix ${join(process.cwd(), options.name)}`);
  };
}
