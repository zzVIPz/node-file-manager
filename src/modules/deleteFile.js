import { unlink } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { printError, print } from '../utils/print.js';

const deleteFile = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(3);
    const filePath = join(cwd(), fileName);

    await new Promise((res, rej) => {
      unlink(filePath, (err) => {
        if (err) {
          printError(`Error deleting file '${fileName}'`);
          rej();
          return;
        }

        print(`File '${fileName}' deleted successfully!\n`, 'green');
        res();
      });
    });
  } catch {
    printError();
  }
};

export default deleteFile;
