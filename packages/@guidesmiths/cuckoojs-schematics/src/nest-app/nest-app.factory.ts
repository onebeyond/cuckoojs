import {
	chain,
	Rule,
	SchematicContext,
	Tree,
} from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { NestApplicationOptions } from './nest-app.schema';
// import {JSONFile} from '@nestjs/schematics/dist/utils/json-file.util;
// import {NodePackageInstallTask, RepositoryInitializerTask, RunSchematicTask} from '@angular-devkit/schematics/tasks';
// import {addPackageJsonDependency, NodeDependencyType} from '@nestjs/schematics/dist/utils/dependencies.utils';

// function addDependenciesToPackageJson(_options: any) {
// 	return (host: Tree, _context: SchematicContext) => {
// 		[
// 			{
// 				type: NodeDependencyType.Dev,
// 				name: 'husky',
// 				version: '^8.0.1',
// 			},
// 		].forEach(dependency => {
// 			addPackageJsonDependency(host, dependency);
// 		});

// 		return host;
// 	};
// }

export function main(options: NestApplicationOptions): Rule {
	return (tree: Tree, context: SchematicContext) => {
		return chain([
			generateScaffolding(options),
			overwriteFile(options)
		])(tree, context);

		// const newTask = context.addTask(new RunSchematicTask('@nestjs/schematics', 'application', { ...options }));

		// context.logger.info('Adding commitlint ...');
		// const commitlintTask = context.addTask(new RunSchematicTask('commitlint', {directory: options.name}), [newTask]);

		// context.logger.info('Adding .gitignore ...');
		// const gitignoreTask = context.addTask(new RunSchematicTask('gitignore', {directory: options.name}), [commitlintTask]);

		// context.logger.info('Adding husky ...');
		// addDependenciesToPackageJson(options);

		// context.logger.info('Initializing repository ...');
		// const gitInitTask = context.addTask(new RepositoryInitializerTask(options.name), [commitlintTask, gitignoreTask]);

		// context.logger.info('Installing dependencies ...');
		// context.addTask(new NodePackageInstallTask(options.name), [gitInitTask]);

		// context.logger.info(`🐦 Your Cuckoo "${options.name}" is in the Nest and ready to fly! 🐦`);

		// return tree;
	};
}

function generateScaffolding(options: any): Rule {
	return (tree: Tree, context: SchematicContext) => {
		context.logger.info('INF Creating Nest application ...');
		context.addTask(new RunSchematicTask('@nestjs/schematics', 'application', { ...options }));
		return tree;
	}
}

function overwriteFile(options: NestApplicationOptions): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		// JSONFile p = new JSONFile()
		const buffer = tree.read(`${options.name}/package.json`);
		const content = buffer ? buffer.toString() : '';
		const comment = `// ¯\_(ツ)_/¯\n`;
		if (!content.includes(comment)) {
			tree.overwrite(options.path, comment + content)
		}
		return tree;
	};
}