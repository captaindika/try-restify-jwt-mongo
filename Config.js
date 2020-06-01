require('dotenv').config()

module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  URL: process.env.URL,
  DB_URL: process.env.DB,
  JWT_KEY: process.env.JWT_KEY
}