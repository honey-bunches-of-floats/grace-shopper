const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  customerBillingAddress: {
    type: Sequelize.STRING
  },
  customerShippingAddress: {
    type: Sequelize.STRING
  }
})

module.exports = OrderDetails
