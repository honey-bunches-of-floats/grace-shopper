const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    isEmpty: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  theme: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    isEmpty: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false,
    defaultValue:
      'https://c7.uihere.com/files/481/235/705/sock-stock-photography-christmas-stocking-illustration-socks-vector-material.jpg'
  }
})

module.exports = Products
