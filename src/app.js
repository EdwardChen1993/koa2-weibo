const path = require('path');
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');

const { REDIS_CONF } = require('./conf/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');

// 路由
const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const utilsApiRouter = require('./routes/api/utils');
const errorViewRouter = require('./routes/view/error');

// error handler
let onerrorConf = {};
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys = [SESSION_SECRET_KEY];
app.use(session({
  key: 'weibo.sid', // cookie name，默认是koa.sid
  prefix: 'weibo:sess:', // redis key的前缀，默认是koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 单位毫秒
  },
  // ttl: 24 * 60 * 60 * 1000, // redis过期时间，默认和cookie过期时间一致
  store: redisStore({
    host: REDIS_CONF && REDIS_CONF.host,
    port: REDIS_CONF && REDIS_CONF.port,
  })
}))

// logger
/* app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}) */

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app