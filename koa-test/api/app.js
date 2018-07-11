const Koa = require('koa');
const Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/text', async ctx => {
  ctx.body = 'hello world'
})

router.get('/json', async ctx => {
  ctx.body = {
    'hello': "world",
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app
