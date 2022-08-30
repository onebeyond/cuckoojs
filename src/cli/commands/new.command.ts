import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import type {PackageEntry, ScriptEntry} from '../lib/runners/npm.runner';
import {NpmRunner} from '../lib/runners/npm.runner';
import Printer from '../lib/printer/printer';
import {messages} from '../lib/ui/ui';
import * as fs from 'fs';
import {join} from 'path';

export class NewCommand {
	private static endProcess(status: number) {
		process.exit(status);
	}

	private readonly initialPackages: PackageEntry[] = [
		{name: 'husky', version: '~8.0.1', section: 'devDependencies'},
	];

	private readonly initialScripts: ScriptEntry[] = [
		{name: 'prepare', value: 'husky install'},
	];

	constructor(
		private readonly name: string,
		private readonly schematicRunner: SchematicRunner = new SchematicRunner(),
		private readonly gitRunner: GitRunner = new GitRunner(),
		private readonly npmRunner: NpmRunner = new NpmRunner(),
	) {}

	public async execute() {
		const printSuccess = Printer.format({fontColor: 'green', decoration: 'bold'});
		const printError = Printer.format({fontColor: 'red', decoration: 'bold'});
		const printNeutral = Printer.format({decoration: 'bold'});

		printSuccess(messages.banner);

		if (this.checkFileExists()) {
			printError(`Error generating new project: Folder ${this.name} already exists`);
			NewCommand.endProcess(1);
		}

		try {
			this.checkFileExists();

			printNeutral('(1/5) Generating NestJS application scaffolding');
			await this.schematicRunner.generateNestApplication(this.name);

			printNeutral('(2/5) Initializing Git repository');
			await this.gitRunner.init({folderName: this.name});

			printNeutral('(3/5) Adding additional packages');
			await this.npmRunner.addPackages(this.name, this.initialPackages);

			printNeutral('(4/5) Adding additional npm scripts');
			await this.npmRunner.addScripts(this.name, this.initialScripts);

			printNeutral('(5/5) Installing dependencies');
			await this.npmRunner.install(this.name);

			printSuccess(`NestJS application "${this.name}" generated`);
			printSuccess('Thanks for using CuckooJS');
		} catch (error: unknown) {
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
