#!/usr/bin/env node
import {Command, InvalidArgumentError} from 'commander';
import {version} from '../package.json';
import {NewCommand, GenerateCommand} from './commands';
import {NewAltCommand} from "./commands/new-alt.command";

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

	// Absolutely provisional until this is refined with the team to see how to merge or work with both project types
	cuckoo
		.command('new-alt')
		.argument('<name>', 'project name')
		.option('--git-provider','git provider to host this repo', (value) => {
			const validGitProviders = ['github', 'azuredevops'];
			if(validGitProviders.includes(value)) return value;
			throw new InvalidArgumentError(`--git-provider must be one of: ${validGitProviders}`)
		}, 'github')
		.alias('na')
		.description('Generate a NodeJS AWS Lambda Quickstart')
		.action(async (name: string, options: any) => {
			await new NewAltCommand(name, options.gitProvider).execute();
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
