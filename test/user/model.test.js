/**
 * @description user model test
 * @author 泽华
 */

const { User } = require('../../src/db/model/index');

test('User模型的各个属性，符合预期', () => {
    // build会构建一个内存的User实例，但不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三',
        // gender: 1,
        picture: '/xxx.png',
        city: '广州'
    })
    // 验证各个属性
    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3);  // 测试gender默认值
    expect(user.picture).toBe('/xxx.png');
    expect(user.city).toBe('广州');
})