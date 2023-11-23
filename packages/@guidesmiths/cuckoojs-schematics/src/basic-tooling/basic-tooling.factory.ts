import {
	chain,
  noop,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {schematic} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

interface Options {
  directory: string;
  skipInstall: boolean;
}

export function main(options: Options): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding husky, commitlint, gitignore, nvmrc...');

    let existPackageJson = true;
    if (!tree.exists(normalize(`./package.json`))) {
			context.logger.warn(
				'package.json file not found. Skipping installation',
			);
			existPackageJson = false;
		}

		return chain([
			schematic('husky', options),
			schematic('commitlint', options),
			schematic('gitignore', options),
			schematic('nvmrc', options),
      options.skipInstall || !existPackageJson ? noop() : schematic('install-packages', options),
		]);
	};
}
