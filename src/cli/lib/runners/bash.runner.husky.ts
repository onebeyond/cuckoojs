
import {GenericRunner} from './generic.runner';
import {join} from 'path';

export class BashRunnerHusky extends GenericRunner {
	private static buildCommitLintPath(name: string): string {
		return join(process.cwd(), name, '.husky/commit-msg');
	}

	constructor() {
		super('npx');
	}

	public async runHuskyCommit(folderName: string) {
		const fullPath = BashRunnerHusky.buildCommitLintPath(folderName);

		const args = ['husky add ' + fullPath + ' \'npx --no -- commitlint --edit "$1"\''];
		await super.run('', args);
	}
}
