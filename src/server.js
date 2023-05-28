const Koa = require('koa');
const Router = require('koa-router');

const config = require('../config');
const { sha1 } = require('./util')


var app = new Koa();
var router = new Router();

router.get('/wx', (ctx, next) => {
  console.log('微信公众号域名验证：', ctx.query);
  const {signature, echostr, timestamp, nonce} = ctx.query;
  const arr = [config.token, timestamp, nonce];
  const res = sha1(arr.sort().join(''));
  console.log('签名：', res)
  if (res === signature) {
    ctx.body = echostr
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
  console.log('listening on 80')
})