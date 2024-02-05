import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { printError, print } from '../utils/print.js';

const printOsInfo = async (trimmedLine) => {
  try {
    const option = trimmedLine.slice(3);

    switch (option) {
      case '--EOL':
        print(`End-Of-Line: ${JSON.stringify(EOL)}\n`, 'green');
        break;
      case '--cpus': {
        const cpusInfo = cpus();

        print(`Total CPUs: ${cpusInfo.length}\n`, 'green');

        cpusInfo.forEach(({ model, speed }, idx) => {
          print(`CPU: ${idx + 1}`, 'blue');
          print(`Model: ${model}`);
          print(`Clock rate: ${(speed / 1000).toFixed(2)}GHz\n`);
        });
        break;
      }
      case '--homedir':
        print(`Home directory: ${homedir()}\n`, 'green');
        break;
      case '--username':
        print(`System user name: ${userInfo().username}\n`, 'green');
        break;
      case '--architecture':
        print(`CPU architecture: ${arch()}\n`, 'green');
        break;
      default:
        printError(`Option '${option}' is not supported`);
        printError();
    }
  } catch {
    printError();
  }
};

export default printOsInfo;
