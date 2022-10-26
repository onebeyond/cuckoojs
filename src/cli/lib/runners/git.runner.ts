import {GenericRunner} from './generic.runner';

type CreateBranchOptions = {
	initialBranch?: string;
	folderName: string;
};

export class GitRunner extends GenericRunner {
	constructor() {
		super('git');
	}

	public async init(folderName: string) {
		await super.run({command: 'init', args: [folderName]});
	}

	public async createBranch({folderName, initialBranch = 'main'}: CreateBranchOptions) {
		await super.run({command: `-C ${folderName} checkout`, args: ['-b', initialBranch]});
	}
}
