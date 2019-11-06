const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    isEmpty: false
  }
})

module.exports = Orders
