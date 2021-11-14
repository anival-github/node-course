const splitChunks = (array, size) => {
    const results = [];

    while (array.length) {
        const chunk = array.splice(0, size);

        results.push(chunk)
    }

    return results;
};

const handleError = (message) => {
    process.stderr.write(message);
    process.exitCode = 1;
}

module.exports = {
    splitChunks,
    handleError,
};
  