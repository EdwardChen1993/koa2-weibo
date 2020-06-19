/**
 * @description 加密方法
 */

const crypto = require('crypto');
const { CPYPTO_SECRET_KEY } = require('../conf/secretKeys');

/**
 * md5加密
 * @param {String} content 明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

/**
 * 加密方法
 * @param {String} content 明文
 */
function doCrypto(content) {
    const str = `passwrod=${content}&key=${CPYPTO_SECRET_KEY}`;
    return _md5(str);
}

module.exports = doCrypto;