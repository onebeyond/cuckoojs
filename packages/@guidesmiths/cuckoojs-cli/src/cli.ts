#!/usr/bin/env node
import {Option, Command} from 'commander';
import {version} from '../package.json';
import {NewCommand, GenerateCommand} from './commands';
import {NewLambdaCommand} from "./commands/new-lambda.command";

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
		.command('new <name> [options...]')
		.alias('n')
		.description('Generate Nest application with basic tooling.')
		.action(async (name: string, _options: any) => {
			await new NewCommand(name).execute();
		});

	// Absolutely provisional until this is refined with the team to see how to merge or work with both project types
	cuckoo
		.command('new-lambda')
		.argument('name', 'project name')
		.addOption(
			new Option('-g, --git-provider <gitProvider>', 'git provider to host the repo')
			.choices(['github', 'azuredevops'])
			.default('github'))
		.addOption(
			new Option('--skip-git-init', 'skip git repository initialization')
		)
		.alias('nl')
		.description('Generate a NodeJS AWS Lambda Quickstart')
		.action(async (name: string, options: any) => {
			await new NewLambdaCommand(name, options.gitProvider, !!options.skipGitInit).execute();
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
