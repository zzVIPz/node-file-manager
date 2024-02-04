import { createInterface } from 'readline';
import {
  greetUser,
  printWorkingDirectory,
  signOutUser,
} from './modules/index.js';
import { print } from './utils/print.js';

export default class FileManager {
  username = '';

  setName = (userName) => {
    this.username = userName;
  };

  greetings = () => {
    greetUser({
      userEntry: process.argv[2] ?? '',
      printWorkingDirectory,
      setName: this.setName,
      createInterface: this.createInterface,
    });
  };

  createInterface = () => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (line) => {
      switch (line.trim()) {
        case '.exit':
          signOutUser(this.username);
          process.exit(0);

        default:
          print(`Invalid input\n`, 'red');
          break;
      }
      rl.prompt();
    }).on('close', () => {
      signOutUser(this.username);
    });
  };
}
