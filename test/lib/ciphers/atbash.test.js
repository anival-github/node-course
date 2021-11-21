const { atbashCipher } = require('../../../lib/ciphers');

describe('atbash cipher', () => {
    test('should return the last char in alphabet', () => {
        expect(atbashCipher('a')).toBe('z')
    })

    test('should return the first char in alphabet, not changing upper case', () => {
        expect(atbashCipher('Z')).toBe('A');
    })

    test('should not touch string, if there are only not latin alphabet or special symbol', () => {
        expect(atbashCipher('абв_!')).toBe('абв_!');
    })
})
