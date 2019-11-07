const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderDetails', {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  customerBillingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  customerShippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  }
})

//missing productId

module.exports = OrderDetails
