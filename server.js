// server.js

// set up ======================================================================
// get all the tools we need
var express             = require('express');
var app                 = express();
var port                = process.env.PORT || 8080;
var mongoose            = require('mongoose');
var passport            = require('passport');
var flash               = require('connect-flash');

var morgan              = require('morgan');
var log                 = require('./libs/log')(module);
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var session             = require('express-session');
var logger              = require('express-logger');

var error               = require('./libs/error')
var comments            = require('./app/routes/comments');
var router              = require('./app/routes/router');
var operator            = require('./app/routes/operators');
var login               = require('./app/login');
var config              = require('config.json')('app/config/config.json');

// configuration ===============================================================
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.mongoose.uri, {
    
  }); // connect to our database

require('./app/config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(logger({path: "logfile.txt"}));

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/login')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(error);
app.use(comments);
app.use(router);
app.use(operator);
app.use(login);
// launch ======================================================================
app.listen(port);
log.info('The magic happens on port ' + port);
