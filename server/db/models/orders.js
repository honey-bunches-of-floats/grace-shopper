const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {})

module.exports = Orders
