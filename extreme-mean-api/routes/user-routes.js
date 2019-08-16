'use strict'

var express = require('express');
var UserController = require('../controllers/user-controller');

var api = express.Router();

api.get('/home', UserController.home);
api.get('/test', UserController.test);
api.post('/users', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;