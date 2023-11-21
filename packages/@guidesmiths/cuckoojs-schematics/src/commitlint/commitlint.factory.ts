import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	chain,
	MergeStrategy,
	mergeWith,
	move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {PackageJsonUtils} from '../utils/package-json.utils';

interface Options {
	directory: string;
}

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Adding commitlint ...');
		const path = normalize(options.directory);
		const templateSource = apply(url(normalize('./files')), [
			template({}),
			move(path),
		]);

		const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

		return chain([
			merged,
			updatePackageJson(path),
		]);
	};
}

function updatePackageJson(directory: string): Rule {
	return (tree: Tree) => {
		const path = normalize(`${directory}/package.json`);
		const packageJsonUtils = new PackageJsonUtils(tree, path);
		packageJsonUtils.addPackage('@commitlint/cli', '^17.1.2', true);
		packageJsonUtils.addPackage('@commitlint/config-conventional', '^17.1.0', true);
		return tree;
	};
}
