const Match = require('../models/database.match.model');
const xlsxj = require("xlsx-to-json");
const excel = require('../libs/excel');
const log = require('../libs/log')(module);
var JSONStream = require('JSONStream');
var fs = require('fs');
var path = require('path');
 
// init stream 
 
var SaveToMongo = require('save-to-mongo');


const env = process.env.NODE_ENV || 'development';
const config = require('../config');
const jsonfile = "/tmp/data.json"
const xlsxfile = "/tmp/base.xlsx"


exports.postUpload = function(req, res){
  
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  if (!req.body.name)
    return res.status(400).send('No name was specified.');
 
  let sampleFile = req.files.xlsx;
 
  sampleFile.mv(xlsxfile, function(err) {
    if (err)
      return res.status(500).send(err);
      excel();
    return res.send('File uploaded!');
  });

  var saveToMongo = SaveToMongo({
    uri: config.db,
    collection: req.body.name,
    bulk: {
      mode: 'unordered'
    }
  });
   
  // go go power rangers!!!
   
  fs.createReadStream(path.join(jsonfile))
    .pipe(JSONStream.parse('*'))
    .pipe(saveToMongo)
    .on('execute-error', function(err) {
      console.log(err);
    })
    .on('done', function() {
      console.log('All done!');
    });
}

  exports.getUpload = function(req, res){
    Match.find(function(err, users) {
        if (err)
          res.send(err);
    
        res.json(users);
      });
  }