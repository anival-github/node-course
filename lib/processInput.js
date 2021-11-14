const fs = require('fs');
const { Transform, pipeline } = require('stream');
const handleError = require('./errorHandler');
const {
  caesarCipher,
  atbashCipher,
  root8Cipher,
} = require('./ciphers');

const {
  CONFIG_VALIDATION_REGEX,
  CAESAR_CIPHER_KEY,
  ATBASH_CIPHER_KEY,
  ROT8_CIPHER_KEY,
  CIPHER_MARKS,
  CODING_FLAGS,
  CLI_OPTIONS_KEYS,
  CONFIG_COMMANDS,
  INPUT_COMMANDS,
  OUTPUT_COMMANDS,
  CLI_OPTIONS_ALIAS_TO_NAME_MAP,
  CLI_OPTIONS_NAME_TO_ALIAS_MAP,
  CONFIG_KEY_NAME,
  CONFIG_KEY_ALIAS,
  INPUT_KEY_NAME,
  INPUT_KEY_ALIAS,
  OUTPUT_KEY_NAME,
  OUTPUT_KEY_ALIAS,
} = require('./constants');

const getTransformStream = (cipherMark, codingFlag) => {
  switch (cipherMark) {
    case CAESAR_CIPHER_KEY:
      return new Transform({
        transform(chunk, enc, cb) {
          const chunkStrigified = chunk.toString().trim();
          const encriptedText = caesarCipher({ text: chunkStrigified, code: codingFlag}) + '\n';
          const buf = Buffer.from(encriptedText, 'utf-8');
          cb(null, buf);
        }
      })

    case ROT8_CIPHER_KEY:
      return new Transform({
        transform(chunk, enc, cb) {
          const chunkStrigified = chunk.toString().trim();
          const encriptedText = root8Cipher({ text: chunkStrigified, code: codingFlag}) + '\n';
          const buf = Buffer.from(encriptedText, 'utf-8');
          cb(null, buf);
        }
      })

    case ATBASH_CIPHER_KEY:
      return new Transform({
        transform(chunk, enc, cb) {
          const chunkStrigified = chunk.toString().trim();
          const encriptedText = atbashCipher(chunkStrigified) + '\n';
          const buf = Buffer.from(encriptedText, 'utf-8');
          cb(null, buf);
        }
      })

    default:
      return null;
  }

}

// const getTransformStream2 = (cipherMark, codingFlag) => {
//   const coder = new Transform({ objectMode: true });
//   switch (cipherMark) {
//     case CAESAR_CIPHER_KEY:
//       coder._transform = function (chunk, encoding, done) {
//         try {
//           const chunkStrigified = chunk.toString();
//           done(null, caesarCipher({ text: chunkStrigified, code: codingFlag }));
//         } catch (e) {
//           done(e);
//         }
//       };


//     case ROT8_CIPHER_KEY:
//       coder._transform = function (chunk, encoding, done) {
//         try {
//           const chunkStrigified = chunk.toString();
//           done(null, root8Cipher({ text: chunkStrigified, code: codingFlag }));
//         } catch (e) {
//           done(e);
//         }
//       };

//     case ATBASH_CIPHER_KEY:
//       coder._transform = function (chunk, encoding, done) {
//         try {
//           const chunkStrigified = chunk.toString();
//           done(null, root8Cipher(chunkStrigified));
//         } catch (e) {
//           done(e);
//         }
//       }

//     default:
//       break;
//   }

//   return coder;
// }

const fromFileToFile = ({ inputPath, outputPath, configRules }) => {
    const readStream = fs.createReadStream(inputPath, 'utf8');
    const writeStream = fs.createWriteStream(outputPath, 'utf8');

    const transformStreams = configRules.map((rule) => {
      const [cipherMark, codingFlag] = rule;

      const transformStream = getTransformStream(cipherMark, codingFlag);

      return transformStream;
    });

    readStream.on('error', (err) => {
      console.log(err);
      handleError(`Input file '${inputPath}' does not exist or can not be accessed`)
    });

    writeStream.on('error', (err) => {
      console.log(err);
      handleError(`Output file '${outputPath}' does not exist or can not be accessed`)
    })

    pipeline(
      readStream,
      ...transformStreams,
      writeStream,
      (err) => {
        console.log(`Error: ${err}`)
      }
    );
};

const fromFileToConsole = ({ inputPath, configRules }) => {
  const readStream = fs.createReadStream(inputPath, 'utf8');
  const writeStream = process.stdout;

  const transformStreams = configRules.map((rule) => {
    const [cipherMark, codingFlag] = rule;

    const transformStream = getTransformStream(cipherMark, codingFlag);

    return transformStream;
  });

  readStream.on('error', (err) => {
    console.log(err);
    handleError(`Input file '${inputPath}' does not exist or can not be accessed`)
  });

  pipeline(
    readStream,
    ...transformStreams,
    writeStream,
    (err) => {
      console.log(`Error: ${err}`)
    }
  );
};

const fromConsoleToFile = ({ configRules, outputPath }) => {
  const readStream = process.stdin;
  const writeStream = fs.createWriteStream(outputPath, 'utf8');

  const transformStreams = configRules.map((rule) => {
    const [cipherMark, codingFlag] = rule;

    const transformStream = getTransformStream(cipherMark, codingFlag);

    return transformStream;
  });

  pipeline(
    readStream,
    ...transformStreams,
    writeStream,
    (err) => {
      console.log(`Error: ${err}`)
    }
  );
};

const  fromConsoleToConsole = ({ configRules }) => {
  const readStream = process.stdin;
  const writeStream = process.stdout;

  const transformStreams = configRules.map((rule) => {
    const [cipherMark, codingFlag] = rule;

    const transformStream = getTransformStream(cipherMark, codingFlag);

    return transformStream;
  });

    pipeline(
      readStream,
      ...transformStreams,
      writeStream,
      (err) => {
        console.log(`Error: ${err}`)
      }
    );
};

module.exports = {
    fromFileToFile,
    fromFileToConsole,
    fromConsoleToFile,
    fromConsoleToConsole,
};




// console.log(cliOptions);

// let inputSteram;
// let outputStream;

// if (isThereInput) {
//     const inputFromFile = cliOptions[INPUT_KEY_ALIAS] || cliOptions[INPUT_KEY_NAME];

//     inputSteram = fs.createReadStream(inputFromFile, 'utf8');
// } else {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//         prompt: '> ',
//     });
// }

// process.stdin.on('data', (data) => {
//     const dataStringified = data.toString();
//     const encrypted = encript(dataStringified);
//     process.stdout.write(encrypted);
// })







// const commands = [
//     '-c',
//     '--config',
//     '-i',
//     '--input',
//     '-o',
//     '--output',
// ];


// const readline = require('readline');


// // rl.prompt();

// // rl.question('Please, enter your text: ', (text) => {
// //     console.log(text);
// //     rl.close();
// // })

// // rl.on('line', (line) => {
// //     const trimLine = line.trim();
// // })

// const processConfig = (config) => {

// };

// let src;

// const processInput = (inputFile) => {
//     fs.readFile(inputFile, 'utf8', (err, buffer) => {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }

//         src = buffer.toString();

//     })

//     const buffer = fs.readFileSync(inputFile, 'utf8');
//     console.log(src);
// };

// const processOutput = (output) => {
//     fs.writeFileSync(output, src)
// };

// process.argv.forEach((command, index) => {
//     const value = process.argv[index + 1];

//     if (command === '-c' || command === '--config') {
//         processConfig(value);
//     }

//     if (command === '-i' || command === '--input') {
//         processInput(value);
//     }

//     if (command === '-o' || command === '--output') {
//         processOutput(value);
//     }
// });

// process.exit(0);

