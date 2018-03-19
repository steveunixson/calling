
const passport = require('passport');
const User = require('../models/user.auth.model');

  exports.index = function (req, res) {
    res.json({message: 'index page'}) //show all DB
  }
 ////////////////////////////////////////////////////////////////// 
  exports.show = function (req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
  
      res.json(users);
    });
  }
   ////////////////////////////////////////////////////////////////// 

  exports.destroy = function (req, res) {
    res.send('This is not implemented now'); //delete user by id
    
  }
   ////////////////////////////////////////////////////////////////// 

  exports.register = function(req, res){
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err) {
      if (err)
        res.send(err);
  
      res.json({ message: 'New user added!' });
    });
  }
 ////////////////////////////////////////////////////////////////// 

  exports.logout = function(req, res){
    req.logout();
    res.send({status : 'logout'});
  }
 ////////////////////////////////////////////////////////////////// 
 

  exports.login = function(req, res){
    res.json({message: 'index page'})
  }