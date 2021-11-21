const { splitChunks } = require('../../lib/Utils');

const CHUNK_LENGTH_OPTIONS = [1, 2];

describe('Split chunks', () => {
    test('should split array by 3 chunks', () => {
        const array = [1, 2, 3, 4, 5];
        const chunkLength = 2;

        expect(splitChunks(array, chunkLength).length).toBe(3);
    });

    test('should split array by chunks each having 1 or 2 length', () => {
        const array = [1, 2, 3, 4, 5, 6, 7];
        const chunkLength = 2;

        expect(
            splitChunks(array, chunkLength)
                .every((chunk) => CHUNK_LENGTH_OPTIONS.includes(chunk.length))
            ).toBeTruthy;
    });
})
