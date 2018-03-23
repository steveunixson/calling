var mongoose = require('mongoose');
var config = require('../config');
var Status = require('../models/status.model');
var env = process.env.NODE_ENV || 'development';
const url = config.db;
const log = require('../libs/log')(module);
    
  function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
}
  exports.getPhone = function (req, res) {
    if (!req.body.base)
    return res.status(400).send('No base was specified.');

    find(req.body.base, {_id : req.body._id}, function (err, docs) {
      return res.send(docs);
  });   
  }

  exports.getStatus = function (req, res) {
    res.json({message: 'status'}); //show all users
    
  }

  exports.postStatus = function (req, res) {
    var status = new Status({
      no_answer: req.body.no_answer,
      no_connect: req.body.no_connect,
      deny: req.body.deny,
      callback: req.body.callback,
      appointment: req.body.appointment,
      appointment_time: req.body.appointment_time,
      age: req.body.age,
      operator: req.body.operator,
      comment: req.body.comment,
      number: req.body.number,
      client: req.body.client
    });
    status.save(function (err) {
      if (!err) {
          log.debug("status added to collection");
          return res.send({ status: 'OK', status:status });
      } else {
          log.error(err);
          return res.json({message: 'Internal Error'});
        }
      });  
  }