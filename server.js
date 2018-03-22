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
const Role = require('./models/roles.model');
const uploadController = require('./controllers/upload');
const operatorController = require('./controllers/operator');
const roleController = require('./controllers/role');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
const RedisStore = require('connect-redis')(session)



app.use(session({
  store: new RedisStore({
      url: 'redis://localhost' //config.redisStore.url
  }),
  secret: 'my-strong-secret',  //config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

function requireRole (role) {
  return function (req, res, next) {
      if (req.session.user && req.session.user.role === role) {
          next();
      } else {
          res.send(403);
      }
  }
}

app.use(fileUpload());
app.post('/admin/upload',authController.isAuthenticated , uploadController.postUpload); //upload xlsx and parse it down to mongodb
app.post('/admin/role',authController.isAuthenticated , roleController.addRole);
app.post('/admin/users',userController.postUsers);
app.get('/admin/users', userController.getUsers);

app.get('/manager/upload',authController.isAuthenticated ,uploadController.getUpload); //get collection name
app.post('/workspace/call', authController.isAuthenticated ,operatorController.getPhone); //get number by _id and collection name


app.use(error);
log.info('The magic happens on port ' + port);
app.listen(port);