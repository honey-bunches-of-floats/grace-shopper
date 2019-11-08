const router = require('express').Router()
const {User} = require('../db/models')
const {Product} = require('../db/models')
const Order = require('../db/models/orders')

module.exports = router

//user route to their cart
router.get('/', async (req, res, next) => {
  console.log('got to the order GET')
  try {
    console.log('req.user: ', req.user)
    const userCart = await Order.findOne({
      //should calling to order table
      where: {
        userId: req.user.id
      }
    })
    res.send(userCart)
  } catch (error) {
    next(error)
  }
})

//user add to their cart
router.put('/', async (req, res, next) => {
  console.log('from inside of api/order router.put')
  try {
    if (req.user.id !== undefined) {
      console.log('req.user.id: ', req.user.id)
      const addedItem = await Order.findOrCreate({
        where: {
          userId: req.user.id
        }
      })
      const currentInstance = addedItem[0]
      currentInstance.products.push(req.body.item)
      const updatedInstance = await currentInstance.update({
        products: currentInstance.products
      })
      res.send(updatedInstance).status(200)
    }

    console.log('req.session:', req.session)
    const addedItem = await Order.findOrCreate({
      where: {
        userId: req.sessionID
      }
    })
    const currentInstance = addedItem[0]
    currentInstance.products.push(req.body.item)
    const updatedInstance = await currentInstance.update({
      products: currentInstance.products
    })
    res.send(updatedInstance).status(200)
  } catch (error) {
    next(error)
  }
})
