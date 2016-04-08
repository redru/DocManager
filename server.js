var express = require('express'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Authentication
app.get('/docmanager/*', function(req, res, next) {
    if (req.url === '/docmanager/auth') {
        var user = {
            name: 'luca',
            password: 'zenobi',
            admin: true
        };

        var token = jwt.sign(user, 'secretword', {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    } else if (!req.user || !req.user.admin)
        return res.sendStatus(401);

    res.sendStatus(200);
});

// Static files
app.use( '/docmanager', express.static('./app'));

app.listen(80, function () {
    console.log('Server running on port 80...');
});
