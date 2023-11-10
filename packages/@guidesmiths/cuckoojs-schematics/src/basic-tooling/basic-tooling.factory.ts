import {
	chain,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {schematic} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';
import {resolve} from 'path';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks'

export function main(options: {directory: string}): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding Husky, Commitlint, Gitignore, Nvmrc and NestJS-config...');

    if (!tree.exists(normalize(`${options.directory}/package.json`))) {
			context.logger.warn(
				'package.json file not found. Initializing package.json',
			);
			execSync('npm init --y', {cwd: resolve(options.directory)});
		}

		return chain([
      schematic('nestjs-config', {...options, skipInstall: true}),
			schematic('husky', options),
			schematic('commitlint', options),
			schematic('gitignore', options),
			schematic('nvmrc', options),
      installDependencies(),
		]);
	};
}

function installDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
