import { rename } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { printError, print } from '../utils/print.js';

const renameFile = async (trimmedLine) => {
  try {
    const [oldFileName, newFileName] = trimmedLine.slice(3).split(' ');
    const directoryPath = cwd();
    const oldFilePath = join(directoryPath, oldFileName);
    const newFilePath = join(directoryPath, newFileName);

    await new Promise((res, rej) => {
      rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          printError(`Error renaming file '${oldFileName}'`);
          rej();
          return;
        }

        print(`File '${oldFileName}' renamed successfully!\n`, 'green');
        res();
      });
    });
  } catch {
    printError();
  }
};

export default renameFile;
