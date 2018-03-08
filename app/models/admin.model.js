var log = require('../../libs/log')(module);
var config = require('config.json')('app/config/config.json');
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
    log.info("Superadmins model active");
});
//-------------------ERROR HANDLER---------------//

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var Superadmins = new Schema({
    _id:        String, 
    admin:      String,
    password:   String,
    secret:     String
});

var SuperadminModel = mongoose.model('Superadmins', Superadmins);
module.exports = SuperadminModel;