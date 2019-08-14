'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/extreme_mean_db')
        .then(() => {
            console.log("Connection to the database was successfully!!!");
        })
        .catch(err => console.log(err));