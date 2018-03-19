var mongoose = require('mongoose');

// Define our beer schema
var MatchSchema   = new mongoose.Schema({
  name: String,
  type: String,
  comment: String
});

// Export the Mongoose model
module.exports = mongoose.model('Match', MatchSchema);