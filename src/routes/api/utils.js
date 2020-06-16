/**
 * @description utils api路由
 * @author 泽华
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck');
const koaForm = require('formidable-upload-koa');
const { saveFile } = require('../../controller/utils');

router.prefix('/api/utils');

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const { file } = ctx.req.files;
    const { size, path, name, type } = file;
    ctx.body = await saveFile({ name, type, size, filePath: path });
})

module.exports = router;