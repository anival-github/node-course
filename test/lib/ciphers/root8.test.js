const { root8Cipher, ALPHABET, ENCRIPTION_ENCODING_CODE } = require('../../../lib/ciphers');

describe('root8 cipher', () => {
    test('should return the 8th char in alphabet', () => {
        const props = {
            text: 'a',
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(root8Cipher(props)).toBe(ALPHABET[8]);
    })

    test('if code not passed, use 0 as default, return the 8th char', () => {
        const props = {
            text: 'a',
        };

        expect(root8Cipher(props)).toBe(ALPHABET[8]);
    })

    test('if text not passed, return empty string', () => {
        const props = {};

        expect(root8Cipher(props)).toBe('');
    })
})
