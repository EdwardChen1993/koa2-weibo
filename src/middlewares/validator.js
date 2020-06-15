/**
 * @description json schema验证中间件
 * @author 泽华
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 * 生成json schema验证的中间件
 * @param {Function} validateFn 验证函数
 * @returns {Function} json schema验证的中间件
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body;
        const error = validateFn(data);
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return;
        }
        // 验证成功，继续
        await next();
    }
    // 返回中间件
    return validator;
}

module.exports = { genValidator }