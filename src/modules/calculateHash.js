import { cwd } from 'node:process';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { print, printError } from '../utils/print.js';

const calculateHash = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(5);
    const path = join(cwd(), fileName);

    await new Promise((res, rej) => {
      const hash = createHash('sha256');
      const readStream = createReadStream(path);

      readStream
        .on('error', () => {
          printError(`Error calculating hash`);
          rej();
        })
        .pipe(hash)
        .on('finish', () => {
          print(`Calculated hash for file ${fileName}`);
          print(`${hash.digest('hex')}\n`, 'green');
          res();
        });
    });
  } catch {
    printError();
  }
};

export default calculateHash;
