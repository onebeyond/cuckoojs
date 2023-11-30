import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { PackageJsonUtils } from '../utils/package-json.utils';

interface Options {
  directory: string;
}

export function main(options: Options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up ESlint config...');
    const path = normalize(options.directory);

    const templateSource = apply(url(normalize('./files')), [
      template({ ...options }),
      move(path),
      renameFile(options),
    ]);

    const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

    return chain([merged, updatePackageJson(path)]);
  };
}

function renameFile(options: Options): Rule {
  return (tree: Tree) => {
    tree.rename(
      normalize(`${options.directory}/eslintrc.js`),
      normalize(`${options.directory}/.eslintrc.js`),
    );
    return tree;
  };
}

function updatePackageJson(directory: string): Rule {
  return (tree: Tree) => {
    const path = normalize(`${directory}/package.json`);
    const packageJsonUtils = new PackageJsonUtils(tree, path);

    packageJsonUtils.addPackage('eslint', '^8.29.0', true);
    packageJsonUtils.addPackage('eslint-config-airbnb-base', '^15.0.0', true);
    packageJsonUtils.addPackage('eslint-plugin-import', '^2.26.0', true);
    packageJsonUtils.addPackage('eslint-plugin-jest', '^27.1.6', true);

    packageJsonUtils.addScript('lint', 'eslint .');
    packageJsonUtils.addScript('lint:fix', 'eslint . --fix');

    return tree;
  };
}
