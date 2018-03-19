const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 8080;
const log = require('./libs/log')(module);
const error = require('./libs/error');
const env = process.env.NODE_ENV || 'development';
const config = require('./config');
const fileUpload = require('express-fileupload');
const uploadController = require('./controllers/upload');

const app = express();
app.use(fileUpload());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'kjkszpg',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());

app.post('/admin/upload',uploadController.postUpload);

app.use(error);
log.info('The magic happens on port ' + port);
app.listen(port);