const router = require('express').Router()
const {User} = require('../db/models')
const {Product} = require('../db/models')
const {Order} = require('../db/models/orders')
module.exports = router

//user route to their cart
router.get('/', async (req, res, next) => {
  try {
    console.log('req.user: ', req.user)
    const userCart = await Order.findByPk({
      //should calling to order table
      where: {
        userId: req.params.id
      }
    })
    res.send(userCart)
  } catch (error) {
    next(error)
  }
})

//user add to their cart
router.put('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      console.log('req.user.id: ', req.user.id)
      const addedItem = await Order.findOrCreate({
        where: {
          userId: req.user.id
        }
      })
      const currentInstance = addedItem[0]
      currentInstance.products.push(req.body.item)
      const savedInstance = await currentInstance.save()
      res.send(savedInstance).status(200)
    } else {
      const addedItem = await Order.findOrCreate({
        where: {
          userId: req.session.userId
        }
      })
      const currentInstance = addedItem[0]
      currentInstance.products.push(req.body.item)
      const savedInstance = await currentInstance.save()
      res.send(savedInstance).status(200)
    }
  } catch (error) {
    next(error)
  }
})
