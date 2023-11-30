import { GenericRunner } from './generic.runner';

interface CreateBranchOptions {
  initialBranch?: string;
  folderName: string;
}

export class GitRunner extends GenericRunner {
  constructor() {
    super('git');
  }

  public async init(folderName: string) {
    await super.run({ command: 'init', args: [folderName], stdio: 'pipe' });
  }

  public async createBranch({
    folderName,
    initialBranch = 'main',
  }: CreateBranchOptions) {
    await super.run({
      command: `-C ${folderName} checkout`,
      args: ['-b', initialBranch],
      stdio: 'pipe',
    });
  }
}
