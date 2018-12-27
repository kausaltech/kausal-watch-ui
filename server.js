// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')


const express = require('express')


app.prepare().then(() => {
  const server = express()

  server.use(morgan('dev'))
    .use(handler)
    .listen(3000)
})
