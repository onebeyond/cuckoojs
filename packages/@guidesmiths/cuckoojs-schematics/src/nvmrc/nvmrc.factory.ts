import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply,
	MergeStrategy,
	mergeWith, move,
	template,
	url,
	chain,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {join} from 'path';
import {PackageJsonUtils} from '../utils/package-json.utils';

type Options = {
	directory: string;
	nodeVersion: number;
};

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext): Rule => {
		context.logger.info('Creating .nvmrc file and updating package.json...');

		const templateSource = apply(url('./files'), [
			template({...options}),
			move(normalize(options.directory)),
		]);

		return chain([
			mergeWith(templateSource, MergeStrategy.Overwrite),
			updatePackageJson(options),
		]);
	};
}

function updatePackageJson(options: Options): Rule {
	return (tree: Tree) => {
		const path = join(options.directory, 'package.json');

		const packageJsonUtils = new PackageJsonUtils(tree, path);
		packageJsonUtils.addWithPath(['engines', 'node'], `>=${options.nodeVersion}`);

		return tree;
	};
}
