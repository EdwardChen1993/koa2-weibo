/**
 * @description sequelize 同步数据库
 */

const seq = require('./seq');

require('./model');

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok');
}).catch((err) => {
    console.log('auth err', err);
})

// 执行同步
seq.sync({ force: true }).then(()=>{
    console.log('sync ok');
    process.exit();
})