'use strict';

var path = require('path');
var express = require('express');
var nodemailer = require('nodemailer');


var app = express();
var routes = require('./routes/index');
app.use('/', routes);

//Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

var port = process.env.PORT || 3000;

//Serves the root directory relative to the directory that the express app is run from
app.use(express.static(path.join(__dirname, '/public')));


app.listen(port, function () {
    console.log('The server is listening on port ' + port);
});
