export const print = (text, foregroundColor) => {
  let colorCode = '';
  switch (foregroundColor) {
    case 'red':
      colorCode = `\x1b[31m`;
      break;
    case 'green':
      colorCode = `\x1b[32m`;
      break;
    case 'blue':
      colorCode = `\x1b[34m`;
  }

  console.log(`${colorCode}${text}\x1b[0m`);
};

export const printError = (text = `Operation failed.\n`) => print(text, 'red');
