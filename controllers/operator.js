const Script = require('../models/script.model');
const StatusModel = require('../models/base.model');
const log = require('../libs/log')(module);

exports.postComment = function (req, res) {
    res.json({message: 'POST comment endpont'}) //show all DB
  }

  exports.getComment = function (req, res) {
    res.json({message: 'GET comment endpont'}) //show all DB
  }


  exports.getStatic = function (req, res) {
    res.json({message: 'GET statistics endpoint'}) //show all DB
  }

  exports.postStatic = function (req, res) {
    res.json({message: 'index page'})
  }
    
  function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
        });
      }
  exports.getPhone = function (req, res) {
    find(req.body.base, {_id : req.body._id}, function (err, docs) {
      return res.send(docs);
  });   
  }

  exports.getScript = function (req, res) {
    res.json({message: 'index page'})
  }

  exports.workspace = function (req, res) {
    res.json({message: 'workspace'}); //show all users
  }