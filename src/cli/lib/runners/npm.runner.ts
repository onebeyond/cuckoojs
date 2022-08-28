import {GenericRunner} from './generic.runner';

export class NpmRunner extends GenericRunner {
	constructor() {
		super('npm');
	}

	public async install(name: string) {
		const args = [`--prefix ${name}`];
		await super.run('install', args);
	}
}
