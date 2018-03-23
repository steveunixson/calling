var log = require('../libs/log')(module);
var config = require('../config');
var env = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');

var connection = mongoose.createConnection(config.db);
log.debug('connetction created at :' + config.db);
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

var Status = new Schema({
    
        no_answer:  {
          type:Boolean,
          required: true
        },
        no_connect: {
          type:Boolean,
          required: true
        },
        deny:       {
          type:Boolean,
          required: true
        },
        callback:   {
          type:String
        },
        appointment: {
          type:Boolean,
          required: true
        },

        client: {
          type: String,
          required: true
        },
        number: {type: Number,
          required: true,
          index: {unique: true}},

        appointment_time: String,
        age:              Number,
        came:             Boolean,
        month:            String,
        close:            String,
        operator:         String,
        comment:          String
});
  
var StatusModel = mongoose.model('Status', Status);

module.exports = StatusModel;