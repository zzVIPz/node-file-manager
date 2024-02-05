import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { printError, print } from '../utils/print.js';

const readFile = async (trimmedLine) => {
  try {
    const path = join(cwd(), trimmedLine.slice(4));
    let output = '';

    await new Promise((res, rej) => {
      const readStream = createReadStream(path, 'utf8');

      readStream.on('data', (chunk) => {
        output += chunk;
      });

      readStream.on('end', () => {
        print('File content:\n', `blue`);
        print(`${output}\n`);
        res();
      });

      readStream.on('error', () => {
        printError(`Error reading file: no such file or directory`);
        rej();
      });
    });
  } catch {
    printError();
  }
};

export default readFile;
