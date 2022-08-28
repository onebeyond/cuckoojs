import {GenericRunner} from './generic.runner';

export class SchematicRunner extends GenericRunner {
	private static getSchematicPath(): string {
		return require.resolve(
			'@angular-devkit/schematics-cli/bin/schematics.js',
			{paths: module.paths},
		);
	}

	constructor(private readonly args: string[] = []) {
		super('node');
	}

	public async run() {
		await super.run(SchematicRunner.getSchematicPath(), this.args);
	}
}
