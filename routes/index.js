'use strict';

module.exports = function(app) {
     var core = require(/*Put controller for contact page here*/);

function sendMail () {
    var data = {
        contactEmail: joelvanderhoof@yahoo.com,
        subject: 'This is the subject',
        message: 'This is a message'
    }
    return data;
}
    app.route('/contact').post(/*method from contact page controller that makes the http post with the contact form data*/sendMail);
}

//Put this in the server controller file
/*
var data = req.body;

transporter.sendMail({
    from: data.contactEmail,
    to: contact@ullerinteractive.com,
    subject: data.subject,
    message: data.contactMsg
});

res.json(data);
*/