import { argv, stdin, stdout, exit } from 'process';
import { createInterface } from 'readline';
import {
  greetUser,
  printWorkingDirectory,
  signOutUser,
  goUpDirectory,
} from './modules/index.js';
import { print } from './utils/print.js';

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

    rl.on('line', (line) => {
      switch (line.trim()) {
        case 'up':
          goUpDirectory();
          break;

        case '.exit':
          signOutUser(this.username);
          exit(0);
        default:
          print(`Invalid input\n`, 'red');
          break;
      }
      printWorkingDirectory();
      rl.prompt();
    }).on('close', () => {
      signOutUser(this.username);
    });
  };
}
