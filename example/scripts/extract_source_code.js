const { promisify } = require('util');
const { readFileSync, writeFileSync, openSync } = require('fs');
const glob = require('glob');
const { stringify } = require('querystring');

pGlob = promisify(glob);

pGlob('**/src/examples/*.js', {})
  .then((files) => {
    for (const filename of files) {
      const content = readFileSync(filename);
      writeFileSync(
        filename + 'on',
        JSON.stringify({ content: content.toString() })
      );
    }
  })
  .then(() => {
    console.log('All done!');
  })
  .catch((e) => {
    console.log('Error', e);
  });
