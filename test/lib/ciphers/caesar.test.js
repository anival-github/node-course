const {
    caesarCipher,
    ENCRIPTION_DECODING_CODE,
    ENCRIPTION_ENCODING_CODE,
} = require('../../../lib/ciphers');

describe('caesar cipher', () => {
    test('should return the follwing char in alphabet', () => {
        const props = {
            text: 'a',
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(caesarCipher(props)).toBe('b');
    })

    test('should return the previous char in alphabet', () => {
        const props = {
            text: 'b',
            code: ENCRIPTION_DECODING_CODE,
        };

        expect(caesarCipher(props)).toBe('a');
    })

    test('should return this exect text', () => {
        const props = {
            text: 'абв_!',
            code: ENCRIPTION_DECODING_CODE,
        };

        expect(caesarCipher(props)).toBe('абв_!');
    })

    test('should return the first char in alphabet', () => {
        const props = {
            text: 'z',
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(caesarCipher(props)).toBe('a');
    })

    test('should return the last char in alphabet', () => {
        const props = {
            text: 'a',
            code: ENCRIPTION_DECODING_CODE,
        };

        expect(caesarCipher(props)).toBe('z');
    })

    test('should return the following char in alphabet, not changing upper case', () => {
        const props = {
            text: 'A',
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(caesarCipher(props)).toBe('B');
    })

    test('should return the third char in alphabet', () => {
        const props = {
            text: 'a',
            shift: 2,
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(caesarCipher(props)).toBe('c');
    })

    test('should return the first char in alphabet', () => {
        const props = {
            text: 'c',
            shift: 2,
            code: ENCRIPTION_DECODING_CODE,
        };

        expect(caesarCipher(props)).toBe('a');
    })

    test('if text not passed, return empty string', () => {
        const props = {
            shift: 2,
            code: ENCRIPTION_ENCODING_CODE,
        };

        expect(caesarCipher(props)).toBe('');
    })

    test('if code not passed, use 0 as default, return the following char', () => {
        const props = {
            text: 'a',
            shift: 1,
        };

        expect(caesarCipher(props)).toBe('b');
    })

    test('if shift not passed, use 1 as default, return the following char', () => {
        const props = {
            text: 'a',
        };

        expect(caesarCipher(props)).toBe('b');
    })
})