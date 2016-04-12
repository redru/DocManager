var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('express-jwt');

var app = express();
app.use(bodyParser.json());

// Authentication handler
/* app.all('/docmanager/*', function(req, res, next) {
    if (req.url === '/docmanager/' || req.url === '/docmanager/index.html' || req.url === '/docmanager/views/authentication_view.html' || req.url === '/docmanager/authenticate')
        next();
 }); */
app.use('/docmanager', jwt({ secret: 'Ad54_TyrwZ0?96'}).unless({path: [ '/docmanager/', '/docmanager/index.html', '/docmanager/views/authentication_view.html', '/docmanager/authenticate' ]}), function (req, res, next) {
    if (req.url === '/docmanager/views/home_view.html')
        console.log('Valid authentication token.');

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
