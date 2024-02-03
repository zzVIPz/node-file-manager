const greetUser = ({ userEntry, printWorkingDirectory }) => {
  if (userEntry.startsWith('--username=') && userEntry.length > 11) {
    console.log(
      `Welcome to the File Manager, \x1b[32m${userEntry.replace(
        '--username=',
        ''
      )}\x1b[0m!\n`
    );
    printWorkingDirectory();
  } else {
    console.log(
      'Please, start app by running npm-script start in the following way:'
    );
    console.log('npm run start -- --username=your_username');
  }
};

export default greetUser;
