const fs = require('fs').promises;

function readFilePromises(path) {
  return fs
    .readFile(path, { encoding: 'utf-8' })
    .then((fileData) => {
      // console.log(fileData);
      return fileData;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
}

async function readFileAsync(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf-8' });

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const result = readFileAsync('./lectionsasdasfadsfdasda.txt');

console.log(result);
