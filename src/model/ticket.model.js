const { DataTypes } = require('sequelize')

const db = require('../db')

const Ticket = db.define('wx_ticket', {
  // id 会被sequelize自动创建, 管理
  ticket: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'jsapi ticket',
  },
  expires_in: {
    type: DataTypes.NUMBER,
    allowNull: false,
    comment: '过期时间',
  }
})

Ticket.sync({})
module.exports = Ticket