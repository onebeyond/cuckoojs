
import {GenericRunner} from './generic.runner';
import {join} from 'path';

export class BashRunnerHusky extends GenericRunner {
	private static getHuskyHookFile(name: string, hook: string): string {
		return join(process.cwd(), name, '.husky', hook);
	}

	constructor() {
		super('npx');
	}

	public async addHuskyPreCommit(folderName: string) {
		const fullPath = BashRunnerHusky.getHuskyHookFile(folderName, 'pre-commit');

		const args = ['husky add ' + fullPath + ' \'npx --no -- commitlint --edit "$1"\''];
		await super.run({command: '', args});
	}

	public async addHuskyPrePush(folderName: string) {
		const fullPath = BashRunnerHusky.getHuskyHookFile(folderName, 'pre-push');

		const args = ['husky add ' + fullPath + ' \'npm run test\''];
		await super.run({command: '', args});
	}
}
