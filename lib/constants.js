const CLI_OPTIONS = {
    config: {
        name: '--config',
        alias: '-c',
    },
    input: {
        name: '--input',
        alias: '-i',
    },
    output: {
        name: '--output',
        alias: '-o',
    },
};

const CLI_OPTIONS_ALIAS_TO_NAME_MAP = {
    '-c': '--config',
    '-o': '--output',
    '-i': '--input',
};

const CLI_OPTIONS_NAME_TO_ALIAS_MAP = {
    '--output': '-o',
    '--input': '-i',
    '--config': '-c',
};

module.exports = {
    CLI_OPTIONS,
    CLI_OPTIONS_ALIAS_TO_NAME_MAP,
    CLI_OPTIONS_NAME_TO_ALIAS_MAP,
};