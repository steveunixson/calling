var XLSX = require('xlsx');
var log = require('./log')(module);
var jsonfile = require('jsonfile');
var fs = require("fs");
var JSONStream = require('JSONStream');
var file = '/tmp/data.json'
var path = require('path');
module.exports = function(){
    var workbook = XLSX.readFile('/tmp/base.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json (workbook.Sheets[sheet_name_list[0]]);
    //console.log(xlData);
      //read our XLSX parsed json
jsonfile.writeFile(file, xlData, {spaces: 2, EOL: '\r\n'}, function (err) {
  if (err)
  log.error(err);
  else {
    log.debug('saved!')
  }
})
}