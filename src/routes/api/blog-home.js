/**
 * @description 首页API路由
 * @author 泽华
 */

const router = require('koa-router')();
const {loginCheck} = require('../../middlewares/loginCheck');
const { create } = require('../../controller/blog-home');

router.prefix('/api/blog');

// 创建微博
router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({ userId, content, image });
})


module.exports = router;