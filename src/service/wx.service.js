const axios = require('axios');
const config = require('../../config');
const wx  = require('../model/wx.model')

async function getAccessToken() {
  //  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
  wx.findAll().then(res => {
    console.log(res)
  });
}

getAccessToken()