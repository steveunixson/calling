var express         = require('express');
var operator        = express.Router();
var log             = require('../../libs/log')(module);
var OperatorModel    = require('../models/operator.model');
var methodOverride  = require('method-override')
operator.use(methodOverride('_method'))

operator.get('/api/operator/', function (req, res){
    return OperatorModel.find(function (err, employee) {
        if (!err) {
            return res.send(employee);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
      });
});

operator.get('/api/operator/:id', function (req, res){
    res.send('This endpoint should get operator by id');
});

operator.post('/api/operator/', function (req, res){
    //res.send('This endpoint should add operator to clients');
    var employee = new OperatorModel({
        employee:    req.body.employee,
        name:       req.body.name,
        base:       req.body.base
    });
    
    employee.save(function (err) {
        if (!err) {
            log.info("employee added");
            return res.send({ status: 'OK', employee:employee });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
});

operator.put('/api/operator/:id', function (req, res){
    res.send('This is not implemented now');    
  });
  
operator.delete('/api/operator/:id', function (req, res){
    res.send('This is not implemented now');
  });

  module.exports = operator;