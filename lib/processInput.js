const fs = require('fs');
const { Transform, pipeline } = require('stream');

const handleError = require('./errorHandler');
const { caesarCipher, atbashCipher, root8Cipher } = require('./ciphers');
const { CAESAR_CIPHER_KEY, ATBASH_CIPHER_KEY, ROT8_CIPHER_KEY } = require('./constants');

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

const fromFileToFile = ({ inputPath, outputPath, configRules }) => {
    const readStream = fs.createReadStream(inputPath, 'utf8');
    const writeStream = fs.createWriteStream(outputPath, { flags:'a' });

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
  const writeStream = fs.createWriteStream(outputPath, { flags:'a' });

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
