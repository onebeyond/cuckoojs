import {
	chain,
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';

import {PackageJsonUtils} from '../utils/package-json.utils';

export function main(options: {directory: string; skipInstall: boolean}): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding husky ...');
		const path = normalize(options.directory);

		// https://github.com/angular/angular-cli/blob/8da926966e9f414ceecf60b89acd475ce1b55fc5/packages/angular_devkit/schematics/src/tree/host-tree.ts#L332
		if (!tree.getDir(normalize(`./${path}/.git`)).subdirs.length) {
			context.logger.info(
				'Git directory not found. Husky installation will not proceed. Please, consider initializing Git on this project',
			);
			return;
		}

		return chain([
			updatePackageJson(path),
			runCommand(path, options.skipInstall),
		])(tree, context);
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
		execSync(`npm install --prefix=${directory}`);
		execSync(`npm run prepare --prefix=${directory}`);
		execSync(`npx husky add ${path} 'npx --no -- commitlint --edit "$1"'`);
		const path2 = `${directory}/.husky/pre-push`;
		execSync(`npx husky add ${path2} 'npm run test'`);
		return tree;
	};
}

function updatePackageJson(directory: string): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const path = `${directory}/package.json`;

		const packageJsonUtils = new PackageJsonUtils(tree, path);
		packageJsonUtils.addPackage('husky', '^8.0.1', true);
		packageJsonUtils.addScript('prepare', 'husky install');

		return tree;
	};
}