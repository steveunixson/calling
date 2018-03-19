const Script = require('../models/script.model');
const log = require('../libs/log')(module);

exports.getScript = function (req, res) {
    Script.find(function(err, script) {
        if (err)
          res.send(err);
    
        res.json(script);
      });
}

exports.dropScript = function (req, res) {
    Script.remove({_id: req.params.script_id}, function(err) {
        if (err)
          return res.send(err);
    
        res.json({ message: 'Script removed from the DB!' });
      });
}

exports.postScript = function (req, res) {
  res.json({message: 'index page'})
}