const router = require('express').Router()
const {Products} = require('../db/models/products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/products/:id', async (req, res, next) => {
  try {
    const singleProduct = await Products.findById(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
