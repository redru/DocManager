var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var UsersModel = require('../dao/mongodb/schemas/user');

var Service = function () {};

Service.prototype.authenticateUser = function(req, res) {
    mongoose.connect('mongodb://localhost:27017/docmanager');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        UsersModel.findByUsername(req.body.username, function (err, data) {

            if (err) {
                console.log('Error: ' + err);
                res.status(401).end();
            } else if (data.length < 1) {
                console.log('Error: username not found.');
                res.status(401).end();
            } else if (!bcrypt.compareSync(req.body.password, data[0]._doc.password)) {
                console.log('Error: password not matches.');
                res.status(401).end();
            } else {
                console.log('User "' + data[0]._doc.username + '" authenticated.');
                var token = jwt.sign({ username: data[0]._doc.username, role: data[0]._doc.role }, 'Ad54_TyrwZ0?96');

                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                    'Authorization': 'Bearer ' + token
                });

                res.end();
            }

            mongoose.disconnect();
            db.removeAllListeners();
        });
    });

};

module.exports = new Service();
