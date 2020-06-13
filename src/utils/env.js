/**
 * @description 环境变量
 * @author 泽华
 */

const app = require('../app');
const ENV = app.env;

module.exports = {
    isDev: ENV === 'development',
    notDev: ENV !== 'development',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test',
}