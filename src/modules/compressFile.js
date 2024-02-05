import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { printError, print } from '../utils/print.js';

const compressFile = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(9);
    const directory = cwd();
    const sourcefilePath = join(directory, fileName);
    const destinationFilePath = join(directory, `${fileName}.br`);

    await new Promise((res, rej) => {
      const readStream = createReadStream(sourcefilePath);
      const writeStream = createWriteStream(destinationFilePath);
      const brotliStream = createBrotliCompress();

      readStream.on('error', () => {
        printError(`Error reading file '${fileName}'`);
        rej();
      });

      writeStream.on('error', () => {
        printError('Error writing compressed file');
        rej();
      });

      readStream.pipe(brotliStream).pipe(writeStream);

      writeStream.on('finish', () => {
        print(`File '${fileName}' compressed successfully!\n`, 'green');
        res();
      });
    });
  } catch {
    printError();
  }
};

export default compressFile;
