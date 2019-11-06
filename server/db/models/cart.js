// const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {})

Cart.cartContents = function(oldCart) {
  this.items = oldCart.items || {}
  this.totalQty = oldCart.totalQty || 0
  this.totalPrice = oldCart.totalPrice || 0

  this.add = function(item, id) {
    let storedItem = this.items[id]
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0}
    }
    storedItem.qty++
    storedItem.price = storedItem.item.price * storedItem.qty
    this.totalQty++
    this.totalPrice += storedItem.item.price
  }

  this.generateArray = function() {
    let arr = []
    // eslint-disable-next-line guard-for-in
    for (let id in this.items) {
      arr.push(this.items[id])
    }
    return arr
  }
}

module.exports = Cart
