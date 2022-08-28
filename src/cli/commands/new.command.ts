import {SchematicRunner} from '../lib/runners/schematic.runner';

export class NewCommand {
	constructor(private readonly name: string) {}

	public async execute() {
		try {
			await this.generateNestApplication();
		} catch (error: unknown) {
			process.exit(1);
		}
	}

	private async generateNestApplication() {
		return new SchematicRunner().generateNestApplication(this.name);
	}
}
