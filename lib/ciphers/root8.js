const { caesarCipher } = require('./caesar');
const { ROOT_8_SHIFT, ENCRIPTION_ENCODING_CODE } = require('./constants');

const root8 = ({
    text = '',
    shift = ROOT_8_SHIFT,
    code = ENCRIPTION_ENCODING_CODE,
}) => {
    return caesarCipher({
        text,
        shift,
        code,
    });
};

module.exports = {
    root8Cipher: root8,
};