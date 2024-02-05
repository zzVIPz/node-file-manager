import { print } from '../utils/print.js';

const signOutUser = (username) => {
  print(`Thank you for using File Manager, ${username}, goodbye!`, 'green');
};

export default signOutUser;
