import { chdir, cwd } from 'node:process';
import { join } from 'node:path';

const goUpDirectory = () => {
  chdir(join(cwd(), '..'));
};

export default goUpDirectory;
