#!/usr/bin/env node
import {Command} from 'commander';
import {version} from '../../package.json';
import {NewCommand, GenerateCommand} from './commands';

const init = (): void => {
	const cuckoo = new Command('cuckoo');

	cuckoo
		.version(
			version,
			'-v, --version',
			'Output the current version.',
		);

	cuckoo
		.helpOption('-h, --help', 'Output usage information.')
		.showHelpAfterError()
		.usage('<command> [options]');

	cuckoo
		.command('new <name>')
		.alias('n')
		.description('Generate Nest application with basic tooling.')
		.action(async (name: string, _options: any) => {
			await new NewCommand(name).execute();
		});

	cuckoo
		.command('generate <schematic> <name> [options...]')
		.alias('g')
		.description('Generate a Nest element.')
		.action(async (schematic: string, name: string, options: string[]) => {
			await new GenerateCommand(schematic, name, options).execute();
		});

	cuckoo
		.parse(process.argv);
};

init();
