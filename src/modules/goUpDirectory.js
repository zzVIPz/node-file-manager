import { chdir, cwd } from 'process';
import { join } from 'path';

const goUpDirectory = () => {
  chdir(join(cwd(), '..'));
};

export default goUpDirectory;
