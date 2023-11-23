import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import type {PackageEntry, ScriptEntry} from '../lib/runners/npm.runner';
import {NpmRunner} from '../lib/runners/npm.runner';
import {messages} from '../lib/ui/ui';
import * as fs from 'fs';
import {join} from 'path';
import {BashRunnerHusky} from '../lib/runners/bash.runner.husky';
import {AbstractCommand} from './abstract.command';
import {NestRunner} from '../lib/runners/nest.runner';
import Printer from '../lib/printer/printer';

export class NewCommand extends AbstractCommand {
	private readonly schematicRunner: SchematicRunner = new SchematicRunner();
	private readonly gitRunner: GitRunner = new GitRunner();
	private readonly npmRunner: NpmRunner = new NpmRunner();
	private readonly bashRunnerHusky: BashRunnerHusky = new BashRunnerHusky();
	private readonly nestRunner: NestRunner = new NestRunner();

	private readonly initialPackages: PackageEntry[] = [
		{name: 'husky', version: '^8.0.1', section: 'devDependencies'},
	];

	private readonly initialScripts: ScriptEntry[] = [
		{name: 'prepare', value: 'husky install'},
		{name: 'postinstall', value: 'npx @guidesmiths/license-checker --outputFileName license-report --failOn /GPL/'},
	];

	constructor(
		private readonly name: string,
	) {
		super();
	}

	public async execute() {
    const printer = new Printer();
		this.printSuccess(messages.banner);

		if (this.checkFileExists()) {
			this.printError(`Error generating new project: Folder ${this.name} already exists`);
			NewCommand.endProcess(1);
		}

		try {
			await this.nestRunner.generateNestApplication(this.name);

			await this.gitRunner.createBranch({folderName: this.name});

			await this.npmRunner.addPackages(this.name, this.initialPackages);

			await this.npmRunner.addScripts(this.name, this.initialScripts);

			await this.schematicRunner.addCommitlint(this.name);

			await this.schematicRunner.addGitignoreFile(this.name);

      printer.startStep('Installing dependencies');
			await this.npmRunner.install(this.name);
      printer.endStep();

			await this.bashRunnerHusky.addHuskyCommitMsg(this.name);

      this.printSuccess(`\n        🐦 Your CuckooJS nest "${this.name}" is generated and ready to use 🐦`);
		} catch (error: unknown) {
      printer.load.fail(`Error generating new project: ${(error as Error).message}`);
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
