var log = require('../libs/log')(module);
var config = require('../../app/config');
var env = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.db);
//mongoose.connect(config.mongoose.uri, {});

//-------------------ERROR HANDLER---------------//
var db = mongoose.connection;


db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});
//-------------------ERROR HANDLER---------------//

var Schema = mongoose.Schema;

autoIncrement.initialize(connection);


var Operators = new Schema({
    name: String,
    no_answer: Number,
    no_connect: Number,
    call_back: Number,
    deny: Number,
    appointment: Number
}
);
  
Operators.plugin(autoIncrement.plugin, 'Operators');

var OperatorModel = mongoose.model('Operators', Operators);

module.exports = OperatorModel;