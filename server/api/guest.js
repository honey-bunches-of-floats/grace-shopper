const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET cart from homepage (guest)
router.get('/guestcart', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//  To be added to routes.js
// for Guest cart
// <Route path="/cart" component={Cart} />

// for User cart
// <Route path="/user/:id/cart" component={Cart} />
