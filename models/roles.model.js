const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('../config');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const log = require('../libs/log')(module);
mongoose.connect(config.db);

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

// Define our beer schema
var RoleSchema = new mongoose.Schema({
  user: { type: String, required: true, index: { unique: true } },
  role: { type: String, required: true },
}, { versionKey: false });


// Export the Mongoose model
module.exports = mongoose.model('Role', RoleSchema);