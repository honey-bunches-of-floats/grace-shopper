const db = require('../db')
const User = require('./user')
const Products = require('./products')
const Order = require('./orders')
const OrderDetails = require('./orderDetails')

Products.hasMany(OrderDetails)
OrderDetails.belongsTo(Products)
Order.belongsTo(User, {through: 'orderDetails'})
User.hasMany(OrderDetails)
User.hasMany(Order)
Order.hasMany(OrderDetails)
//OrderDetails.belongsTo(Order)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Products,
  Order
}
