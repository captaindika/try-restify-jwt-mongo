const errors = require('restify-errors')
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = _server => {
  // register
  _server.post('/register', (req, res, next) => {
    const { email, password } = req.body
    const newPassword = bcrypt.hashSync(password)
    const user = new User({
      email,
      password: newPassword
    })
    console.log(user)
  })
}