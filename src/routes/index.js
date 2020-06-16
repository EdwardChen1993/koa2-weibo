const router = require('koa-router')();
const { loginRedirect, loginCheck } = require('../middlewares/loginCheck');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/json', loginCheck, async (ctx, next) => {
  if (ctx.session.viewNum == null) {
    ctx.session.viewNum = 0;
  }
  ctx.session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    // viewNum: ctx.session.viewNum
  };
});

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: 'profile',
    userName,
  };
});

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: 'loadMore',
    userName,
    pageIndex
  };
});

module.exports = router;