/**
 * @description 微博@用户关系service
 */

const { AtRelation } = require('../db/model');

/**
 * 创建微博@用户的关系
 * @param {Number} blogId 微博id
 * @param {Number} userId 用户id
 */
async function createAtRelation(blogId, userId) {
    const result = AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues;
}

module.exports = { createAtRelation }