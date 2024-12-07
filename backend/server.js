// Disable dotenv in a production env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

// Routes import
const routes = require('./routes')

// Initialize express
const app = express()

// Port if PORT env variable does not exist in .env
const port = process.env.PORT || 3335

// CORS
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(helmet())
app.use(cookieParser())

// Routes middleware
app.use('/jaguar', routes)

// Port listener
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})