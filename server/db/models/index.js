const db = require('../db')
const User = require('./user')
const Products = require('./products')
const Order = require('./orders')
const ProcessedOrder = require('./processedOrders')

User.hasMany(Order)
Products.belongsToMany(Order, {through: 'OrderDetails'})
Order.belongsTo(User)
User.hasMany(ProcessedOrder)
Order.hasOne(ProcessedOrder)

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
