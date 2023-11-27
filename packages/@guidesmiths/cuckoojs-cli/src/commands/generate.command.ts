import { messages } from '../lib/ui/ui';
import { AbstractCommand } from './abstract.command';
import { NestRunner } from '../lib/runners/nest.runner';

export class GenerateCommand extends AbstractCommand {
  private readonly schematicRunner: NestRunner = new NestRunner();

  constructor(
    private readonly schematic: string,
    private readonly name: string,
    private readonly options: string[],
  ) {
    super();
  }

  public async execute() {
    this.printSuccess(messages.banner);

    try {
      this.printNeutral(`Generating Nest ${this.schematic}.`);
      await this.schematicRunner.generateNestElement(
        this.schematic,
        this.name,
        this.options,
      );
      this.printSuccess(`Nest ${this.schematic} generated.`);
    } catch (error: unknown) {
      this.printError(
        `Error generating Nest ${this.schematic}: ${(error as Error).message}`,
      );
      GenerateCommand.endProcess(1);
    }
  }
}
