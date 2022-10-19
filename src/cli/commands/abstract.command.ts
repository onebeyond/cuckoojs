import Printer from '../lib/printer/printer';
/* eslint-disable @typescript-eslint/no-require-imports */
import loading = require('loading-cli');

export class AbstractCommand {
	protected static endProcess(status: number) {
		process.exit(status);
	}

	total: number;
	step: number;

	protected printSuccess = Printer.format({fontColor: 'green', decoration: 'bold'});
	protected printError = Printer.format({fontColor: 'red', decoration: 'bold'});
	protected printNeutral = Printer.format({decoration: 'bold'});

	constructor() {
		this.total = 7;
		this.step = 1;
	}

	protected initLoader(): loading.Loading {
		return loading({
			color: 'green',
			interval: 100,
			stream: process.stdout,
			frames: ['◐', '◓', '◑', '◒'],
		}).start();
	}

	protected startStep(text: string, load: loading.Loading): any {
		load.text = `(${this.step}/${this.total}) ${text}`;
		load.start();
	}

	protected endStep(load: loading.Loading): number {
		load.succeed(load.text);
		this.step += 1;
		return this.step;
	}
}

