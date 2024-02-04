import { print } from '../utils/print.js';

const printWorkingDirectory = () => {
  print(`You are currently in ${process.cwd()}\n`, 'blue');
};

export default printWorkingDirectory;
