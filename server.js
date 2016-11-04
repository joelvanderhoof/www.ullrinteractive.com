var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

//Serves the root directory relative to the directory that the express app is run from
app.use(express.static(path.join(__dirname, '/')));

// Sends the index.html file as response when the '/' route is called
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('The server is listening on port ' + port);
});
