const Sequelize = require('sequelize')
const db = require('../db')

const ProcessedOrder = db.define('processedOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = ProcessedOrder
