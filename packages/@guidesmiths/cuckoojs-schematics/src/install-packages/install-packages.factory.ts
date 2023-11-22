import {
	type Rule,
	type SchematicContext,
	type Tree,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {execSync} from 'child_process';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks'

interface Options {
	directory: string;
}

type PackageManager = 'npm' | 'pnmp' | 'yarn';

export function main(options: Options): Rule {
	return function (tree: Tree, context: SchematicContext) {
		context.logger.info('Installing packages...');
    const packageManager = getPackageManager(tree, options.directory);
		return installDependencies(packageManager)
	};
}

// inspired by https://github.com/egoist/detect-package-manager
function getFromLockFile(tree: Tree, directory: string): PackageManager | undefined {
  if(tree.exists(normalize(`${directory}/package-json.lock`))) return 'npm';
  if(tree.exists(normalize(`${directory}/yarn.lock`))) return 'yarn';
  if(tree.exists(normalize(`${directory}/pnpm-lock.yaml`))) return 'pnmp';
}

// inspired by https://github.com/egoist/detect-package-manager
function getFromGlobalInstallation(): PackageManager {
  try {
    execSync('yarn --version', {stdio: 'pipe'});
    return 'yarn'
  } catch(e) {
    try {
      execSync('pnpm --version', {stdio: 'pipe'});
      return 'pnmp';
    } catch(e) {
      return 'npm';
    }
  }
}

function getPackageManager(tree: Tree, directory: string) {
  return getFromLockFile(tree, directory) ?? getFromGlobalInstallation();
}

function installDependencies(packageManager: PackageManager): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask({ packageManager }));
    return tree;
  };
}
