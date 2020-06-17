/**
 * @description user controller
 * @author 泽华
 */

const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

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
        return new ErrorModel(registerUserNameNotExistInfo);
    }
}

/**
 * 注册
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别：1男性，2女性，3保密
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        await createUser({ userName, password: doCrypto(password), gender });
        return new SuccessModel();
    } catch (error) {
        console.error(error.message, error.stack);
        return new ErrorModel(registerFailInfo);
    }
}

/**
 * 登录
 * @param {Obejct} ctx koa2 ctx
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo);
    }
    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
}

/**
 * 删除当前用户
 * @param {String} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName);
    if (result) {
        // 删除成功
        return new SuccessModel();
    }
    // 删除失败
    return new ErrorModel(deleteUserFailInfo);
}

/**
 * 修改个人信息
 * @param {Object} ctx koa2 ctx
 * @param {String} nickName 昵称
 * @param {String} city 城市
 * @param {String} picture 头像
 */
async function changInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo;
    if (!nickName) {
        nickName = userName;
    }
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName });
    if (result) {
        Object.assign(ctx.session.userInfo, { nickName, city, picture });
        return new SuccessModel();
    }
    return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {String} userName 用户名
 * @param {String} password 旧密码
 * @param {String} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword),

        },
        {
            userName,
            password: doCrypto(password)
        }
    );
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(changePasswordFailInfo);
}

/**
 * 退出登录
 * @param {Object} ctx koa2 ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changInfo,
    changePassword,
    logout
}