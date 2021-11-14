const { access, constants } = require('fs');
const { handleError } = require('./utils');

const { CLI_OPTIONS, CLI_OPTIONS_ALIAS_TO_NAME_MAP, CLI_OPTIONS_NAME_TO_ALIAS_MAP } = require('./constants');

const fromFileToFile = (optionsMap) => {
    const inputFile = optionsMap[CLI_OPTIONS.input.name] || optionsMap[CLI_OPTIONS.input.alias];

    access(inputFile, constants.F_OK | constants.R_OK, (err) => {
        if (err && err.code === 'ENOENT') {
            handleError(`${inputFile} does not exists`);
        } else if (err) {
            handleError(`${inputFile} does not exists`);
        }
    })




    access(file, constants.F_OK, (err) => {
        console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
      });
      
      // Check if the file is readable.
      access(file, constants.R_OK, (err) => {
        console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
      });
      
      // Check if the file is writable.
      access(file, constants.W_OK, (err) => {
        console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
      });
      
      // Check if the file exists in the current directory, and if it is writable.
      access(file, constants.F_OK | constants.W_OK, (err) => {
        if (err) {
          console.error(
            `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
        } else {
          console.log(`${file} exists, and it is writable`);
        }
      });
      







      
    


    // If the input and/or output file is given but doesn't exist
    //  or you can't access it (e.g. because of permissions or it's a directory)
    //  - human-friendly error should be printed in stderr and the process should exit with non-zero status code.


// const rs = fs.createReadStream('', 'utf8');
// const ws = fs.createWriteStream('', 'utf8');

// rs.pipe(ws);

// rs.on('end', () => {
//     console.log('Done')
// })

};

const fromFileToConsole = (optionsMap) => {};

const fromConsoleToFile = (optionsMap) => {};

const  fromConsoleToConsole = (optionsMap) => {};

module.exports = {
    fromFileToFile,
    fromFileToConsole,
    fromConsoleToFile,
    fromConsoleToConsole,
};
