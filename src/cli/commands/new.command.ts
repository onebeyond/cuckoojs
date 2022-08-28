import {SchematicRunner} from '../lib/runners/schematic.runner';

export class NewCommand {
	public static async execute(name: string, _path?: string) {
		try {
			await this.generateNestApplication(name);
		} catch (error: unknown) {
			process.exit(1);
		}
	}

	private static async generateNestApplication(name: string) {
		const runner = new SchematicRunner(['@nestjs/schematics:application', `--name ${name}`]);
		await runner.run();
	}
}
