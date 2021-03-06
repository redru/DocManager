var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = Schema({
    _id: String,
    _username: String,
    _password: String,
    _role: String
});

user.statics.findByUsername = function (username, callback) {
    this.find({ 'username': username }, function(err, data) {
        if (err)
            console.log(err);

        return err ? callback(err, null) : callback(null, data);
    });
};

module.exports = mongoose.model('users', user);
