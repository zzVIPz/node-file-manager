import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { printError, print } from '../utils/print.js';

const decompressFile = async (trimmedLine) => {
  try {
    const fileName = trimmedLine.slice(11);

    if (!fileName.endsWith('.br')) {
      printError(`File ${fileName} is not Brotli algorithm instance`);
      throw Error();
    }

    const outputFileName = fileName.replace('.br', '');
    const directory = cwd();
    const sourcefilePath = join(directory, fileName);
    const destinationFilePath = join(directory, outputFileName);

    await new Promise((res, rej) => {
      const readStream = createReadStream(sourcefilePath);
      const writeStream = createWriteStream(destinationFilePath);
      const brotliStream = createBrotliDecompress();

      readStream.on('error', () => {
        printError(`Error reading file '${fileName}'`);
        rej();
      });

      writeStream.on('error', () => {
        printError('Error writing decompressed file');
        rej();
      });

      readStream.pipe(brotliStream).pipe(writeStream);

      writeStream.on('finish', () => {
        print(`File '${fileName}' decompressed successfully!\n`, 'green');
        res();
      });
    });
  } catch {
    printError();
  }
};

export default decompressFile;
