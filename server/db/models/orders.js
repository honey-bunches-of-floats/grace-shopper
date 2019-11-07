const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.STRING,
    processed: false
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Order
