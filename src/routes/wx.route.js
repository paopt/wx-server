const Router = require('koa-router');
const axios = require('axios');

const { sha1 } = require('../util');
const config = require('../../config');
const wx = require('../model/wx.model');


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

router.get('/accesstoken', async (ctx, next) => {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`;
  try {
    const res = await axios.post('http://www.yaojinfeng.work/api', {
        url,
        method: 'get'
    });
    ctx.body = res.data;
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: error.message
    }
  }
});

module.exports = router;