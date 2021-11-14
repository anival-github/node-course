const handleError = (message) => {
    process.stderr.write(message + '\n');
    process.exit(1);
}

module.exports = handleError;
