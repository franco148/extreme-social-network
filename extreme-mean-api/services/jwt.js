'use strict'

var jwt = require('jwt-simple');
var jwt moment = require('moment');
var secret = 'key_word_for_token';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        lastName: user.lastName,
        nickName: user.nickName,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}