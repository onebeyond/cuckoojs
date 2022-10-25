
import {GenericRunner} from './generic.runner';
import {join} from 'path';

export class BashRunner extends GenericRunner {
	private static buildCommitLintPath(name: string): string {
		return join(process.cwd(), name, 'commitlint.config.js');
	}

	constructor() {
		super('echo');
	}

	public async runCommand(folderName: string) {
		const fullPath = BashRunner.buildCommitLintPath(folderName);

		const args = ['module.exports = {extends: [\'@commitlint/config-conventional\']} > ' + fullPath];
		await super.run({command: '', args});
	}
}
