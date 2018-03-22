var mongoose = require('mongoose');
var Role = require('../models/roles.model');
var config = require('../config');
var env = process.env.NODE_ENV || 'development';
var log = require('../libs/log')(module);

exports.addRole = function (req, res) {
    var role = new Role({
        user: req.body.user,
        role: req.body.role,
      });
      role.save(function (err) {
        if (!err) {
            log.info("role added to user");
            return res.send({ status: 'OK', role:role });
        } else {
            log.error(err);
            return res.json({message: 'Internal Error'});
          }
        });
    
  }