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
    num: { type: Number, match: /[0-9]/ },
    date: { type: Date, default: Date.now },
    bio: { type: String, },
    comment: { type: String,},
    base: { type: Boolean,},
    buff: Buffer
});

var ClientModel = mongoose.model('Clients', Clients);
module.exports = ClientModel;