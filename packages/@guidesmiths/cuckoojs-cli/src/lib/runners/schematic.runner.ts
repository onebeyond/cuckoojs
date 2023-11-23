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

	public async addGitignoreFile(name: string) {
		const args = [`@guidesmiths/cuckoojs-schematics:gitignore --directory=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args});
	}

	public async addCommitlint(name: string) {
		const args = [`@guidesmiths/cuckoojs-schematics:commitlint --directory=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args});
	}

	public async addPullRequestTemplate(name: string, gitProvider: string) {
		const args = [`@guidesmiths/cuckoojs-schematics:pr-template --directory=${name} --git-provider=${gitProvider}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args});
	}

	public async addLambdaQuickstart(name: string) {
		const args = [`@guidesmiths/cuckoojs-schematics:lambda-quickstart --directory=${name} --service-name=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args});
	}

	public async addESlint(name: string) {
		const args = [`@guidesmiths/cuckoojs-schematics:eslint --directory=${name}`];
		await super.run({command: SchematicRunner.getSchematicsCliPath(), args});
	}
}
