const handleError = (message) => {
    process.stderr.write(message + '\n');
    process.exitCode = 1;
}

module.exports = handleError;
