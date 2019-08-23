'use strict'

var express = require('express');
var UserController = require('../controllers/user-controller');

var api = express.Router();
var md_auth = require('../middlewares/authentication');

api.get('/home', UserController.home);
api.get('/test', md_auth.ensureAuth, UserController.test);
api.post('/users', UserController.saveUser);
api.post('/login', UserController.login);
api.get('/users/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);

module.exports = api;