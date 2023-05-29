const { DataTypes } = require('sequelize')

const db = require('../db')

// 创建模型(Model zd_user -> 表 zd_users)
const Wx = db.define('wx', {
  // id 会被sequelize自动创建, 管理
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '微信accessToken',
  },
  expiresIn: {
    type: DataTypes.NUMBER,
    allowNull: false,
    comment: '过期时间',
  }
})

Wx.sync({})

module.exports = Wx