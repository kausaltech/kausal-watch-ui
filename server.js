// server.js
const next = require('next')
const routes = require('./routes')
const morgan = require('morgan')
const express = require('express')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  server.use(morgan('dev'))
    .use(handler)
    .listen(port, err => {
      if (err)
        throw err
      console.log(`Ready on http://localhost:${port}`)
    })
})
