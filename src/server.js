const Koa = require('koa');
const { koaBody } = require('koa-body');
const logger = require('koa-logger');

const wxRouter = require('./routes/wx.route');
const apiRouter = require('./routes/api.route');

const app = new Koa();
app.use(logger());
app.use(koaBody());
app.use(wxRouter.routes());
app.use(apiRouter.routes());

app.listen(80, () => {
  console.log('listening on 80')
})