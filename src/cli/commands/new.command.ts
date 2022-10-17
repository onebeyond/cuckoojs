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
// eslint-disable-next-line @typescript-eslint/no-require-imports
import loading = require('loading-cli');

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
		// const printNeutral = Printer.format({decoration: 'bold'});

		printSuccess(messages.banner);
		const load = loading({
			color: 'green',
			interval: 100,
			stream: process.stdout,
			frames: ['◐', '◓', '◑', '◒'],
		}).start();

		const total = 7;
		let step = 1;

		const startStep = (text: string) => {
			load.text = `(${step}/${total}) ${text}`;
			load.start();
		};

		const endStep = () => {
			load.succeed(load.text);
			step++;
		};

		if (this.checkFileExists()) {
			printError(`Error generating new project: Folder ${this.name} already exists`);
			NewCommand.endProcess(1);
		}

		try {
			this.checkFileExists();

			startStep('Generating NestJS application scaffolding');
			await this.schematicRunner.generateNestApplication(this.name);
			endStep();

			startStep('Initializing Git repository');
			await this.gitRunner.init({folderName: this.name});
			endStep();

			startStep('Adding additional packages');
			await this.npmRunner.addPackages(this.name, this.initialPackages);
			endStep();

			startStep('Adding additional npm scripts');
			await this.npmRunner.addScripts(this.name, this.initialScripts);
			endStep();

			startStep('Creating commitlint config');
			await this.bashRunner.runCommand(this.name);
			endStep();

			startStep('Installing dependencies');
			await this.npmRunner.install(this.name);
			endStep();

			startStep('Creating husky files');
			await this.bashRunnerHusky.runHuskyCommit(this.name);
			load.succeed(load.text);

			printSuccess(`NestJS application "${this.name}" generated`);
		} catch (error: unknown) {
			load.fail();
			printError(`Error generating new project: ${(error as Error).message}`);
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
