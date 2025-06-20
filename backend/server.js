// Disable dotenv in a production env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

// Importa o roteador principal que criamos
const mainRouter = require('./routes')

// Initialize express
const app = express()

// Port
const port = process.env.PORT || 3335

// Configuração de CORS (a sua está ótima)
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`, // Ex: 'http://localhost:5173'
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Adicionei PATCH para o cancelamento
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(helmet())
app.use(cookieParser())

app.use('/api', mainRouter)

// Port listener
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})