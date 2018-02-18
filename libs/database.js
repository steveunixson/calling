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
    log.info("Connected to DB!");
});
//-------------------ERROR HANDLER---------------//

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var Clients = new Schema({
    name: { type: String, },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
});

var ClientModel = mongoose.model('Clients', Clients);
module.exports = ClientModel;
