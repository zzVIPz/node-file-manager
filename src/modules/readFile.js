import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { printError, print } from '../utils/print.js';

const readFile = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(4);
    const path = join(cwd(), fileName);
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
        printError(`Error reading file: no such file '${fileName}'`);
        rej();
      });
    });
  } catch {
    printError();
  }
};

export default readFile;
