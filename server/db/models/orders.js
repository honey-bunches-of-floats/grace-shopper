const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  customerAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  customerEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  status: {
    type: Sequelize.STRING,
    processed: false
  }
})


module.exports = Order
