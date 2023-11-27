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
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {addConfigToModuleRule} from './utils/add-config-to-module-rule';
import {PackageJsonUtils} from '../utils/package-json.utils';

interface Options {
  directory: string;
}

export function main(options: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Nest basic config files...');

    const appFile = `${options.directory}/src/app.module.ts`;
    if (!tree.exists(normalize(`${options.directory}/nest-cli.json`)) || !tree.exists(normalize(appFile))) {
      context.logger.info(
        'This is not a NestJs project. Schematic will not create the config files in this folder.',
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
      updatePackageJson(options.directory),
    ]);
  };
}

function updatePackageJson(directory: string): Rule {
  return (tree: Tree) => {
    const path = normalize(`${directory}/package.json`);
    const packageJsonUtils = new PackageJsonUtils(tree, path);
    packageJsonUtils.addPackage('@nestjs/config', '^3.1.1', false);
    packageJsonUtils.addPackage('class-transformer', '^0.5.1', false);
    packageJsonUtils.addPackage('class-validator', '^0.14.0', false);
    packageJsonUtils.addPackage('lodash.merge', '^4.6.2', false);
    return tree;
  };
}


