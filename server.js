var express = require('express');
var app = express();

app.use('/docmanager', express.static('./app'));

app.listen(80, function () {
    console.log('Server running on port 80...');
});
