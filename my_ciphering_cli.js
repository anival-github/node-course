const { parseCliOptions } = require('./lib/cliOptionsParser');
const {
    fromFileToFile,
    fromFileToConsole,
    fromConsoleToFile,
    fromConsoleToConsole,
} = require('./lib/processInput');

const init = () => {
    const cliOptions = parseCliOptions();

    const {
        isConfigPassed,
        isInputPassed,
        isOutputPassed,
    } = cliOptions;

    if (!isConfigPassed) {
        return handleError('Config must be passed after the key "-c" or "--config"');
    }

    switch (true) {
        case isInputPassed && isOutputPassed:
            return fromFileToFile(cliOptions);

        case isInputPassed && !isOutputPassed:
            return fromFileToConsole(cliOptions);

        case !isInputPassed && isOutputPassed:
            return fromConsoleToFile(cliOptions);

        case !isInputPassed && !isOutputPassed:
            return fromConsoleToConsole(cliOptions);

        default:
            return handleError('Some error occured')
    }
}

init();
