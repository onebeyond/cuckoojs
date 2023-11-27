import { createPromptModule } from 'inquirer';

type PackageManagerAnswer = 'npm' | 'yarn' | 'pnpm';

export class Prompter {
  public static async promptPackageManager() {
    const packageManagerAnswer: { packageManager: PackageManagerAnswer } =
      await createPromptModule()({
        name: 'packageManager',
        type: 'list',
        message: 'Which package manager would you like to use?',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' },
        ],
      });
    return packageManagerAnswer.packageManager;
  }
}
