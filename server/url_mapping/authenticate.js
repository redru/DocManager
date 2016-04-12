var express = require('express');
var router = express.Router();

var authenticationService = require('../services/authentication');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    console.log('Url: ', req.originalUrl);
    next();
});

router.post('/', function(req, res) {
    authenticationService.authenticateUser(req, res);
});

module.exports = router;
