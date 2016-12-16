'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser'); //Parse request as a JSON object
var cookieParser = require('cookie-parser'); // Parse cookies as a JSON object
var nodemailer = require('nodemailer');


var app = express();
var router = express.Router();

var port = process.env.PORT || 3000;

//Serves the root directory relative to the directory that the express app is run from
app.use(express.static(path.join(__dirname, '/public')));

//Parse application/json
app.use(bodyParser.json());
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Parse cookies as json data
app.use(cookieParser());

// Sends the index.html file as response when the '/' route is called
app.get('/', function (req, res, next) {
    res.render(__dirname +'/public/views/index.pug');
});

app.get('/contact', function (req, res, next) {
    res.render(__dirname +'/public/views/contact.pug');
});

app.post('/contact', function (req, res, next) {
    
    //Create transport object for nodemailer to call the sendMail method on
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'joelvanderhoof@gmail.com',
            pass: 'vivianle'
        }
    });
    
    //
    var mailOptions = {
        from: req.body.email,
        to: 'joelvanderhoof@gmail.com',
        subject: 'hello',
        text: req.body.message + '\r\n\r\nName: ' + req.body.name + '\r\nEmail: ' + req.body.email
    };
        
    transporter.sendMail(mailOptions, function (error, response) {
    //Email not sent
    if (error) {
        console.log(error);
    }
    //Email sent
    else {
        console.log('email sent');
        res.render(__dirname +'/public/views/contact.pug');
    }
  });
});

app.listen(port, function () {
    console.log('The server is listening on port ' + port);
});
