import { writeFile } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { printError, print } from '../utils/print.js';

const addFile = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(4);
    const filePath = join(cwd(), fileName);

    await new Promise((res, rej) => {
      writeFile(filePath, '', 'utf8', (err) => {
        if (err) {
          printError(`Error creating file '${fileName}'`);
          rej();
          return;
        }

        print(`File '${fileName}' created successfully!\n`, 'green');
        res();
      });
    });
  } catch {
    printError();
  }
};

export default addFile;
