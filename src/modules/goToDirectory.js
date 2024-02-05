import { chdir, cwd } from 'node:process';
import { join, isAbsolute, normalize } from 'node:path';
import { printError } from '../utils/print.js';

const goToDirectory = (trimmedLine) => {
  const formattedPath = normalize(trimmedLine.slice(3));

  try {
    if (isAbsolute(formattedPath)) {
      chdir(join(formattedPath));
    } else {
      chdir(join(cwd(), formattedPath));
    }
  } catch {
    printError('The system cannot find the path specified.');
    printError();
  }
};

export default goToDirectory;
