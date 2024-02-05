import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { join, isAbsolute, normalize } from 'node:path';
import { printError, print } from '../utils/print.js';
import deleteFile from './deleteFile.js';

const copyFile = async (trimmedLine, { isMove } = {}) => {
  try {
    const [fileName, pathToNewDirectory] = trimmedLine.slice(3).split(' ');
    const filePath = join(cwd(), fileName);
    const normalizedPathToNewDirectory = normalize(pathToNewDirectory);
    const destinationFilePath = isAbsolute(normalizedPathToNewDirectory)
      ? join(normalizedPathToNewDirectory, fileName)
      : join(cwd(), normalizedPathToNewDirectory, fileName);

    await new Promise((res, rej) => {
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(destinationFilePath);

      readStream.pipe(writeStream);

      readStream.on('end', async () => {
        if (isMove) {
          await deleteFile(fileName, { isTrimmed: true });
        }

        print(
          `File ${fileName} ${isMove ? 'moved' : 'copied'} successfully!\n`,
          'green'
        );
        res();
      });

      readStream.on('error', () => {
        printError(`Error reading file ${fileName}`);
        rej();
      });

      writeStream.on('error', () => {
        printError(`Error writing file ${fileName}`);
        rej();
      });
    });
  } catch {
    printError();
  }
};

export default copyFile;
