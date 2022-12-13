#!/usr/bin/env node
import {Command} from 'commander';
import {version} from '../package.json';
import {NewCommand, GenerateCommand} from './commands';
import {removeDashes} from './lib/utils/formatArgs';

const init = (): void => {
	const cuckoo = new Command('cuckoo');

	const originalArgs = process.argv;

	cuckoo
		.command('new')
		.argument('[name]', 'Name of your Nest App')
		.argument('[options...]', 'List of options. Please, refer to Nest documentation for the available options: https://docs.nestjs.com/cli/usages#nest-new')
		.alias('n')
		.description('Generate Nest application with basic tooling.')
		.hook('preAction', (_, actionCommand) => {
			const commandArgs = originalArgs.slice(3);
			const isOption = (a: string) => /^--|^-/.test(a);
			actionCommand.processedArgs[0] = commandArgs.find(a => !isOption(a));
			actionCommand.processedArgs[1] = commandArgs.filter(a => isOption(a));
		})
		.action(async (name: string, options: string[]) => {
			await new NewCommand(name, options).execute();
		});

	cuckoo
		.command('generate <schematic> <name> [options...]')
		.alias('g')
		.description('Generate a Nest element.')
		.action(async (schematic: string, name: string, options: string[]) => {
			await new GenerateCommand(schematic, name, options).execute();
		});

	cuckoo
		.version(
			version,
			'-v, --version',
			'Output the current version.',
		);

	cuckoo
		.helpOption('-h, --help', 'Output usage information.')
		.showHelpAfterError();

	cuckoo
		.parse(removeDashes(process.argv));
};

init();
