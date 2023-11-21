import {
	chain,
  noop,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {schematic} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';
import {resolve} from 'path';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks'

interface Options {
  directory: string;
  skipInstall: boolean;
}

export function main(options: Options): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding Husky, Commitlint, Gitignore, Nvmrc...');

    if (!tree.exists(normalize(`${options.directory}/package.json`))) {
			context.logger.warn(
				'package.json file not found. Initializing package.json',
			);
			execSync('npm init --y', {cwd: resolve(options.directory)});
		}

		return chain([
			schematic('husky', options),
			schematic('commitlint', options),
			schematic('gitignore', options),
			schematic('nvmrc', options),
      options.skipInstall ? noop() : installDependencies(),
		]);
	};
}

function installDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
