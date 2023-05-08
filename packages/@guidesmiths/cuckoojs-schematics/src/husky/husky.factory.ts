import {
	branchAndMerge,
	chain,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';
import {resolve} from 'path';

import {PackageJsonUtils} from '../utils/package-json.utils';

export function main(options: {directory: string; skipInstall: boolean}): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding husky ...');

		const path = normalize(resolve(options.directory));
		if (!tree.exists(normalize('.git/HEAD'))) {
			context.logger.info(
				'Git directory not found. Husky installation will not proceed. Please, consider initializing Git on this project',
			);
			return;
		}

		return branchAndMerge(
			chain([
				updatePackageJson(path),
				runCommand(path, options.skipInstall),
			]),
		)(tree, context);
	};
}

function runCommand(directory: string, skipInstall: boolean): Rule {
	return (tree: Tree, context: SchematicContext) => {
		if (skipInstall) {
			context.logger.info(
				'Husky schematic executed with skipInstall option. Husky will not be installed.',
			);
			return tree;
		}

		const path = `${directory}/.husky/commit-msg`;
		execSync('npx husky install');
		execSync(`npx husky add ${path} 'npx --no -- commitlint --edit "$1"'`);
		const path2 = `${directory}/.husky/pre-push`;
		execSync(`npx husky add ${path2} 'npm run test'`);
		return tree;
	};
}

function updatePackageJson(_directory: string): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const path = 'package.json';

		const packageJsonUtils = new PackageJsonUtils(tree, path);
		packageJsonUtils.addPackage('husky', '^8.0.3', true);
		packageJsonUtils.addScript('prepare', 'husky install');

		return tree;
	};
}
