#!/usr/bin/env node
import {Option, Command} from 'commander';
import {version} from '../package.json';
import {NewCommand, GenerateCommand} from './commands';
import {LambdaNewCommand} from "./commands/lambda-new.command";

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

	const nest = cuckoo
		.command('nest')
		.description('Generate nest template')

	nest
		.command('new <name> [options...]')
		.alias('n')
		.description('Generate Nest application with basic tooling.')
		.action(async (name: string, _options: any) => {
			await new NewCommand(name).execute();
		});

	nest
		.command('generate <schematic> <name> [options...]')
		.alias('g')
		.description('Generate a Nest element.')
		.action(async (schematic: string, name: string, options: string[]) => {
			await new GenerateCommand(schematic, name, options).execute();
		});

	const lambda = cuckoo
		.command('lambda')
		.description('Generate lambda template')

	lambda
		.command('new <name>')
		.alias('n')
		.description('Generate an AWS Lambda Quickstart')
		.addOption(
			new Option('-g, --git-provider <gitProvider>', 'Git provider to host the repo')
				.choices(['github', 'azuredevops'])
				.default('github'))
		.addOption(
			new Option('-ci, --ci-provider <ciProvider>', 'CI provider')
				.choices(['github'])
				.default('github'))
		.addOption(
			new Option('--skip-git-init', 'Skip git repository initialization')
		)
		.addOption(
			new Option('--skip-ci-init', 'Skip CI workflows setup')
		)
		.action(async (name: string, options: any) => {
			const {
				gitProvider,
				skipGitInit,
				ciProvider,
				skipCiInit
			} = options;
			await new LambdaNewCommand(name, gitProvider, !!skipGitInit, ciProvider, !!skipCiInit).execute();
		});

	cuckoo
		.parse(process.argv);
};

init();
