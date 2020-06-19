/**
 * @description 用户关系 controller
 * @author 泽华
 */

const { getUsersByFollower, addFollower, deleteFollower } = require('../services/user-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo');

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

/**
 * 关注
 * @param {Number} myUserId 当前登录的用户id
 * @param {Number} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId);
        return new SuccessModel();
    } catch (error) {
        return new ErrorModel(addFollowerFailInfo);
    }
}

/**
 * 取消关注
 * @param {Number} myUserId 当前登录的用户id
 * @param {Number} curUserId 要被取消关注的用户id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId);
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(deleteFollowerFailInfo);
}

module.exports = {
    getFans,
    follow,
    unFollow
}