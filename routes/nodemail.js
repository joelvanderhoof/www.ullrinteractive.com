var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var mailOptions = {
    from: "'Joel Vanderhoof' <joelvanderhoof@yahoo.com>",  //sender address
    to: 'joel@ullrdigital.com', //list of recipents
    subject: 'Hello',
    text: 'Hello world',
    html: '<b>Hello world</b>'
};

transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        return console.log(err);
    }
    console.log('Message sent: ' + info.response);
});

