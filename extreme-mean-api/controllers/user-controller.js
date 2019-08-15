'use strict'

var User = require('../models/user');

function home (req, res) {
    res.status(200).send({
        message: 'Hello world from NodeJs!!!'
    });
};

function test (req, res) {
    res.status(200).send({
        message: 'Test action in the server...'
    });
};

module.exports = {
    home,
    test
}