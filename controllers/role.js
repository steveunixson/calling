var mongoose = require('mongoose');
var Role = require('../models/roles.model');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var faker = require('faker');
var config = require('../config');
var env = process.env.NODE_ENV || 'development';
var log = require('../libs/log')(module);

exports.addRole = function (req, res) {

  var key = 'thisisaverysecurekey';

  var mockUser = {
    token: faker.random.uuid()
  }

  var createToken = function (user) {
    var token = jwt.sign(user, key);
    return token;
  };

    var role = new Role({
        username: req.body.username,
        role: req.body.role,
        token: createToken(mockUser)
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

  