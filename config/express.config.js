var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var csrf = require('csurf');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var log = require('../libs/log')(module);
var config = require('./');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

    // Compression middleware (should be placed before express.static)
    app.use(compression({
      threshold: 512
    }));
  
    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
  
    // cookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: 'secret' })); //add session secret to config
    app.use(session({
      secret: 'djsakflsjdhflashjdblahdbcldblabsdfbsalfdhb',
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));
  
    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
  
    // connect flash for flash messages - should be declared after sessions
    app.use(flash());
    log.debug('express config done!')
    if (process.env.NODE_ENV == 'test') {
      app.use(csrf());
  
      // This could be moved to view-helpers :-)
      app.use(function (req, res, next){
        res.locals.csrf_token = req.csrfToken();
        next();
      });
    }
  };
  
