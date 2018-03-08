//generate superadmin credentials
var express            = require('express');
var generator          = express.Router();
var log                = require('../../libs/log')(module);
var AdminModel         = require('../models/admin.model');
var faker              = require('faker');

AdminModel.collection.drop();

var admin = new AdminModel({
    _id:         "getadmin",
    __v:         false,
    admin:       faker.name.findName(),
    password:    faker.internet.password(),
    secret:      "jumpdownandsaysomefuckinggayshit"
});

admin.save(function (err) {
    if (!err) {
        log.info("superadmin generated!");
    } else {
        log.error('Fatal DB error(%d): %s',err.message);
    }
  });

module.exports = generator;