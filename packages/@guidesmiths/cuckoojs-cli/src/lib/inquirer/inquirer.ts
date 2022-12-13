import * as inquirer from 'inquirer';

export async function promptInput({
	name, message, defaultAnswer,
}: {name: string; message: string; defaultAnswer: string}): Promise<inquirer.Answers> {
	return inquirer.createPromptModule()([{type: 'input', name, message, default: defaultAnswer}]);
}

export async function promptSelect({
	name, message, choices, defaultAnswer,
}: {name: string; message: string; choices: string[]; defaultAnswer: string}): Promise<inquirer.Answers> {
	return inquirer.createPromptModule({})([{type: 'select', name, message, choices, default: defaultAnswer}]);
}
