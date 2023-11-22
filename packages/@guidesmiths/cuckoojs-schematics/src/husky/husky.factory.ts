import {
	chain,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';

import {PackageJsonUtils} from '../utils/package-json.utils';

interface Options {
	directory: string;
	skipInstall: boolean;
}

export function main(options: Options): Rule {
	return function (tree: Tree, context: SchematicContext) {
		context.logger.info('Adding husky...');

		if (!tree.exists(normalize('.git/HEAD'))) {
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
	return function(tree: Tree, context: SchematicContext) {
		if (skipInstall) {
			context.logger.info(
				'Husky schematic executed with skipInstall option. Husky will not be installed.',
			);
			return tree;
		}

		const path = normalize(`${directory}/.husky/commit-msg`);
		execSync('npx husky install');
		execSync(`npx husky add ${path} 'npx --no -- commitlint --edit "$1"'`);
		const path2 = normalize(`${directory}/.husky/pre-push`);
		execSync(`npx husky add ${path2} 'npm run test'`);
		return tree;
	};
}

function updatePackageJson(directory: string): Rule {
	return function(tree: Tree) {
		const path = normalize(`${directory}/package.json`);
		const packageJsonUtils = new PackageJsonUtils(tree, path);
		packageJsonUtils.addPackage('husky', '^8.0.3', true);
		packageJsonUtils.addScript('prepare', 'husky install');
		return tree;
	};
}
