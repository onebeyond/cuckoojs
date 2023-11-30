import { SchematicRunner } from '../../lib/runners/schematic.runner';
import { GitRunner } from '../../lib/runners/git.runner';
import { messages } from '../../lib/ui/ui';
import { AbstractCommand } from '../abstract.command';
import Printer from '../../lib/printer/printer';
import { PackageManager } from '../../lib/utils/PackageManager/PackageManager';

export class NewCommand extends AbstractCommand {
  private readonly schematicRunner: SchematicRunner = new SchematicRunner();
  private readonly gitRunner: GitRunner = new GitRunner();

  constructor(private readonly name: string) {
    super();
  }

  public async execute() {
    const printer = new Printer();
    this.printSuccess(messages.banner);

    if (super.checkFileExists(this.name)) {
      this.printError(
        `Error generating new project: Folder ${this.name} already exists`,
      );
      NewCommand.endProcess(1);
    }

    try {
      await this.schematicRunner.addSystemicScaffolding(this.name);

      await this.gitRunner.init(this.name);
      await this.gitRunner.createBranch({ folderName: this.name });

      await this.schematicRunner.addESlint(this.name);

      await this.schematicRunner.addBasicTooling(this.name);

      const packageManager = new PackageManager(this.name);

      printer.startStep('Installing dependencies');
      await packageManager.install('npm');
      printer.endStep();

      printer.startStep('Linting files');
      await packageManager.runScript('npm', 'lint:fix');
      printer.endStep();

      this.printSuccess(
        `\n🐦 Your CuckooJS Systemic "${this.name}" project is generated and ready to use 🐦`,
      );
    } catch (error: unknown) {
      printer.load.fail(
        `Error generating new project: ${(error as Error).message}`,
      );
      super.removeFolder(this.name);
      NewCommand.endProcess(1);
    }
  }
}
