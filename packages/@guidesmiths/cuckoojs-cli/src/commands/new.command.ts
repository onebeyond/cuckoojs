import {SchematicRunner} from '../lib/runners/schematic.runner';
import {GitRunner} from '../lib/runners/git.runner';
import {messages} from '../lib/ui/ui';
import * as fs from 'fs';
import {join} from 'path';
import {AbstractCommand} from './abstract.command';
import {NestRunner} from '../lib/runners/nest.runner';
import Printer from '../lib/printer/printer';
import {Prompter} from '../lib/utils/Prompter/Prompter';
import {PackageManager} from '../lib/utils/PackageManager/PackageManager';

export class NewCommand extends AbstractCommand {
	private readonly schematicRunner: SchematicRunner = new SchematicRunner();
	private readonly gitRunner: GitRunner = new GitRunner();
	private readonly nestRunner: NestRunner = new NestRunner();

	constructor(
		private readonly name: string,
	) {
		super();
	}

	public async execute() {
    const printer = new Printer();
		this.printSuccess(messages.banner);

		if (this.checkFileExists()) {
			this.printError(`Error generating new project: Folder ${this.name} already exists`);
			NewCommand.endProcess(1);
		}

		try {
      const packageManager = await Prompter.promptPackageManager();

			await this.nestRunner.generateNestApplication(this.name, packageManager);

			await this.gitRunner.createBranch({folderName: this.name});

			await this.schematicRunner.addBasicTooling(this.name);

      await this.schematicRunner.addNestJsConfigModule(this.name);

      printer.startStep('Installing dependencies');
			await new PackageManager(this.name).install(packageManager);
      printer.endStep();

      this.printSuccess(`\n🐦 Your CuckooJS Nest "${this.name}" project is generated and ready to use 🐦`);
		} catch (error: unknown) {
      printer.load.fail(`Error generating new project: ${(error as Error).message}`);
			this.removeFolder();
			NewCommand.endProcess(1);
		}
	}

	private removeFolder() {
		try {
			fs.rmdirSync(join(process.cwd(), this.name), {recursive: true});
		} catch (e: unknown) {
			// ignore
		}
	}

	private checkFileExists() {
		const path = join(process.cwd(), this.name);
		return fs.existsSync(path);
	}
}
