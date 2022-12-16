import type {
	Rule,
	SchematicContext,
	Tree} from '@angular-devkit/schematics';
import {
	apply, chain,
	MergeStrategy,
	mergeWith, move,
	template,
	url,
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';

export const main = (options: any): Rule => (tree: Tree, context: SchematicContext) => {
	context.logger.info('Setting up ESlint config');
	const path = normalize(options.directory);

	const templateSource = apply(url('./files'), [
		template({...options}),
		move(path),
		renameFile(options),
	]);

	const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

	return chain([
		merged,
		updatePackageJson(path),
	])(tree, context)
};

function renameFile(options: any): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const normalizedPath = normalize(options.directory);
		tree.rename(`${normalizedPath}/eslintrc.js`, `${normalizedPath}/.eslintrc.js`);
		return tree;
	};
}

function updatePackageJson(directory: string): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const path = `${directory}/package.json`;
		const file = tree.read(path) as unknown as string;
		const json = JSON.parse(file.toString()) as Record<string, any>;

		if (!json.devDependencies) {
			json.devDependencies = {};
		}

		json.devDependencies['eslint'] = '^8.29.0';
		json.devDependencies['eslint-config-airbnb-base'] = '^15.0.0';
		json.devDependencies['eslint-plugin-import'] = '^2.26.0';
		json.devDependencies['eslint-plugin-jest'] = '^27.1.6';

		if(!json.scripts) {
			json.scripts = {}
		}

		json.scripts['lint'] = 'eslint .';
		json.scripts['lint:fix'] = 'eslint . --fix';

		tree.overwrite(path, JSON.stringify(json, null, 2));
		return tree;
	};
}
