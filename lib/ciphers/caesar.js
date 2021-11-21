const { ALPHABET, ENCRIPTION_MODE_CODES } = require('./constants');

const caesar = ({
    text = '',
    standartShift = 1,
    code = 1,
}) => {
    const mode = ENCRIPTION_MODE_CODES[code];
    const shiftToUse = mode === ENCODING_MODE ? standartShift : standartShift * -1;

    const encriptedText = text
        .split('')
        .map((char) => {
            const lowerCaseOfSymbol = char.toLowerCase();
            const index = ALPHABET.indexOf(lowerCaseOfSymbol);

            if (index < 0) {
                return char;
            }

            const isLowerCase = char === lowerCaseOfSymbol;

            let shiftedIndex = (index + shiftToUse) % ALPHABET.length;

            if (shiftedIndex < 0) {
                shiftedIndex += ALPHABET.length;
            }

            let encriptedChar = ALPHABET[shiftedIndex];

            if (!isLowerCase) {
                encriptedChar = encriptedChar.toUpperCase();
            }

            return encriptedChar;
        })
        .join('')


    return encriptedText;
};

module.exports = {
    caesarCipher: caesar,
};