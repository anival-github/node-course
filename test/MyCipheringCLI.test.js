const { exec, spawn } = require('child_process');
const { stdin } = process;

let path = require('path');
let child = require('child_process');


describe('Error scenarios', () => {
    beforeAll(() => jest.setTimeout(90 * 1000))

    test('Input: User passes the same cli argument twice; Result: Error message is shown', (done) => {
        exec(
            'node MyCipheringCLI -c C1-C1-A-R0 -c C0',
            (error, stdout, stderr) => {
                expect(stderr).toEqual('Options must not be repeated, repeated option: -c' + '\n');
                done();
            }
        );
    })

    test("Input: User doesn't pass -c or --config argument; Result: Error message is shown", (done) => {
        exec(
            'node MyCipheringCLI -i "./input.txt"',
            (error, stdout, stderr) => {
                expect(stderr).toEqual('Config must be passed after the key "-c" or "--config"' + '\n');
                done();
            }
        );
    })

    test("Input: User passes -i argument with path that doesn't exist or with no read access; Result: Error message is shown", (done) => {
        exec(
            'node MyCipheringCLI -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input12345.txt" -o "./output.txt"',
            (error, stdout, stderr) => {
                expect(stderr).toEqual("Input './input12345.txt' is not accessable" + '\n');
                done();
            }
        );
    })

    test("Input: User passes -o argument with path to directory that doesn't exist or with no read access; Result: Error message is shown", (done) => {
        exec(

            'node MyCipheringCLI -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output12345.txt"',
            (error, stdout, stderr) => {
                expect(stderr).toEqual("Output './output12345.txt' is not accessable" + '\n');
                done();
            }
        );
    })

    test("Input: User passes incorrent symbols in argument for --config; Result: Error message is shown", (done) => {
        exec(
            'node MyCipheringCLI -c "C2-C5-A8-R9-R1-A3-R-R7-C1-A" -i "./input.txt" -o "./output12345.txt"',
            (error, stdout, stderr) => {
                expect(stderr).toEqual("The following config is invalid: C2-C5-A8-R9-R1-A3-R-R7-C1-A" + '\n');
                done();
            }
        );
    })

})

