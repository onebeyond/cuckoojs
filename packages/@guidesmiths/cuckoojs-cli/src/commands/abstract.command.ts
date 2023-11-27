import Printer from '../lib/printer/printer';

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
}
