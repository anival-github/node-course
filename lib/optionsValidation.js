const { splitChunks, handleError } = require('./utils');
const {
    CLI_OPTIONS,
    CLI_OPTIONS_ALIAS_TO_NAME_MAP,
    CLI_OPTIONS_NAME_TO_ALIAS_MAP,
} = require('./constants');

const CONFIG_VALIDATION_REGEX = /^([CAR]{1}[10]{0,1}[-]{0,1})+$/;

const optionsMap = {};

const validateConfigRule = (rule) => {
    const cipherMark = rule[0];
    const codingFlag = rule[1];

    const isCipherMarkCorrect = ['C', 'A', 'R'].includes(cipherMark);
    const isCodingFlagCorrect = ['1', '0'].includes(codingFlag);

    if (!isCipherMarkCorrect) {
        handleError(`The following config rule is invalid - there is no such a cipher mark: ${cipherMark}`)
    }

    if (cipherMark === 'C' || cipherMark === 'R') {
        if (!codingFlag || !isCodingFlagCorrect) {
            handleError(`The cipher mark ${cipherMark} must be followed by coding flag 1 or 0`)
        }
    }

    if (cipherMark === 'A') {
        if (codingFlag) {
            handleError(`The cipher mark ${cipherMark} must not be followed by coding flag`)
        }
    }
}

const validateConfig = (configString) => {
    const isCorrectFormat = CONFIG_VALIDATION_REGEX.test(configString);

    if (!isCorrectFormat) {
        handleError(`The following config is invalid: ${configString}`)
    }

    const rules = configString.split('-');

    rules.forEach(validateConfigRule)

    console.log(rules);
}

const addRule = (rule) => {
    const key = rule[0];
    const value = rule[1];

    if (!value) {
        handleError(`Option key must be followed by value, missing value for the key: ${key}`)
    }

    const isAlreadyExists = !!(optionsMap[key] || optionsMap[CLI_OPTIONS_ALIAS_TO_NAME_MAP[key]] || optionsMap[CLI_OPTIONS_NAME_TO_ALIAS_MAP[key]]);

    if (isAlreadyExists) {
        handleError(`Options must not be repeated, repeated option: ${key}`)
    }

    const isConfig = [CLI_OPTIONS.config.alias, CLI_OPTIONS.config.name].includes(key);

    if (isConfig) {
        validateConfig(value);
    }

    optionsMap[key] = value;
}

const parseOptions = () => {
    const cliOptions = process.argv.slice(2);
    const optionsByChunks = splitChunks(cliOptions, 2);

    optionsByChunks.forEach(addRule);
    const isThereConfig = !!(optionsMap[CLI_OPTIONS.config.alias] || optionsMap[CLI_OPTIONS.config.name]);

    if (!isThereConfig) {
        handleError('Config must be passed after the key "-c" or "--config"')
    }

    const isReadFromFile = !!(optionsMap[CLI_OPTIONS.input.alias] || optionsMap[CLI_OPTIONS.input.name]);
    const isWriteIntoFile = !!(optionsMap[CLI_OPTIONS.output.alias] || optionsMap[CLI_OPTIONS.output.name]);
    
    return {
        optionsMap,
        isReadFromFile,
        isWriteIntoFile,
    };
};

module.exports = { parseOptions };