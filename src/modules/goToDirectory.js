import { chdir, cwd } from 'process';
import { join, isAbsolute, normalize } from 'path';
import { print } from '../utils/print.js';

const goToDirectory = (path) => {
  const formattedPath = normalize(path.slice(3));

  try {
    if (isAbsolute(formattedPath)) {
      chdir(join(formattedPath));
    } else {
      chdir(join(cwd(), formattedPath));
    }
  } catch {
    print('The system cannot find the path specified.\n', 'red');
  }
};

export default goToDirectory;
