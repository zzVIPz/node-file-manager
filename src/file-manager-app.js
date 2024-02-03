import { greetUser, printWorkingDirectory } from './modules/index.js';

export default class FileManager {
  greetings() {
    greetUser({
      userEntry: process.argv[2] ?? '',
      printWorkingDirectory,
    });
  }
}
