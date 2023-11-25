import {GenericRunner} from './generic.runner';

export class NestRunner extends GenericRunner {
  private static getCliPath(): string {
    return require.resolve(
      '@nestjs/cli/bin/nest.js',
      {paths: module.paths},
    );
  }

  constructor() {
    super('node');
  }

  public async generateNestApplication(name: string, packageManager: string): Promise<void> {
    const args = ['new', name, `--package-manager ${packageManager}`, '--skip-install'];
    await this.runNestCli(args);
  }

  public async generateNestElement(schematic: string, name: string, options: string[]) {
    const args = ['generate', schematic, name, ...options];
    await this.runNestCli(args);
  }

  private async runNestCli(args: string[]) {
    await super.run({command: NestRunner.getCliPath(), args});
  }
}
