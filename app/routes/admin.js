var express         = require('express');
var admins          = express.Router();
var log             = require('../../libs/log')(module);
var superadmin      = require('config.json')('app/config/superadmin.json')

admins.use((req, res, next) => {
    if (req.body.admin != superadmin.admin) {
        return res.send('acsess denied');
      }
      else  {
        next();
      }
});

admins.use((req, res, next) => {
    if (req.body.password != superadmin.credentials.password) {
        return res.send('acsess denied');
      }
      else {
        next();
      };
});

admins.use((req, res) => {
    //TODO add secret hashing
    if (req.body.secret != superadmin.credentials.secret) {
        return res.send('acsess denied');
      }
      else {
        res.send('acsess granted')
      }
});

admins.post('/api/admins/', function (req, res) {

});

  module.exports = admins;