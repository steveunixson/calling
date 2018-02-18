var express         = require('express');
var router          = express.Router();
var log             = require('../libs/log')(module);
var ClientModel    = require('../libs/database');
var methodOverride  = require('method-override')
router.use(methodOverride('_method'))

router.get('/api/numbers', function(req, res) {
  //res.send('This is not implemented now');
  return ClientModel.find(function (err, clients) {
    if (!err) {
        return res.send(clients);
    } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
    }
  });
});

router.get('/api/numbers/:id', function(req, res) {
  res.send('This is not implemented now');
});

router.post('/api/numbers', function(req, res) {
  res.send('This is not implemented now');
});

router.put('/api/numbers/:id', function (req, res){
  res.send('This is not implemented now');    
});

router.delete('/api/numbers/:id', function (req, res){
  res.send('This is not implemented now');
});

module.exports = router;
