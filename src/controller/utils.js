/**
 * @description utils controller
 * @author 泽华
 */

const path = require('path');
const { ErrorModel, SuccessModel } = require("../model/ResModel");
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const fse = require('fs-extra');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '../../', 'uploadFiles');
// 文件最大体积1M
const MAX_SIZE = 1024 * 1024 * 1024;
// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
})

/**
 * 保存文件
 * @param {String} name 文件名
 * @param {String} type 文件类型
 * @param {Number} size 文件体积大小
 * @param {String} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
    console.log(name);
    // 上传文件体积过大
    if (size > MAX_SIZE) {
        // 删除临时文件
        await fse.remove(filePath);
        return new ErrorModel(uploadFileSizeFailInfo);
    }
    // 移动文件
    const fileName = `${Date.now()}.${name}`; // 防止重名 
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName); // 目的地
    await fse.move(filePath, distFilePath);
    // 返回信息
    return new SuccessModel({
        url: `/${fileName}`
    })
}

module.exports = { saveFile }