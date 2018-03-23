const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 8080;
const log = require('./libs/log')(module);
const error = require('./libs/error');
const env = process.env.NODE_ENV || 'development';
const config = require('./config');
const fs = require('fs')
const path = require('path')
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const Role = require('./models/roles.model');
const User = require('./models/user.model');
const uploadController = require('./controllers/upload');
const operatorController = require('./controllers/operator');
const roleController = require('./controllers/role');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const app = express();

app.use(compression({
  threshold: 512
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
const RedisStore = require('connect-redis')(session)
var sess = {
    store: new RedisStore({
        url: 'redis://localhost' //config.redisStore.url
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  
  app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    
    morgan('tiny')
    
    morgan(':remote-addr :method :url')
    
    morgan(function (tokens, req, res) {
      return req.method + ' ' + req.url
    })
} else {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    app.use(morgan('combined', {stream: accessLogStream}))
    morgan('combined')
    
    morgan(':remote-addr :method :url')
    
    morgan(function (tokens, req, res) {
      return req.method + ' ' + req.url
    })
}

function requireRole (role) {
  return function (req, res, next) {

      if(!req.headers['x-api-token'])
        return res.sendStatus(403)

    Role.findOne({ 'token': req.headers['x-api-token'] },'token role', function (err, person) {
      if (err) { console.log(err); } else {
        if (app.get('env') === 'development') {
        log.debug(person.token);
        log.debug(person.role);
      }
        if (req.headers['x-api-token'] === person.token && role === person.role) { 
          next();
      }  else {
          res.sendStatus(403);
        }
      }
    })
  }
}

app.use(fileUpload());
app.post('/admin/upload',authController.isAuthenticated , requireRole('admin') , uploadController.postUpload); //upload xlsx and parse it down to mongodb
app.post('/admin/role',authController.isAuthenticated,  requireRole('admin') , roleController.addRole);
app.post('/admin/users',userController.postUsers);
app.get('/admin/users', userController.getUsers);

app.get('/manager/upload',authController.isAuthenticated, requireRole('manager') ,uploadController.getUpload); //get collections name
app.post('/workspace/call', authController.isAuthenticated, requireRole('admin') ,operatorController.getPhone); //get number by _id and collection name

app.use(error);
log.info('The magic happens on port ' + port);
app.listen(port);