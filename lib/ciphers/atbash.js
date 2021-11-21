const { ALPHABET, REVERSE_ALPHABET, } = require('./constants');

const atbash = (text) => {
    const encriptedText = text
        .split('')
        .map((char) => {
            const lowerCaseOfSymbol = char.toLowerCase();
            const isLowerCase = char === lowerCaseOfSymbol;

            const index = ALPHABET.indexOf(lowerCaseOfSymbol);

            if (index < 0) {
                return char;
            }

            const encriptedChar = REVERSE_ALPHABET[index];

            if (!isLowerCase) {
                return encriptedChar.toUpperCase();
            }

            return encriptedChar;
        })
        .join('')

    return encriptedText;
};

module.exports = {
    atbashCipher: atbash,
};