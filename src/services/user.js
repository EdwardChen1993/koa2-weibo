/**
 * @description user service
 * @author 泽华
 */

const { User } = require('../db/model');
const { formatUser } = require('./_format');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/**
 * 获取用户信息
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password });
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result;
    }

    // 格式化
    const formatRes = formatUser(result.dataValues);
    return formatRes;
}

/**
 * 创建用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别：1男性，2女性，3保密
 * @param {String} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    });
    return result.dataValues;
}

/**
 * 删除用户
 * @param {String} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result删除的行数
    return result > 0;
}

/**
 * 更新用户信息
 * @param {Object} { newPassword, newNickName, newCity, newPicture } 要修改的内容
 * @param {Object} { userName, password } 查询条件
 */
async function updateUser(
    { newPassword, newNickName, newCity, newPicture },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {};
    if (newPassword) {
        updateData.password = newPassword;
    }
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newCity) {
        updateData.city = newCity;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    // 拼接查询条件
    const whereData = {
        userName
    }
    console.log(whereData);
    if (password) {
        whereData.password = password;
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0; // 修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}