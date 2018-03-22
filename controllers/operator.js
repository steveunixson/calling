var mongoose = require('mongoose');
var config = require('../config');
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

  exports.workspace = function (req, res) {
    res.json({message: 'workspace'}); //show all users
    
  }