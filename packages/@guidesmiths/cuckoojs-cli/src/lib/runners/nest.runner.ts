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

  public async generateNestApplication(name: string): Promise<void> {
    const args = ['new', name, '--skip-install'];
    await super.run({command: NestRunner.getCliPath(), args, stdio: ['inherit', 'inherit', 'inherit']});
  }
}
