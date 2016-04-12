var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());

app.get('/docmanager/*', function(req, res, next) {
    next();
});

// Static files
app.use( ['/docmanager'], express.static('./app')); // Protected
app.use( ['/resources'], express.static('./app/resources')); // Not protected

// Services mappings
app.use('/docmanager/authenticate', require('./server/url_mapping/authenticate'));

app.listen(80, function () {
    console.log('Server running on port 80...');
});
