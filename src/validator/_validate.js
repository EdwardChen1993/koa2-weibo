/**
 * @description json schema校验
 */

const Ajv = require('ajv');
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
});

/**
 * json schema校验
 * @param {Object} schema json schema规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        // console.log(JSON.stringify(ajv.errors[0]));
        // {"keyword":"minLength","dataPath":".password","schemaPath":"#/properties/password/minLength","params":{"limit":3},"message":"should NOT be shorter than 3 characters"} 
        return ajv.errors[0];
    }
}

module.exports = validate;