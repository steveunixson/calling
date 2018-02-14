var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);

router.get('/', function(req, res,) {
  res.send('hello express');
});

router.post('/api/phone/cold', function(req, res) {
  var name = req.body.name;
  var geo = req.body.geo;
  var num = req.body.num;
  var age = req.body.age;
  var notes = req.body.notes;
  res.send('submited cold');
  log.debug(name + ' ' + geo + ' ' + num + ' ' + age + ' ' + notes);
});

router.post('/api/phone/hot', function(req, res) {
  var name = req.body.name;
  var geo = req.body.geo;
  var num = req.body.num;
  var age = req.body.age;
  var notes = req.body.notes;
  res.send('submited hot');
  log.debug(name + ' ' + geo + ' ' + num + ' ' + age + ' ' + notes);
});

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


module.exports = router;
