const router = require('express').Router()
const Products = require('../db/models/products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('req.user:', req.user)
    console.log('req.session:', req.sessionID)
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Products.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
