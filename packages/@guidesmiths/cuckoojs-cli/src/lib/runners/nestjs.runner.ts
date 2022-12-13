import {GenericRunner} from './generic.runner';

export class NestJsRunner extends GenericRunner {
	private static getNestJsCliPath(): string {
		return require.resolve(
			'@nestjs/cli/bin/nest.js',
			{paths: module.paths},
		);
	}

	// private static formatNewOptions(options: string[]): string {
	// 	const formattedOptions = options.filter(Boolean).join(' ');
	// 	if (options.includes('--skip-install')) {
	// 		return formattedOptions;
	// 	}
	//
	// 	return `${formattedOptions} --skip-install`;
	// }
	//
	constructor() {
		super('node');
	}

	public async generateNestApplication(name: string, options: string[]) {
		const args = ['new', name, ...options].filter(Boolean);
		console.log(args);
		await super.run({command: NestJsRunner.getNestJsCliPath(), args, stdio: 'inherit'});
	}
}
