const Router = require('koa-router');

const { sha1 } = require('../util');
const config = require('../../config');

const router = new Router({prefix: '/wx'});

router.get('/verify', (ctx, next) => {
  console.log('微信公众号域名验证：', ctx.query);
  const {signature, echostr, timestamp, nonce} = ctx.query;
  const arr = [config.token, timestamp, nonce];
  const res = sha1(arr.sort().join(''));
  console.log('签名：', res)
  if (res === signature) {
    ctx.body = echostr
  } else {
    ctx.body = 'err';
  }
});

module.exports = router;