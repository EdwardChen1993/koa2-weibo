/**
 * @description 首页controller
 */

const { createBlog, getFollowersBlogList } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const xss = require('xss');
const { PAGE_SIZE } = require("../conf/constant");
const blog = require("../services/blog");

/**
 * 创建微博
 * @param {Object} 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
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