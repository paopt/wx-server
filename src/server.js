const Koa = require('koa');
const { koaBody } = require('koa-body');
const logger = require('koa-logger');
const statics = require('koa-static');
const path = require('path');

const wxRouter = require('./routes/wx.route');
const apiRouter = require('./routes/api.route');

const app = new Koa();
app.use(logger());
app.use(koaBody());
app.use(wxRouter.routes());
app.use(apiRouter.routes());
app.use(statics(path.join(__dirname, '../static')))

app.listen(80, () => {
  console.log('listening on 80')
})