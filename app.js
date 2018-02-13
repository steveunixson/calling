var express = require('express');
//var config = require('config.json')('./config/config.json');
//TODO: add config module
var port = process.env.PORT || 8001;
var log = require('./libs/log')(module);

var path = require('path');
var connect = require('connect')
var router = require('./libs/router');
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.post('/api/phone', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    var num = req.body.num;
    res.send(user_id + ' ' + token + ' ' + geo + ' ' + num);
    log.debug(user_id + ' ' + token + ' ' + geo + ' ' + num);
});

app.listen(port, function () {
  log.debug('Example app listening on port :' + port);
});