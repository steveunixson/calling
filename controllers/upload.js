const Match = require('../models/database.match.model');
const fs = require('fs');
const path = require('path');
const log = require('../libs/log')(module);
const jsonfile = require('jsonfile');
const JSONStream = require('JSONStream');
var excel = require('../libs/excel');

exports.postUpload = function(req, res){
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let xlsxFile = req.files.xlsxFile;
  xlsxFile.mv('/tmp/base.xlsx', function(err) {
    if (err)
      return res.status(500).send(err);
      res.json({message: 'uploaded'})
      excel();
  });
}

  exports.getUpload = function(req, res){
    Match.find(function(err, users) {
        if (err)
          res.send(err);
    
        res.json(users);
      });
  }