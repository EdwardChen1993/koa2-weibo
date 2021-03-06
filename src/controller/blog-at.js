/**
 * @description 微博@关系 controller
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-Relation');
const { SuccessModel } = require('../model/ResModel');
const { PAGE_SIZE } = require('../conf/constant');

/**
 * 获取@我的微博数量
 * @param {Number} userId 用户id
 */
async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId);
    return new SuccessModel({ count });
}

/**
 * 获取@用户的微博列表
 * @param {Number} userId 用户id
 * @param {Number} pageIndex 页码
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({ userId, pageIndex, PAGE_SIZE });
    const { count, blogList } = result;

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 标记为已读
 * @param {Number} userId
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation({ newIsRead: true }, { userId, isRead: false });
    } catch (error) {
        console.error(error);
    }
    // 不需要返回SuccessModel或者ErrorModel
}

module.exports = { getAtMeCount, getAtMeBlogList, markAsRead }