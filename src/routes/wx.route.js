const Router = require('koa-router');
const axios = require('axios');

const { sha1, parseXml } = require('../util');
const config = require('../../config');
const { createMenu, getUserInfo, queryTicket} = require('../service/wx.service');
const { replyMsg } = require('../service/msg.service');

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
router.post('/wx', async (ctx, next) => {
  try {
    ctx.body = await replyMsg(ctx.request.body);
  } catch (e) {
    console.error(e);
    ctx.body = 'success'
  }
})

// 创建菜单
router.post('/wx/createMenu', async (ctx, next) => {
  try {
    const data = await createMenu(ctx.request.body);
    if (data.errcode === 0) {
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

// 获取用户信息
router.get('/wx/getUserInfo', async (ctx, next) => {
  try {
    const code = ctx.request.query.code;
    const user = await getUserInfo(code)
    ctx.body = {
      code: 200,
      data: user
    }
  } catch (error) {
    ctx.body = {
      code: 400,
      msg: '出错了',
      data: null
    }
  }
})

// 获取jsapi签名信息
router.get('/wx/jsapi', async (ctx, next) => {
  try {
    const url = ctx.request.query.url;
    console.log('签名url：', url);
    const ticket = await queryTicket();
    const noncestr = 'hello';
    const timestamp = Date.now();
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    const signature = sha1(str);
    ctx.body = {
      code: 200,
      msg: 'success',
      data: {
        noncestr,
        timestamp,
        signature
      }
    }
  } catch (error) {
    ctx.body = {
      code: 400,
      msg: '获取失败',
      data: null
    }
  }
})

module.exports = router;