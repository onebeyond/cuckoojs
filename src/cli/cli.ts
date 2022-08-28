#!/usr/bin/env node
import {Command} from 'commander';
import {version} from '../../package.json';
import {NewCommand} from './commands/new.command';

const init = () => {
	const program = new Command('cuckoo');

	program
		.version(
			version,
			'-v, --version',
			'output the current version',
		)
		.helpOption('-h, --help', 'output usage information')
		.showHelpAfterError()
		.usage('<command> [options]')

		.command('new <name>')
		.alias('n')
		.description('generate a new NestJS project scaffolding')
		.action(async (name: string, _options: any) => {
			await new NewCommand(name).execute();
		});

	program.parse(process.argv);
};

init();
