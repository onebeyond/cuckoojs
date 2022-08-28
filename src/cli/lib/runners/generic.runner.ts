import type {SpawnOptions} from 'child_process';
import {spawn} from 'child_process';

export class GenericRunner {
	constructor(protected binary: string) {}

	protected async run(
		command: string,
		args: string [] = [],
		cwd: string = process.cwd(),
	): Promise<string | void> {
		const options: SpawnOptions = {
			cwd,
			stdio: 'pipe',
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
