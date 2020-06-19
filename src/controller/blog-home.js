/**
 * @description 首页controller
 */

const { createBlog } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const xss = require('xss');

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


module.exports = {
    create
}