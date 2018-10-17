const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-middleware')
const webpackConfig = require('./webpack.config.js')
const path = require('path')

const app = express()

// Use webpack middleware for building assets
app.use(webpackMiddleware(webpack(webpackConfig)))

// Set EJS template directory
app.set('views', path.join(__dirname, '/views'))

// Set the express view engine to EJS
app.set('view engine', 'ejs')

// Static image route
app.use('/images', express.static(path.resolve(__dirname, './assets/images/')))

app.get('*', function (req, res) {
  res.render('index')
})

app.listen(8000)
