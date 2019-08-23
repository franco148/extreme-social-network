'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var jwt = require('../services/jwt');

function home(req, res) {
    res.status(200).send({
        message: 'Hello world from NodeJs!!!'
    });
};

function test(req, res) {
    res.status(200).send({
        message: 'Test action in the server...'
    });
};

function saveUser(req, res) {
    var parameters = req.body;

    var user = new User();
    if (parameters.email) {
        user.name = parameters.name;
        user.lastName = parameters.lastName;
        user.nickName = parameters.nickName;
        user.email = parameters.email;
        user.role = 'ROLE_USER';

        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nickName.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error getting users.' });

            if (users && users.length > 0) {
                return res.status(400).send({ message: 'Error - User already exist!' });
            } else {
                bcrypt.hash(parameters.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, usr) => {
                        if (err) return res.status(500).send({ message: 'Something went wrong, the user could not be saved.' });

                        if (usr) {
                            res.status(200).send({ user: usr });
                        } else {
                            res.status(500).send({ message: 'User could not be registered.' });
                        }
                    })
                });
            }
        })
    } else {
        res.status(400).send({
            message: 'Some required fields are missing!'
        });
    }
}

function login(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Request error when login.' });

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.getToken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user });
                    }
                } else {
                    return res.status(500).send({ message: 'Request error when login.' });
                }
            });
        } else {
            return res.status(500).send({ message: 'Request error when login.' });
        }
    });
}

function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error getting user.' });
        if (!user) return res.status(404).send({ message: 'The user does not exist' });

        return res.status(200).send({ user });
    });
}

function getUsers(req, res) {
    var loggedUserId = req.user.sub;

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemPerPage = 5;
    console.log('XXXXXXXXXXXXXXXXXXXXX');
    User.find().sort('_id').paginate(page, itemPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error getting user.' });
        if (!users) return res.status(404).send({ message: 'There are not registered users.' });

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemPerPage)
        });
    });
}

module.exports = {
    home,
    test,
    saveUser,
    login,
    getUser,
    getUsers
}