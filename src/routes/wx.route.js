const Router = require('koa-router');
const axios = require('axios');

const { sha1 } = require('../util');
const config = require('../../config');
const { queryAccessToken } = require('../service/wx.service');

const router = new Router();

router.get('/wx', (ctx, next) => {
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

router.get('/accesstoken', async (ctx, next) => {
  try {
    const token = await queryAccessToken();
    ctx.body = {
      code: 200,
      data: {
        token
      }
    }
  } catch (error) {
    ctx.body = {
      code: 1001,
      msg: '获取失败',
      data: null
    }
  }
});

module.exports = router;