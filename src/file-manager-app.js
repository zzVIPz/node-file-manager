import { argv, stdin, stdout, exit } from 'node:process';
import { createInterface } from 'node:readline';
import {
  greetUser,
  printWorkingDirectory,
  signOutUser,
  goUpDirectory,
  goToDirectory,
  printDirectoryList,
} from './modules/index.js';
import { printError } from './utils/print.js';

export default class FileManager {
  username = '';

  setName = (userName) => {
    this.username = userName;
  };

  greetings = () => {
    greetUser({
      userEntry: argv[2] ?? '',
      printWorkingDirectory,
      setName: this.setName,
      createInterface: this.createInterface,
    });
  };

  createInterface = () => {
    const rl = createInterface({
      input: stdin,
      output: stdout,
    });
    rl.prompt();

    rl.on('line', async (line) => {
      const trimmedLine = line.trim();

      switch (true) {
        case trimmedLine === 'up':
          goUpDirectory();
          break;
        case trimmedLine.startsWith('cd '):
          goToDirectory(trimmedLine);
          break;
        case trimmedLine === 'ls':
          await printDirectoryList();
          break;
        case trimmedLine === '.exit':
          signOutUser(this.username);
          exit(0);
        default:
          printError(`Invalid input\n`);
          break;
      }
      printWorkingDirectory();
      rl.prompt();
    }).on('close', () => {
      signOutUser(this.username);
    });
  };
}
