'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Load Routes
var user_routes = require('./routes/user-routes');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
// Routes
app.use('/api', user_routes);

// Export
module.exports = app;