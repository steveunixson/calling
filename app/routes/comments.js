var express         = require('express');
var comments        = express.Router();
var log             = require('../../libs/log')(module);
var CommentModel    = require('../models/comments.model');
var methodOverride  = require('method-override')
comments.use(methodOverride('_method'))

comments.get('/api/comments/', function (req, res){
    return CommentModel.find(function (err, comment) {
        if (!err) {
            return res.send(comment);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
      });
});

comments.get('/api/comments/:id', function (req, res){
    res.send('This endpoint should get comments by id');
});

comments.post('/api/comments/', function (req, res){
    //res.send('This endpoint should add comments to clients');
    var comment = new CommentModel({
        comment:    req.body.comment,
        name:       req.body.name,
        base:       req.body.base
    });
    
    comment.save(function (err) {
        if (!err) {
            log.info("comment added");
            return res.send({ status: 'OK', comment:comment });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
});

comments.put('/api/comments/:id', function (req, res){
    res.send('This is not implemented now');    
  });
  
comments.delete('/api/comments/:id', function (req, res){
    res.send('This is not implemented now');
  });

  module.exports = comments;