const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.STRING,
    processed: false
  }
})

module.exports = Order
