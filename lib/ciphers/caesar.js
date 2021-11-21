const {
    ALPHABET,
    ENCRIPTION_MODE_CODES_MAP,
    ENCODING_MODE,
    ENCRIPTION_ENCODING_CODE,
    STANDART_CAESAR_SHIFT_1,
} = require('./constants');

const caesar = ({
    text = '',
    shift = STANDART_CAESAR_SHIFT_1,
    code = ENCRIPTION_ENCODING_CODE,
}) => {
    const mode = ENCRIPTION_MODE_CODES_MAP[code];
    const shiftToUse = mode === ENCODING_MODE ? shift : shift * -1;

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