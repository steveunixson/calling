const xlsxj = require("xlsx-to-json");
const log = require('./log')(module);
const jsonfile = "/tmp/data.json"
const xlsxfile = "/tmp/base.xlsx"

module.exports = function(){
  xlsxj({
    input: xlsxfile, 
    output: jsonfile
  }, function(err, result) {
    if(err) {
      log.error(err);
    }else {
      log.debug('sucsess!');
    }
  });
}