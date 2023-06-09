const { DataTypes } = require('sequelize')

const db = require('../db')

const Wx = db.define('wx_token', {
  // id 会被sequelize自动创建, 管理
  access_token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '微信accessToken',
  },
  expires_in: {
    type: DataTypes.NUMBER,
    allowNull: false,
    comment: '过期时间',
  }
})

Wx.sync({})
module.exports = Wx