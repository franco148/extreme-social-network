'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Load Routes
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
// Routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello world from NodeJs!!!'
    });
});

app.get('/tests', (req, res) => {
    res.status(200).send({
        message: 'Test action in the server...'
    });
});

// Export
module.exports = app;