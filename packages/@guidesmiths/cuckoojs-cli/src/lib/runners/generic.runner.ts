import spawnAsync, { RunObject } from '../utils/spawnAsync';

export class GenericRunner {
  constructor(protected binary: string) {}

  protected run({
    command,
    args = [],
    cwd = process.cwd(),
    stdio = 'inherit',
  }: RunObject) {
    return spawnAsync({
      command: this.binary,
      args: [command, ...args],
      stdio,
      cwd,
    });
  }
}
