const router = require('express').Router()
const Order = require('../db/models/orders')
const OrderDetails = require('../db/models/orderDetails')
const Products = require('../db/models/products')

module.exports = router

//user route to their cart
router.get('/', async (req, res, next) => {
  console.log('got to the order GET')
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    const cartDetails = await OrderDetails.findOne({
      where: {
        orderId: userCart.id,
        userId: req.user.id
      }
    })
    console.log('cart details from GET cart:', cartDetails)
    res.send(cartDetails)
  } catch (error) {
    next(error)
  }
})

//user add to their cart
router.put('/', async (req, res, next) => {
  try {
    if (req.user !== undefined) {
      const openOrder = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      const foundOpenOrder = openOrder[0]
      const addedItem = await OrderDetails.findOrCreate({
        where: {
          userId: req.user.id,
          orderId: foundOpenOrder.id,
          productId: req.body.itemId
        }
      })

      res.send(addedItem[0]).status(200)
    } else {
      if (!req.session.guestCart) {
        req.session.guestCart = []
      }
      req.session.guestCart.push(req.body.itemId)

      res.send(req.session.guestCart)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.user !== undefined) {
      const userCart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      await OrderDetails.destroy({
        where: {
          id: userCart.orderDetailId,
          productId: req.body.itemId
        }
      })
      res.sendStatus(200)
    } else {
      req.session.cart = req.session.cart.filter(item => {
        return item !== req.body.itemId
      })

      res.status(200).send(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})
