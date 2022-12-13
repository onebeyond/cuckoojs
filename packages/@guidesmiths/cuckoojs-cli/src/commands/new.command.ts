import * as fs from 'fs';
import {join} from 'path';

import {AbstractCommand} from './abstract.command';
// import {SchematicRunner} from '../lib/runners/schematic.runner';
// import {GitRunner} from '../lib/runners/git.runner';
// import type {PackageEntry, ScriptEntry} from '../lib/runners/npm.runner';
// import {NpmRunner} from '../lib/runners/npm.runner';
// import {BashRunnerHusky} from '../lib/runners/bash.runner.husky';
import {NestJsRunner} from '../lib/runners/nestjs.runner';

// import Printer from '../lib/printer/printer';
// import {promptInput, promptSelect} from '../lib/inquirer/inquirer';
import {messages} from '../lib/ui/ui';

export class NewCommand extends AbstractCommand {
	// private readonly schematicRunner: SchematicRunner = new SchematicRunner();
	// private readonly gitRunner: GitRunner = new GitRunner();
	// private readonly npmRunner: NpmRunner = new NpmRunner();
	// private readonly bashRunnerHusky: BashRunnerHusky = new BashRunnerHusky();
	private readonly nestJsRunner: NestJsRunner = new NestJsRunner();

	// private readonly initialPackages: PackageEntry[] = [
	// 	{name: 'husky', version: '^8.0.1', section: 'devDependencies'},
	// ];
	//
	// private readonly initialScripts: ScriptEntry[] = [
	// 	{name: 'prepare', value: 'husky install'},
	// 	{name: 'postinstall', value: 'npx @guidesmiths/license-checker --outputFileName license-report --failOn /GPL/'},
	// ];

	constructor(
		private readonly name: string,
		private readonly options: string[],
	) {
		super();
	}

	public async execute() {
		// const printer = new Printer({total: 8, step: 1});
		this.printSuccess(messages.banner);

		try {
			// await this.retrieveMissingArguments();

			// printer.startStep('Generating NestJS application scaffolding');
			await this.nestJsRunner.generateNestApplication(this.name, this.options);
			// printer.endStep();

			// printer.startStep('Initializing Git repository');
			// await this.gitRunner.init(this.name);
			// await this.gitRunner.createBranch({folderName: this.name});
			// printer.endStep();
			//
			// printer.startStep('Adding additional packages');
			// await this.npmRunner.addPackages(this.name, this.initialPackages);
			// printer.endStep();
			//
			// printer.startStep('Adding additional npm scripts');
			// await this.npmRunner.addScripts(this.name, this.initialScripts);
			// printer.endStep();
			//
			// printer.startStep('Adding commitlint config file');
			// await this.schematicRunner.addCommitlint(this.name);
			// printer.endStep();
			//
			// printer.startStep('Adding .gitignore file');
			// await this.schematicRunner.addGitignoreFile(this.name);
			// printer.endStep();
			//
			// printer.startStep('Installing dependencies');
			// await this.npmRunner.install(this.name);
			// printer.endStep();
			//
			// printer.startStep('Creating husky files');
			// await this.bashRunnerHusky.runHuskyCommit(this.name);
			// printer.endStep();

			this.printSuccess('\n        🐦 Your CuckooJS NestJS app is generated and ready to use 🐦');
		} catch (error: unknown) {
			// printer.load.fail(`Error generating new project: ${(error as Error).message}`);
			this.removeFolder();
			NewCommand.endProcess(1);
		}
	}

	// private async retrieveMissingArguments() {
	// 	let {name} = this;
	// 	if (!this.name) {
	// 		({name} = await promptInput({name: 'name', message: 'What is the name of your application?', defaultAnswer: 'cuckoo-app'}));
	// 		console.log(name);
	// 		if (this.checkFileExists()) {
	// 			this.printError(`Error generating new project: Folder ${this.name} already exists`);
	// 			NewCommand.endProcess(1);
	// 		}
	// 	}
	//
	// 	const packageManagerOption = this.options.find(option => option.includes('--package-manager'));
	// 	let selectedPackageManager = packageManagerOption?.split('=')?.[1];
	// 	if (!packageManagerOption || !selectedPackageManager || ['npm', 'yarn', 'pnpm'].includes(selectedPackageManager)) {
	// 		({packageManager: selectedPackageManager} = await promptSelect({
	// 			name: 'packageManager',
	// 			message: 'What package manager you would like to use',
	// 			choices: ['npm', 'yarn', 'pnpm'],
	// 			defaultAnswer: 'npm',
	// 		}));
	// 	}
	//
	// 	return {name, packageManager: selectedPackageManager};
	// }

	private removeFolder() {
		try {
			fs.rmdirSync(join(process.cwd(), this.name), {recursive: true});
		} catch (e: unknown) {
			// ignore
		}
	}

	// private checkFileExists() {
	// 	const path = join(process.cwd(), this.name);
	// 	return fs.existsSync(path);
	// }
}
