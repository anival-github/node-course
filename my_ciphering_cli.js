
const readline = require('readline');
const { parseOptions } = require('./lib/optionsValidation');

const init = () => {
    const { optionsMap, isReadFromFile, isWriteIntoFile } = parseOptions();

    switch (true) {
        case isReadFromFile && isWriteIntoFile:
            fromFileToFile(optionsMap);
            return;

        case isReadFromFile && !isWriteIntoFile:
            fromFileToConsole(optionsMap);
            return;

        case !isReadFromFile && isWriteIntoFile:
            fromConsoleToFile(optionsMap);
            return;

        case !isReadFromFile && !isWriteIntoFile:
            fromConsoleToConsole(optionsMap);
            return;
    
        default:
            break;
    }
}

init();



// console.log(optionsMap);

// let inputSteram;
// let outputStream;

// if (isThereInput) {
//     const inputFromFile = optionsMap[CLI_OPTIONS.input.alias] || optionsMap[CLI_OPTIONS.input.name];

//     inputSteram = fs.createReadStream(inputFromFile, 'utf8');
// } else {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//         prompt: '> ',
//     });
// }

// process.stdin.on('data', (data) => {
//     const dataStringified = data.toString();
//     const encrypted = encript(dataStringified);
//     process.stdout.write(encrypted);
// })







// const commands = [
//     '-c',
//     '--config',
//     '-i',
//     '--input',
//     '-o',
//     '--output',
// ];


// const readline = require('readline');


// // rl.prompt();

// // rl.question('Please, enter your text: ', (text) => {
// //     console.log(text);
// //     rl.close();
// // })

// // rl.on('line', (line) => {
// //     const trimLine = line.trim();
// // })

// const processConfig = (config) => {

// };

// let src;

// const processInput = (inputFile) => {
//     fs.readFile(inputFile, 'utf8', (err, buffer) => {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }

//         src = buffer.toString();

//     })

//     const buffer = fs.readFileSync(inputFile, 'utf8');
//     console.log(src);
// };

// const processOutput = (output) => {
//     fs.writeFileSync(output, src) 
// };

// process.argv.forEach((command, index) => {
//     const value = process.argv[index + 1];

//     if (command === '-c' || command === '--config') {
//         processConfig(value);
//     }

//     if (command === '-i' || command === '--input') {
//         processInput(value);
//     }

//     if (command === '-o' || command === '--output') {
//         processOutput(value);
//     }
// });
  
// process.exit(0);

