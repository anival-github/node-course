const splitChunks = (array, size) => {
    const results = [];

    while (array.length) {
        const chunk = array.splice(0, size);

        results.push(chunk)
    }

    return results;
};

module.exports = { splitChunks };
