const errors = require('restify-errors')
const Customer = require('../models/customers')

module.exports = _server => {
  // get
  _server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({})
      res.send(200, customers)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  //get by
  _server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id)
      res.send(customer)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`Customer id ${req.params.id} not found`))
    }

  })

  // add
  _server.post('/customers/add', async (req, res, next) => {
    // check for req is JSON 
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expects \'application/json'))
    }
    const { name, email, balance } = req.body
    const customer = new Customer({
      name : name,
      email : email,
      balance : balance
    })
    try {
      const newCustomer = await customer.save()
      res.send(201, {msg: 'Customer created', data: newCustomer})
    } catch (err) {
      return next(new errors.InternalError(err.message))
    }
  })

}