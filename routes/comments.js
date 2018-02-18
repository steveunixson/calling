var express         = require('express');
var comments        = express.Router();
var log             = require('../libs/log')(module);
var CommentModel     = require('../libs/database');
var methodOverride  = require('method-override')
comments.use(methodOverride('_method'))

comments.get('/api/comments/', function (req, res){
    res.send('This endpoint should get all comments');
});

comments.get('/api/comments/:id', function (req, res){
    res.send('This endpoint should get comments by id');
});

comments.post('/api/comments/', function (req, res){
    res.send('This endpoint should add comments to clients');
});

comments.put('/api/comments/:id', function (req, res){
    res.send('This is not implemented now');    
  });
  
comments.delete('/api/comments/:id', function (req, res){
    res.send('This is not implemented now');
  });

  module.exports = comments;