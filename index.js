const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./Config')

const server = restify.createServer()

// Middleware
server.use(restify.plugins.bodyParser())
server.listen(config.PORT, () => {
  // mongoose.set('useNewUrlParser', true)
  mongoose.connect(config.DB_URL,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
})
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => {
  require('./routes/customers')(server)
  console.log(`Server started on port ${config.PORT}`)
})
