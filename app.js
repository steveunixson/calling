var express         = require('express');
var port            = process.env.PORT || 8001;
var log             = require('./libs/log')(module);
var path            = require('path');
var connect         = require('connect');
var router          = require('./routes/router');
var comments        = require('./routes/comments');
var app             = express();
var bodyParser      = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(comments);
app.use(router);

//------error handler
app.use(function(req, res, next){
  res.status(404);
  log.debug('Not found URL: %s',req.url);
  res.send({ error: 'Not found' });
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);
  res.send({ error: err.message });
  return;
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random error!'));
});
//-----------------------

app.get('/', function(req, res,) {
  res.send('hello express');
});

app.listen(port, function () {
  log.debug('Example app listening on port :' + port);
});

module.exports = app;