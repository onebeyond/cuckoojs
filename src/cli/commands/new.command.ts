import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import {NpmRunner} from '../lib/runners/npm.runner';

export class NewCommand {
	constructor(private readonly name: string) {}

	public async execute() {
		try {
			await this.generateNestApplication();
			await this.initRepository();
			await this.installPackages();
		} catch (error: unknown) {
			process.exit(1);
		}
	}

	private async generateNestApplication() {
		return new SchematicRunner().generateNestApplication(this.name);
	}

	private async initRepository() {
		return new GitRunner().init({folderName: this.name});
	}

	private async installPackages() {
		return new NpmRunner().install(this.name);
	}
}
