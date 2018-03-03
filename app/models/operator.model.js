var log = require('../../libs/log')(module);
var config = require('config.json')('app/config/config.json');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.mongoose.uri, {});
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
 
var Operators = new Schema({
    name: { type: String, },
    age: { type: Number, min: 18, index: true },
    num: { type: Number, match: /[0-9]/ },
    date: { type: Date, default: Date.now },
    bio: { type: String, },
    buff: Buffer
});

var OperatorModel = mongoose.model('Operators', Operators);

module.exports = OperatorModel;