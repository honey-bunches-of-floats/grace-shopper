const router = require('express').Router()
const Order = require('../db/models/orders')
const OrderDetails = require('../db/models/orderDetails')
const Products = require('../db/models/products')

module.exports = router

//user route to their cart
router.get('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    const cartDetails = await OrderDetails.findAll({
      where: {
        orderId: userCart.id,
        userId: req.user.id
      },
      include: [{model: Products}]
    })
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
      if (!addedItem[1]) {
        addedItem[0].itemQuantity++
        await addedItem[0].save()
      }

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

router.delete('/:id', async (req, res, next) => {
  try {
    console.log('from inside delete cart:', req.params.id)
    if (req.user !== undefined) {
      const userCart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      await OrderDetails.destroy({
        where: {
          orderId: userCart.id,
          productId: req.params.id,
          userId: req.user.id
        }
      })
      res.sendStatus(200)
    } else {
      req.session.cart = req.session.cart.filter(item => {
        return item !== req.params.id
      })

      res.status(200).send(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})
