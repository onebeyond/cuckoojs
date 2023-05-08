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

export function main(options: {directory: string}): Rule {
	return async (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding Husky, Commitlint and Gitignore schematics');

		if (!tree.exists(normalize('package.json'))) {
			context.logger.warn(
				'package.json file not found. Initializing package.json',
			);
			execSync('npm init --y', {cwd: resolve(options.directory)});
		}

		return chain([
			schematic('husky', options),
			schematic('commitlint', options),
			schematic('gitignore', options),
		]);
	};
}
