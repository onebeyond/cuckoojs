import {GenericRunner} from './generic.runner';

type InitOptions = {
	initialBranch?: string;
	folderName: string;
};

export class GitRunner extends GenericRunner {
	constructor() {
		super('git');
	}

	public async init({initialBranch = 'main', folderName}: InitOptions) {
		const args = [`--initial-branch ${initialBranch}`, folderName];
		await super.run({command: 'init', args});
	}
}
