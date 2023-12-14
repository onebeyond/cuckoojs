import Printer from '../lib/printer/printer';
import * as fs from 'fs';
import { join } from 'path';

export class AbstractCommand {
  protected static endProcess(status: number) {
    process.exit(status);
  }

  protected printSuccess = Printer.format({
    fontColor: 'green',
    decoration: 'bold',
  });

  protected printError = Printer.format({
    fontColor: 'red',
    decoration: 'bold',
  });

  protected printNeutral = Printer.format({ decoration: 'bold' });

  protected removeFolder(name: string) {
    try {
      fs.rmdirSync(join(process.cwd(), name), { recursive: true });
    } catch (e: unknown) {
      // ignore
    }
  }

  protected checkFileExists(name: string) {
    const path = join(process.cwd(), name);
    return fs.existsSync(path);
  }
}
