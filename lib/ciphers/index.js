const { atbashCipher } = require('./atbash');
const { caesarCipher } = require('./caesar');
const { root8Cipher } = require('./root8');

module.exports = {
    caesarCipher,
    atbashCipher,
    root8Cipher,
};