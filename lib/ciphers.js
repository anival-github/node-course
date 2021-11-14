const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
const REVERSE_ALPHABET = ALPHABET.reverse();
const DECODING_MODE = 'decoding';
const ENCODING_MODE = 'encoding';
const ENCRIPTION_MODE_CODES = [DECODING_MODE, ENCODING_MODE];

const caesarCipher = ({
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

const atbashCipher = (text) => {
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

const root8Cipher = ({
    text = '',
    standartShift = 8,
    code = 1,
}) => {
    return caesarCipher({
        text,
        standartShift,
        code,
    });
};

module.exports = {
    caesarCipher,
    atbashCipher,
    root8Cipher,
};