const axios = require('axios');
const config = require('../../config/config.test');
const wx  = require('../model/wx.model');

/**
 * 从微信服务器获取access_token
 * @returns 
 */
async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`;
  const res = await axios.post('http://www.yaojinfeng.work/api', {
    url,
    method: 'get'
  });
  return res.data;
}

/**
 * 查询access_token。数据库中有token且没有过期直接返回，否则从微信服务器查询
 * @returns 
 */
async function queryAccessToken() {
  const arr = await wx.findAll();
  if (arr.length > 0) {
    const { access_token, expires_in } = arr[0].dataValues;
    const now = parseInt(Date.now() / 1000); // 当前秒数
    // 过期
    if (expires_in < now) {
      console.log('过期')
      const { access_token, expires_in } = await getAccessToken();
      // 更新token到数据库
      const now = parseInt(Date.now() / 1000) + expires_in;
      await wx.update({
        access_token,
        expires_in: now
      }, {
        where: {
          access_token
        }
      });
      return access_token;
    } else {
      return access_token;
    }
  } else {
    const { access_token, expires_in } = await getAccessToken();
    // 保存token到数据库
    const now = parseInt(Date.now() / 1000) + expires_in;
    await wx.create({
      access_token,
      expires_in: now
    });
    return access_token;;
  }
}

/**
 * 创建菜单
 * @param {*} menus 
 * @returns 
 */
async function createMenu(menus) {
  const token = await queryAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`;
  const res = await axios.post(url, menus);
  return res.data;
}

module.exports = {
  createMenu
}