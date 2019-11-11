const router = require('express').Router()

//GET cart
router.get('/', (req, res, next) => {
  res.send(req.session.cart)
})

//will update specific products in the cart by product id
router.put('/', (req, res, next) => {
  let product = req.body
  if (req.session.cart.length === 0) {
    req.session.cart.push(product)
    product.quantity = 1
  } else {
    for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].id === product.id) {
        req.session.cart[i].quantity++
        break
      }
      if (i === req.session.cart.length - 1) {
        if (req.session.cart[i].id !== product.id) {
          req.session.cart.push(product)
          product.quantity = 1
          break
        }
      }
    }
  }
  res.status(200).send(req.session.cart)
})

//delete item from
//return array that does not include the deleted item
router.put('/deleteFromCart/', (req, res, next) => {
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === req.body.productId) {
      req.session.cart[i].quantity--
    }
    if (req.session.cart[i].quantity < 1) {
      req.session.cart = req.session.cart.filter(item => {
        return item.id !== req.session.cart[i].id
      })
    }
  }
  res.status(200).send(req.session.cart)
})

module.exports = router
