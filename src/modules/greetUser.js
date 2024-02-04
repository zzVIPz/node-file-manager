import { print } from '../utils/print.js';

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
    print(
      'Please, start app by running npm-script start in the following way:',
      'red'
    );
    console.log('npm run start -- --username=your_username');
  }
};

export default greetUser;
