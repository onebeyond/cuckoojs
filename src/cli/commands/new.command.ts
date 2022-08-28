import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import type {PackageEntry, ScriptEntry} from '../lib/runners/npm.runner';
import {NpmRunner} from '../lib/runners/npm.runner';

export class NewCommand {
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
		try {
			await this.generateNestApplication();
			await this.initRepository();
			await this.addNpmPackages();
			await this.addNpmScripts();
			await this.installPackages();
		} catch (error: unknown) {
			console.error(error);
			process.exit(1);
		}
	}

	private async generateNestApplication() {
		return this.schematicRunner.generateNestApplication(this.name);
	}

	private async initRepository() {
		return this.gitRunner.init({folderName: this.name});
	}

	private async addNpmPackages() {
		await this.npmRunner.addPackages(this.name, this.initialPackages);
	}

	private async addNpmScripts() {
		await this.npmRunner.addScripts(this.name, this.initialScripts);
	}

	private async installPackages() {
		return this.npmRunner.install(this.name);
	}
}
