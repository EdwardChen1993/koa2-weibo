/**
 * @description 首页controller
 */

const { createBlog, getFollowersBlogList } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const xss = require('xss');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require("../conf/constant");
const blog = require("../services/blog");
const { getUserInfo } = require("../services/user");
const { createAtRelation } = require("../services/at-Relation");

/**
 * 创建微博
 * @param {Object} 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
    // 分析并收集 content 中的 @ 用户
    // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu '
    const atUserNameList = [];
    content = content.replace(REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            // 获取userName
            atUserNameList.push(userName);
            return matchStr;
        }
    )

    // 根据@用户名查询用户信息
    const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)));

    // 根据用户信息，获取用户id
    const atUserIdList = atUserList.map(user => user.id);

    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        // 创建@关系
        await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)));
        // 返回
        return new SuccessModel(blog);

    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(createBlogFailInfo);
    }
}

/**
 * 获取首页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页码
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
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

module.exports = {
    create,
    getHomeBlogList
}