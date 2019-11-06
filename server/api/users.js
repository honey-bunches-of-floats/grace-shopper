const router = require('express').Router()
const {User} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
//auth
// router.get('/:id', async (req, res, next) => {
//   try {
//     const userById = await User.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(userById)
//   } catch (error) {
//     next(error)
//   }
// })

// route for the user's cart
router.get('/user/:id/cart', async (req, res, next) => {
  try {
    const userCart = await User.findAll({
      where: {
        userId: req.params.id
      },
      include: ['Cart']
    })
    res.send(userCart)
  } catch (error) {
    next(error)
  }
})

// router.put('/user/:id/cart', async (req, res, next) => {
//   try {
//     const userById = await User.findAll({
//       where: {
//         userId: req.params.id
//       },
//     })
//     const newItem =
//     res.send(userCart)
//   } catch (error) {
//     next(error)
//   }
// })
