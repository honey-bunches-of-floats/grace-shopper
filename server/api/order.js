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
    // console.log('req.user.id: ', req.user.id)
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
    if (req.user.id) {
      console.log('req.user.id: ', req.user.id)
      const addedItem = await Order.findOrCreate({
        where: {
          userId: req.user.id
        }
      })
      const currentInstance = addedItem[0]
      console.log('req.body', req.body)
      console.log('added item:', addedItem[1])
      console.log('currentInstance:', currentInstance)
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
