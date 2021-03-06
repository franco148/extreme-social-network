'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var MessageSchema = schema({
    text: String,
    created_at: String,
    emiter: { type: schema.ObjectId, ref: 'User' },
    receiver: { type: schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', MessageSchema);