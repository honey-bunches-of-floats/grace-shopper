const router = require('express').Router()
module.exports = router

router.use('/order', require('./order'))
router.use('/products', require('./products'))
// router.use('/guestcart', require('./guest'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
