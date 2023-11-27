import {
  chain,
  type Rule,
  type SchematicContext,
  type Tree,
} from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { execSync } from 'child_process';

import { PackageJsonUtils } from '../utils/package-json.utils';

interface Options {
  directory: string;
  skipInstall: boolean;
}

export function main(options: Options): Rule {
  return function (tree: Tree, context: SchematicContext) {
    context.logger.info('Adding husky...');

    if (!tree.exists(normalize(`${options.directory}/.git/HEAD`))) {
      context.logger.info(
        'Git directory not found. Husky installation will not proceed. Please, consider initializing Git on this project',
      );
      return;
    }

    return chain([
      updatePackageJson(options.directory),
      runCommand(options.directory, options.skipInstall),
    ]);
  };
}

function runCommand(directory: string, skipInstall: boolean): Rule {
  return function (tree: Tree, context: SchematicContext) {
    if (skipInstall) {
      context.logger.info(
        'Husky schematic executed with skipInstall option. Husky will not be installed.',
      );
      return tree;
    }

    const cwd = normalize(directory);
    execSync('npx husky install', { cwd });
    execSync(
      `npx husky add ${normalize(
        `.husky/commit-msg`,
      )} 'npx --no -- commitlint --edit "$1"'`,
      { cwd },
    );
    execSync(`npx husky add ${normalize(`.husky/pre-push`)} 'npm run test'`, {
      cwd,
    });
    return tree;
  };
}

function updatePackageJson(directory: string): Rule {
  return function (tree: Tree) {
    const path = normalize(`${directory}/package.json`);
    const packageJsonUtils = new PackageJsonUtils(tree, path);
    packageJsonUtils.addPackage('husky', '^8.0.3', true);
    packageJsonUtils.addScript('prepare', 'husky install');
    return tree;
  };
}
