import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith, move,
	template,
	chain,
	url,
  noop
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {addConfigToModuleRule} from './utils/add-config-to-module-rule';
import {PackageJsonUtils} from '../utils/package-json.utils';

interface Options {
  directory: string;
  skipInstall: boolean;
}

export function main(options: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Nest basic config files...');

    const appFile = './src/app.module.ts';
    if (!tree.exists(normalize('./nest-cli.json')) || !tree.exists(normalize(appFile))) {
      context.logger.info(
        'This is not a nestJs project. Schematic will not create the config files in this folder.',
      );
      return;
    }

    const templateSource = apply(url('./files'), [
      template({...options}),
      move(normalize(options.directory)),
    ]);

    return chain([
      mergeWith(templateSource, MergeStrategy.Overwrite),
      addConfigToModuleRule(appFile),
      updatePackageJson(),
      options.skipInstall ? noop() : installDependencies(),
    ]);
  };
}

function updatePackageJson(): Rule {
  return (tree: Tree) => {
    const path = 'package.json';
    const packageJsonUtils = new PackageJsonUtils(tree, path);
    packageJsonUtils.addPackage('@nestjs/config', '^3.1.1', false);
    packageJsonUtils.addPackage('class-transformer', '^0.5.1', false);
    packageJsonUtils.addPackage('class-validator', '^0.14.0', false);
    packageJsonUtils.addPackage('lodash.merge', '^4.6.2', false);

    return tree;
  };
}

function installDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}

