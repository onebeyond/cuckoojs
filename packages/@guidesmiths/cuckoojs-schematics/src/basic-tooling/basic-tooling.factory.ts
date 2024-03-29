import {
  chain,
  type Rule,
  type SchematicContext,
  type Tree,
} from '@angular-devkit/schematics';
import { schematic } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { execSync } from 'child_process';
import { resolve } from 'path';

interface Options {
  directory: string;
}

export function main(options: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding husky, commitlint, gitignore, nvmrc...');

    if (!tree.exists(normalize(`${options.directory}/package.json`))) {
      context.logger.warn(
        'package.json file not found. Initializing package.json',
      );
      execSync('npm init --y', { cwd: resolve(options.directory) });
    }

    return chain([
      schematic('husky', options),
      schematic('commitlint', options),
      schematic('gitignore', options),
      schematic('nvmrc', options),
    ]);
  };
}
