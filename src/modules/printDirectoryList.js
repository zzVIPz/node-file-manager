import { readdir } from 'node:fs/promises';
import { cwd } from 'node:process';
import { printError } from '../utils/print.js';

const printDirectoryList = async () => {
  try {
    const entries = await readdir(cwd(), { withFileTypes: true });

    const { files, folders } = entries.reduce(
      (acc, entry) => {
        if (entry.isFile()) {
          return { ...acc, files: [...acc.files, entry.name] };
        }

        return { ...acc, folders: [...acc.folders, entry.name] };
      },
      {
        files: [],
        folders: [],
      }
    );

    console.table([
      ...folders.sort().map((name) => ({ Name: name, Type: 'Directory' })),
      ...files.sort().map((name) => ({ Name: name, Type: 'File' })),
    ]);
  } catch {
    printError();
  }
};

export default printDirectoryList;
