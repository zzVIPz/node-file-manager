import { print, printError } from '../utils/print.js';

const greetUser = ({
  userEntry,
  printWorkingDirectory,
  setName,
  createInterface,
}) => {
  if (userEntry.startsWith('--username=') && userEntry.length > 11) {
    const username = userEntry.replace('--username=', '');

    print(`Welcome to the File Manager, ${username}!\n`, 'green');
    printWorkingDirectory();
    setName(username);
    createInterface();
  } else {
    printError(
      'Please, start app by running npm-script start in the following way:'
    );
    print('npm run start -- --username=your_username');
  }
};

export default greetUser;
