import type {SpawnOptions, StdioOptions} from 'child_process';
import {spawn} from 'child_process';

interface RunObject {
	command: string;
	args: string [];
	cwd?: string;
	stdio?: StdioOptions;
}

export class GenericRunner {
	constructor(protected binary: string) {}

	protected async run({
		command,
		args = [],
		cwd = process.cwd(),
		stdio = 'inherit',
	}: RunObject): Promise<string | void> {
		const options: SpawnOptions = {
			cwd,
			stdio,
			shell: true,
		};

		return new Promise((resolve, reject) => {
			const child = spawn(
				this.binary,
				args = [command, ...args],
				options,
			);

			child.on('error', error => {
				reject(new Error(`Child process filed with error: ${error.message}`));
			});

			child.on('close', code => {
				if (code === 0) {
					resolve();
					return;
				}

				reject(new Error(`Failed to execute command: ${this.binary} ${args.join(' ')}`));
			});
		});
	}
}
