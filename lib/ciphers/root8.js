const { caesarCipher } = require('./caesar');

const root8 = ({
    text = '',
    standartShift = 8,
    code = 1,
}) => {
    return caesarCipher({
        text,
        standartShift,
        code,
    });
};

module.exports = {
    root8Cipher: root8,
};