import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import type {PackageEntry, ScriptEntry} from '../lib/runners/npm.runner';
import {NpmRunner} from '../lib/runners/npm.runner';
import Printer from '../lib/printer/printer';
import {messages} from '../lib/ui/ui';
import * as fs from 'fs';
import {join} from 'path';
import {BashRunner} from '../lib/runners/bash.runner';
import {BashRunnerHusky} from '../lib/runners/bash.runner.husky';
export class NewCommand {
	private static endProcess(status: number) {
		process.exit(status);
	}

	private readonly initialPackages: PackageEntry[] = [
		{name: 'husky', version: '^8.0.1', section: 'devDependencies'},
		{name: '@commitlint/cli', version: '^17.1.2', section: 'devDependencies'},
		{name: '@commitlint/config-conventional', version: '^17.1.0', section: 'devDependencies'},

	];

	private readonly initialScripts: ScriptEntry[] = [
		{name: 'prepare', value: 'husky install'},
		{name: 'postinstall', value: 'npx @guidesmiths/license-checker --outputFileName license-report --failOn /GPL/'},
	];

	constructor(
		private readonly name: string,
		private readonly schematicRunner: SchematicRunner = new SchematicRunner(),
		private readonly gitRunner: GitRunner = new GitRunner(),
		private readonly npmRunner: NpmRunner = new NpmRunner(),
		private readonly bashRunner: BashRunner = new BashRunner(),
		private readonly bashRunnerHusky: BashRunnerHusky = new BashRunnerHusky(),
	) {}

	public async execute() {
		const printSuccess = Printer.format({fontColor: 'green', decoration: 'bold'});
		const printError = Printer.format({fontColor: 'red', decoration: 'bold'});
		const printer = new Printer();

		printSuccess(messages.banner);

		const load = printer.initLoader();

		if (this.checkFileExists()) {
			printError(`Error generating new project: Folder ${this.name} already exists`);
			NewCommand.endProcess(1);
		}

		try {
			this.checkFileExists();

			printer.startStep('Generating NestJS application scaffolding', load);
			await this.schematicRunner.generateNestApplication(this.name);
			printer.endStep(load);

			printer.startStep('Initializing Git repository', load);
			await this.gitRunner.init({folderName: this.name});
			printer.endStep(load);

			printer.startStep('Adding additional packages', load);
			await this.npmRunner.addPackages(this.name, this.initialPackages);
			printer.endStep(load);

			printer.startStep('Adding additional npm scripts', load);
			await this.npmRunner.addScripts(this.name, this.initialScripts);
			printer.endStep(load);

			printer.startStep('Creating commitlint config', load);
			await this.bashRunner.runCommand(this.name);
			printer.endStep(load);

			printer.startStep('Installing dependencies', load);
			await this.npmRunner.install(this.name);
			printer.endStep(load);

			printer.startStep('Creating husky files', load);
			await this.bashRunnerHusky.runHuskyCommit(this.name);
			printer.endStep(load);

			printSuccess(`\n        🐦 Your CuckooJS nest "${this.name}" is generated and ready to use 🐦`);
		} catch (error: unknown) {
			load.fail(`Error generating new project: ${(error as Error).message}`);
			this.removeFolder();
			NewCommand.endProcess(1);
		}
	}

	private removeFolder() {
		try {
			fs.rmdirSync(join(process.cwd(), this.name), {recursive: true});
		} catch (e: unknown) {
			// ignore
		}
	}

	private checkFileExists() {
		const path = join(process.cwd(), this.name);
		return fs.existsSync(path);
	}
}
