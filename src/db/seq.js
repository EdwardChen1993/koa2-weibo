const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { host, database, user, password } = MYSQL_CONF;
const conf = {
    host,
    dialect: 'mysql'
}

// 单元测试不打印Sequelize语句
if (isTest) {
    conf.logging = () => { };
}

// 线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中的最大连接数量
        min: 0, // 连接池中的最小连接数量
        idle: 10000 // 如果一个连接池10秒之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
