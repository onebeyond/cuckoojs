import { detect } from 'detect-package-manager';
import { resolve } from 'path';
import { existsSync } from 'fs';
import spawnAsync from '../spawnAsync';

export enum PackagerManagerEnum {
  npm = 'npm',
  yarn = 'yarn',
  pnpm = 'pnpm',
}

type PackageManagerOptions = keyof typeof PackagerManagerEnum;

const lockFiles: Record<PackagerManagerEnum, string> = {
  [PackagerManagerEnum.npm]: 'package-lock.json',
  [PackagerManagerEnum.yarn]: 'yarn.lock',
  [PackagerManagerEnum.pnpm]: 'pnpm-lock.yaml',
};

const initArgs: Record<PackagerManagerEnum, string> = {
  [PackagerManagerEnum.npm]: 'init --y --name=',
  [PackagerManagerEnum.yarn]: 'init --y --name ',
  [PackagerManagerEnum.pnpm]: 'init --y --name ',
};

const installArgs: Record<PackagerManagerEnum, string> = {
  [PackagerManagerEnum.npm]: 'install',
  [PackagerManagerEnum.yarn]: 'install',
  [PackagerManagerEnum.pnpm]: 'install',
};

const runScriptArgs: Record<PackagerManagerEnum, string> = {
  [PackagerManagerEnum.npm]: 'run',
  [PackagerManagerEnum.yarn]: '',
  [PackagerManagerEnum.pnpm]: 'run',
};

export class PackageManager {
  private readonly path: string;

  constructor(private readonly folderName: string) {
    this.path = resolve(process.cwd(), folderName);
  }

  public init(packageManager: PackageManagerOptions) {
    if (existsSync(resolve(this.path, lockFiles[packageManager]))) {
      return;
    }
    return spawnAsync({
      command: packageManager,
      args: [`${initArgs[packageManager]}${this.folderName}`],
      stdio: 'pipe',
      cwd: this.path,
    });
  }

  public install(packageManager: PackageManagerOptions) {
    return spawnAsync({
      command: packageManager,
      args: [installArgs[packageManager]],
      stdio: 'pipe',
      cwd: this.path,
    });
  }

  public runScript(packageManager: PackageManagerOptions, script: string) {
    return spawnAsync({
      command: packageManager,
      args: [runScriptArgs[packageManager], script],
      stdio: 'pipe',
      cwd: this.path,
    });
  }

  public detect(): Promise<PackagerManagerEnum> {
    return detect({
      cwd: this.path,
      includeGlobalBun: false,
    }) as Promise<PackagerManagerEnum>;
  }
}
