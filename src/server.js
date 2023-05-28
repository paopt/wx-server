const Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/wx', (ctx, next) => {
  console.log('xx', ctx.query);
  ctx.body = 'hello'
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
  console.log('listening on 80')
})