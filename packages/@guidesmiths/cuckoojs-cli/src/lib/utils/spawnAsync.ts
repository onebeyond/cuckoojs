import { spawn, SpawnOptions, StdioOptions } from 'child_process';

export interface RunObject {
  command: string;
  args: string[];
  cwd?: string;
  stdio?: StdioOptions;
}

export default async function ({
  command,
  args = [],
  cwd = process.cwd(),
  stdio = 'inherit',
}: RunObject): Promise<string | void> {
  const options: SpawnOptions = {
    cwd,
    stdio,
    shell: true,
  };

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);

    child.on('error', (error) => {
      reject(new Error(`Child process filed with error: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`Failed to execute command: ${command} ${args.join(' ')}`),
      );
    });
  });
}
