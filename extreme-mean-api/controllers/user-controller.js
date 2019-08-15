'use strict'

var bcrypt = require('bcrypt-nodejs');

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

function saveUser(req, res) {
    var parameters = req.body;
    
    var user = new User();
    if (parameters.email) {
        user.name = parameters.name;
        user.lastName = parameters.lastName;
        user.nickName = parameters.nickName;
        user.email = parameters.email;
        user.role = 'ROLE_USER';

        User.find({ $or: [
            {email: user.email.toLowerCase()},
            {nick: user.nickName.toLowerCase()}
        ]}).exec((err, users) => {
            if(err) return res.status(500).send({message: 'Error getting users.'});

            if(users && users.length > 0) {
                return res.status(400).send({message: 'Error - User already exist!'});
            } else {
                bcrypt.hash(parameters.password, null, null, (err, hash) => {
                    user.password = hash;
        
                    user.save((err, usr) => {
                        if(err) return res.status(500).send({message: 'Something went wrong, the user could not be saved.'});
        
                        if (usr) {
                            res.status(200).send({user: usr});
                        } else {
                            res.status(500).send({message: 'User could not be registered.'});
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

module.exports = {
    home,
    test,
    saveUser
}