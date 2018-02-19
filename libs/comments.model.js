var log = require('./log')(module);
var config = require('config.json')('./config/config.json');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.mongoose.uri, {
  //useMongoClient: true,
});
//-------------------ERROR HANDLER---------------//
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Comments model active");
});
//-------------------ERROR HANDLER---------------//

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var Comments = new Schema({
    comment: String,
    name: String,
    base: String
});

var CommentModel = mongoose.model('Comments', Comments);
module.exports = CommentModel;