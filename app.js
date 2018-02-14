var express = require('express');
var port = process.env.PORT || 8001;
var log = require('./libs/log')(module);
var path = require('path');
var connect = require('connect')
var router = require('./routes/router');
var app = express()
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, function () {
  log.debug('Example app listening on port :' + port);
});

module.exports = app;