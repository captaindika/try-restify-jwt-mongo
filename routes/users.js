const errors = require('restify-errors')
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = _server => {
  // register
  _server.post('/register', (req, res, next) => {
    const { email, password } = req.body
    // const newPassword = bcrypt.hashSync(password)
    const user = new User({
      email,
      password
    })
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash
        try {
          const newUser = await user.save()
          res.send(201)
        } catch (err) {
          return next(new errors.InternalError(err.message))
        }
      })
    })
    console.log(user)
  })
}