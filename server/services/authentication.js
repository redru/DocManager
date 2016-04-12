var mongoose = require('mongoose');
var UsersModel = require('../dao/mongodb/schemas/user');

var Service = function () {};

Service.prototype.authenticateUser = function(req, res) {
    mongoose.connect('mongodb://localhost:27017/docmanager');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        UsersModel.findByUserPass('luca', '$2a$04$hVRXMJNQzrlIJrbLEcv6l.fwJoiINXBJJA5paZr4.13D.sjio1VbC', function (err, data) {
            console.log('error: ' + err);
            console.log('result: ' + data[0]._doc);

            err ? res.status(404).send('Generic error.') : res.status(200).send(data);
            mongoose.disconnect();
        });
    });
};

module.exports = new Service();
