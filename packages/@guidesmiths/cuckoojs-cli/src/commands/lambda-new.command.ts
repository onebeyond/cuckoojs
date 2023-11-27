import { SchematicRunner } from '../lib/runners/schematic.runner';
import type { PackageEntry, ScriptEntry } from '../lib/runners/npm.runner';
import { NpmRunner } from '../lib/runners/npm.runner';
import { messages } from '../lib/ui/ui';
import * as fs from 'fs';
import { join } from 'path';
import { BashRunnerHusky } from '../lib/runners/bash.runner.husky';
import { AbstractCommand } from './abstract.command';
import Printer from '../lib/printer/printer';
import { GitRunner } from '../lib/runners/git.runner';

export class LambdaNewCommand extends AbstractCommand {
  private readonly schematicRunner: SchematicRunner = new SchematicRunner();
  private readonly gitRunner: GitRunner = new GitRunner();
  private readonly npmRunner: NpmRunner = new NpmRunner();
  private readonly bashRunnerHusky: BashRunnerHusky = new BashRunnerHusky();

  private readonly initialPackages: PackageEntry[] = [
    { name: 'husky', version: '^8.0.1', section: 'devDependencies' },
  ];

  private readonly initialScripts: ScriptEntry[] = [
    { name: 'prepare', value: 'husky install' },
    {
      name: 'postinstall',
      value:
        'npx @guidesmiths/license-checker --outputFileName license-report --failOn /GPL/',
    },
  ];

  constructor(
    private readonly name: string,
    private readonly gitProvider: string,
    private readonly skipGitInit: boolean,
  ) {
    super();
  }

  public async execute() {
    const printer = new Printer();
    this.printSuccess(messages.banner);

    if (this.checkFileExists()) {
      if (this.skipGitInit) {
        this.printNeutral(
          `Folder ${this.name} already exists but git won't be initialized there`,
        );
      } else {
        this.printError(
          `Error generating new project: Folder ${this.name} already exists`,
        );
        LambdaNewCommand.endProcess(1);
      }
    } else {
      if (this.skipGitInit) {
        this.printNeutral(
          `Folder ${this.name} does not exist and git won't be initialized there`,
        );
      }
    }

    try {
      this.checkFileExists();

      printer.startStep('Generating AWS Lambda scaffolding');
      await this.schematicRunner.addLambdaQuickstart(this.name);
      printer.endStep();

      printer.startStep('Initializing Git repository');
      if (this.skipGitInit) {
        printer.updateStep('[Skipped] Initializing Git repository');
      } else {
        await this.gitRunner.init(this.name);
        await this.gitRunner.createBranch({ folderName: this.name });
      }
      printer.endStep();

      printer.startStep('Adding additional packages');
      await this.npmRunner.addPackages(this.name, this.initialPackages);
      printer.endStep();

      printer.startStep('Adding additional npm scripts');
      await this.npmRunner.addScripts(this.name, this.initialScripts);
      printer.endStep();

      printer.startStep('Adding commitlint config file');
      await this.schematicRunner.addCommitlint(this.name);
      printer.endStep();

      printer.startStep('Adding .gitignore file');
      await this.schematicRunner.addGitignoreFile(this.name);
      printer.endStep();

      printer.startStep('Setting ESlint config');
      await this.schematicRunner.addESlint(this.name);
      printer.endStep();

      printer.startStep('Adding Pull Request template file');
      await this.schematicRunner.addPullRequestTemplate(
        this.name,
        this.gitProvider,
      );
      printer.endStep();

      printer.startStep('Installing dependencies');
      await this.npmRunner.install(this.name);
      printer.endStep();

      printer.startStep('Applying ESlist config');
      await this.npmRunner.runScript(this.name, 'lint:fix');
      printer.endStep();

      printer.startStep('Creating husky files');
      await this.npmRunner.runScript(this.name, 'prepare');
      await this.bashRunnerHusky.addHuskyCommitMsg(this.name);
      await this.bashRunnerHusky.addHuskyPrePush(this.name);
      printer.endStep();

      this.printSuccess(
        `\n        🐦 Your CuckooJS Lambda "${this.name}" is generated and ready to use 🐦`,
      );
    } catch (error: unknown) {
      printer.load.fail(
        `Error generating new project: ${(error as Error).message}`,
      );
      this.removeFolder();
      LambdaNewCommand.endProcess(1);
    }
  }

  private removeFolder() {
    try {
      fs.rmdirSync(join(process.cwd(), this.name), { recursive: true });
    } catch (e: unknown) {
      // ignore
    }
  }

  private checkFileExists() {
    const path = join(process.cwd(), this.name);
    return fs.existsSync(path);
  }
}
