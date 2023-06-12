const Router = require('koa-router');
const axios = require('axios');

const { sha1 } = require('../util');
const config = require('../../config/config.test');
const { createMenu } = require('../service/wx.service');

const router = new Router();

// 服务器认证
router.get('/wx', (ctx, next) => {
  console.log('微信公众号域名验证：', ctx.query);
  const {signature, echostr, timestamp, nonce} = ctx.query;
  const arr = [config.token, timestamp, nonce];
  const res = sha1(arr.sort().join(''));
  if (res === signature) {
    ctx.body = echostr
  } else {
    ctx.body = 'err';
  }
});

// 消息处理
router.post('/wx', (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = ctx.request.body
})

// 创建菜单
router.post('/wx.createMenu', async (ctx, next) => {
  try {
    const data = await createMenu(ctx.request.body);
    if (data.errcode === '0') {
      ctx.body = {
        code: 200,
        msg: '创建成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '创建失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: 400,
      msg: '创建失败'
    }
  }
})

module.exports = router;