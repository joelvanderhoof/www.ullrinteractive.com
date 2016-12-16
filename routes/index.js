'use strict';

var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser'); //Parse request as a JSON object


var app = express();
var router = express.Router();


//Parse application/x-www-form-urlencoded as callback function to be called as middleware for specific route
var urlencodedParser = bodyParser.urlencoded({ extended: true});

//Namespace api for router
app.use('/api', router);

// Sends the index.html file as response when the '/' route is called
router.get('/', function (req, res, next) {
    res.render('index.pug');
});

router.get('/contact', function (req, res, next) {
    res.render('contact.pug');
});

router.post('/contact', urlencodedParser, function (req, res, next) {
    //Create transport object for nodemailer to call the sendMail method on
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'joelvanderhoof@gmail.com',
            pass: 'vivianle'
        }
    }),
        mailOptions = {
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
        res.render('contact.pug');
    }
  });
});

module.exports = router;
