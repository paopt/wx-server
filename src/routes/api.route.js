const Router = require('koa-router');
const axios = require('axios');

const router = new Router();

// 通过云服务器进行代理转发
router.post('/api', async (ctx, next) => {
  const { url, method, params, data, headers } = ctx.request.body;
  console.log(url, method, params, data, headers);

  try {
    const res = await axios({
      url, method, params, data, headers
    });
    ctx.body = res.data;
  } catch (error) {
    ctx.body = error
  }
});

module.exports = router;