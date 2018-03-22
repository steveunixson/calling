const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('../config');
const SALT_WORK_FACTOR = 10;
const log = require('../libs/log')(module);
mongoose.connect(config.db);
const bcrypt = require('bcrypt-nodejs');
const connection = mongoose.createConnection(config.db);

//-------------------ERROR HANDLER---------------//
var db = mongoose.connection;


db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});
//-------------------ERROR HANDLER---------------//

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
