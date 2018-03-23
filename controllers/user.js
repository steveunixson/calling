// Load required packages
var User = require('../models/user.model');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role 
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New user added!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};