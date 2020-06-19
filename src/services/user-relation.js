/**
 * @description 用户关系 services
 * @author 泽华
 */

const { User, UserRelation } = require('../db/model');
const { formatUser } = require('./_format');

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {Number} followerId 被关注人id
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [['id', 'desc']],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId: followerId
                }
            }
        ]
    })
    // result.count 总数
    // result.rows 查询结果，数组
    let userList = result.rows.map(row => row.dataValues);
    userList = formatUser(userList);

    return {
        count: result.count,
        userList
    }
}


module.exports = {
    getUsersByFollower
}