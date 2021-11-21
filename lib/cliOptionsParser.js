const { access, constants } = require('fs');
const { splitChunks } = require('./utils');
const handleError = require('./errorHandler');
const {
    CONFIG_VALIDATION_REGEX,
    CAESAR_CIPHER_KEY,
    ATBASH_CIPHER_KEY,
    ROT8_CIPHER_KEY,
    CIPHER_MARKS,
    CODING_FLAGS,
    CONFIG_COMMANDS,
    INPUT_COMMANDS,
    OUTPUT_COMMANDS,
    CLI_OPTIONS_ALIAS_TO_NAME_MAP,
    CLI_OPTIONS_NAME_TO_ALIAS_MAP,
} = require('./constants');

const cliOptions = {
    isConfigPassed: false,
    isInputPassed: false,
    isOutputPassed: false,
    configRules: [],
    inputPath: null,
    outputPath: null,
};

const validateConfigRule = ({ rule }) => {
    const [cipherMark, codingFlag] = rule.split('');

    const isCipherMarkExists = CIPHER_MARKS.includes(cipherMark);
    const isCodingFlagExists = CODING_FLAGS.includes(codingFlag);

    if (!isCipherMarkExists) {
        handleError(`The following config rule is invalid - there is no such a cipher mark: ${cipherMark}`);
        return false;
    }

    if ([CAESAR_CIPHER_KEY, ROT8_CIPHER_KEY].includes(cipherMark) && !isCodingFlagExists) {
        handleError(`The cipher mark ${cipherMark} must be followed by coding flag 1 or 0`);
        return false;
    }

    if (cipherMark === ATBASH_CIPHER_KEY && codingFlag) {
        handleError(`The cipher mark ${cipherMark} must not be followed by coding flag`);
        return false;
    }

    cliOptions.configRules.push([cipherMark, codingFlag]);
    return true;
}

const validateConfig = ({ configString }) => {
    if (!CONFIG_VALIDATION_REGEX.test(configString)) {
        handleError(`The following config is invalid: ${configString}`)
    }

    const isConfigValid = configString
        .split('-')
        .every((rule) => validateConfigRule({ rule }));

    if (isConfigValid) {
        cliOptions.isConfigPassed = true;
    }

    // console.log(configString, isConfigValid);
}

const isDublicateKey = (key) => {
    const existingValue = cliOptions[key] || cliOptions[CLI_OPTIONS_ALIAS_TO_NAME_MAP[key]] || cliOptions[CLI_OPTIONS_NAME_TO_ALIAS_MAP[key]];
    const isDublicate = !!existingValue;
    return isDublicate;
}

const validateInputPath = (path) => {
    access(path, constants.R_OK | constants.F_OK, (err) => {
        if (err) {
            handleError(`Input '${path}' is not accessable`)
            return;
        }
    });
}

const validateOutputPath = (path) => {
    access(path, constants.W_OK | constants.F_OK, (err) => {
        if (err) {
            handleError(`Output '${path}' is not accessable`)
            return;
        }
    });
}

const validateCliOption = (key, value) => {
    if (!value) {
        handleError(`Option key must be followed by value, missing value for the key: ${key}`)
    }

    if (isDublicateKey(key)) {
        handleError(`Options must not be repeated, repeated option: ${key}`)
    }

    if (CONFIG_COMMANDS.includes(key)) {
        validateConfig({ configString: value });
    }

    if (INPUT_COMMANDS.includes(key)) {
        validateInputPath(value);
        cliOptions.isInputPassed = true;
        cliOptions.inputPath = value;
    }

    if (OUTPUT_COMMANDS.includes(key)) {
        validateOutputPath(value);
        cliOptions.isOutputPassed = true;
        cliOptions.outputPath = value;
    }
}

const addCliOption = ({ key, value }) => {
    validateCliOption(key, value);
    cliOptions[key] = value;
}

const parseCliOptions = () => {
    const cliOptionsArray = process.argv.slice(2);
    const optionsByChunks = splitChunks(cliOptionsArray, 2);

    optionsByChunks.forEach(([key, value]) => addCliOption({ key, value }));
    return cliOptions;
};

module.exports = { parseCliOptions };