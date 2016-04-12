var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    console.log('Url: ', req.originalUrl);
    next();
});

router.get('/', function(req, res) {
    var authenticationService = require('../services/authentication');
    authenticationService.authenticateUser(req, res);
});

router.post('/', function(req, res) {
    var authenticationService = require('../services/authentication');
    authenticationService.authenticateUser(req, res);
});

module.exports = router;
