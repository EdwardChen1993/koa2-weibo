/**
 * @description 用户关系 controller
 * @author 泽华
 */

const { getUsersByFollower } = require('../services/user-relation');
const { SuccessModel } = require('../model/ResModel');

/**
 * 根据userId获取粉丝列表
 * @param {Number} userId 用户id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId);
    // 返回
    return new SuccessModel({
        fansCount: count,
        fansList: userList
    })
}


module.exports = {
    getFans
}