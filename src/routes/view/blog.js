/**
 * @description 微博view路由
 * @author 泽华
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginCheck');

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {});
})

module.exports = router;