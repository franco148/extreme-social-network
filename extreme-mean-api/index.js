'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;


// Connection to the database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/extreme_mean_db') // This works for newer versions of mongodb
mongoose.connect('mongodb://localhost:27017/extreme_mean_db', { useNewUrlParser: true })
    .then(() => {
        console.log("Connection to the database was successfully!!!");

        // Create the server
        app.listen(port, () => {
            console.log("Service is running on port " + port);
        })
    })
    .catch(err => console.log(err));