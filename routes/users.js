const errors = require('restify-errors')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const auth = require('../auth')
const jwt = require('jsonwebtoken')
const Config = require('../Config')

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

  // Auth User
  _server.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    try {
      const user = await auth.authenticate(email, password)
      // create JWT
      const token = jwt.sign(user.toJSON(), Config.JWT_KEY , {
        expiresIn: '15m'
      })
      const { iat, exp } = jwt.decode(token)
      res.send(200, {msg: 'Login Success...', iat, exp, token})
      next()
    } catch (err) {
      // user unauthorized
      return next(new errors.NotAuthorizedError(err))
    }
  })
}