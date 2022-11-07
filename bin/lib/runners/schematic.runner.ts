import {GenericRunner} from './generic.runner';

export class SchematicRunner extends GenericRunner {
	private static getSchematicsCliPath(): string {
		return require.resolve(
			'@angular-devkit/schematics-cli/bin/schematics.js',
			{paths: module.paths},
		);
	}

	constructor() {
		super('node');
	}

	public async listSchematics() {
		const args = ['@guidesmiths/cuckoojs:	--list-schematics'];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['inherit', 'inherit', 'inherit']});
	}

	public async generateApplication(name: string, options: string[]) {
		const args = [`@guidesmiths/cuckoojs:new --name ${name} ${options.join(' ')}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['inherit', 'inherit', 'inherit']});
	}

	public async generateNestApplication(name: string) {
		const args = ['@nestjs/schematics:application', `--name ${name} --verbosity=QUIET -`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['pipe', 'pipe', 'inherit']});
	}

	public async generateNestElement(schematic: string, name: string, options: string[]) {
		const args = [`@nestjs/schematics:${schematic} ${name} ${options.join(' ')}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['pipe', 'pipe', 'inherit']});
	}

	public async addCommitlint(name: string) {
		const args = [`@guidesmiths/cuckoojs:commitlint --directory=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['pipe', 'pipe', 'inherit']});
	}

	public async addGitignoreFile(name: string) {
		const args = [`@guidesmiths/cuckoojs:gitignore --directory=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args, stdio: ['pipe', 'pipe', 'inherit']});
	}
}
