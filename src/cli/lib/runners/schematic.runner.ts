import {GenericRunner} from './generic.runner';

export class SchematicRunner extends GenericRunner {
	private static getSchematicPath(): string {
		return require.resolve(
			'@angular-devkit/schematics-cli/bin/schematics.js',
			{paths: module.paths},
		);
	}

	constructor() {
		super('node');
	}

	public async generateNestApplication(name: string) {
		const args = ['@nestjs/schematics:application', `--name ${name}`];
		await super.run(SchematicRunner.getSchematicPath(), args);
	}

	public async generateNestElement(schematic: string, name: string, options: string[]) {
		const args = [`@nestjs/schematics:${schematic} ${name} ${options.join(' ')}`];
		await super.run(SchematicRunner.getSchematicPath(), args);
	}
}
