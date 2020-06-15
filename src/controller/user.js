/**
 * @description user controller
 * @author 泽华
 */

const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExitInfo } = require('../model/ErrorInfo');

/**
 * 用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
    // 业务逻辑处理（无）
    // 调用services获取数据
    // 统一返回格式
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo);
    }
    else {
        // 未存在
        return new ErrorModel(registerUserNameNotExitInfo);
    }
}

module.exports = { isExist }