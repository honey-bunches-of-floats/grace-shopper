const router = require('express').Router()
const User = require('../db/models/user')


router.get('/', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email: email, password: password

      }
    })
    res.send(user)
  }
  catch (err) { next(err) }
})





module.exports = router
