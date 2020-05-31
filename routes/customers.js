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

  //get by id
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
      return next(new errors.InvalidContentError('Expects \'application/json\''))
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

  // Update
  _server.put('/customers/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError('Expect \'application/json\''))
    }
    try {
      const newCustomer = await Customer.findOneAndUpdate({ _id: req.params.id}, req.body)
      res.send(200, {msg: 'Customer updated'})
      next()
    }
    catch(err) {
      return next(new errors.ResourceNotFoundError(`Customer id ${req.params.id} not found`))
    }
  })

  // delete
  _server.del('/customers/:id', async (req, res, next) => {
    try {
      await Customer.findOneAndRemove({ _id: req.params.id})
      res.send(200, {msg: 'Customer deleted'})
    }
    catch (err) {
      return next(new errors.ResourceNotFoundError(`Customer id ${req.params.id} not found`))
    }
  })
}