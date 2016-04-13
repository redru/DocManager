var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('express-jwt');

var app = express();
app.use(bodyParser.json());

// Authentication handler
app.use('/docmanager', jwt({ secret: 'Ad54_TyrwZ0?96'}).unless({path: [ '/docmanager/', '/docmanager/index.html', '/docmanager/nav_menu.html', '/docmanager/views/authentication_view.html', '/docmanager/authenticate' ]}),
    function (req, res, next) {
        if (req.url === '/docmanager/views/home_view.html')
            console.log('Valid authentication token.');

        next();
    }
);

// Static files
app.use( ['/docmanager'], express.static('./app')); // Protected
app.use( ['/resources'], express.static('./app/resources')); // Not protected
app.use( ['/client'], express.static('./bower_components')); // Not protected

// Services mappings
app.use('/docmanager/authenticate', require('./server/url_mapping/authenticate'));

// Error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send();
    } else {
        res.status(500).send();
    }
});

app.listen(80, function () {
    console.log('Server running on port 80...');
});
