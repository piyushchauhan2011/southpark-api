var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var cors = require('cors');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');

var config = require('./config');
var User = require('./models/user');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  };

  return jwt.encode(payload, config.tokenSecret);
}

/*
 |--------------------------------------------------------------------------
 | Sign in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {
  new User({ email: req.body.email })
    .fetch()
    .then(function(user) {
      if (!user) {
        return res.status(401).send({ message: { email: 'Incorrect email' } });
      }

      bcrypt.compare(req.body.password, user.get('password'), function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: { password: 'Incorrect password' } });
        }

        user.unset('password');

        var token = createToken(user.attributes);
        res.send({ token: token, user: user.attributes });
      });
    });
});

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
app.post('/auth/signup', function(req, res) {
  new User({ email: req.body.email })
    .fetch()
    .then(function(existingUser) {

      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken.' });
      } else {
        var user = new User({
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.get('password'), salt, function(err, hash) {
            user.set('password', hash);

            user.save()
              .then(function() {
                user.unset('password');
                var token = createToken(user.toJSON());
                res.send({ token: token, user: user.toJSON() });
              });
          });
        });
      }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
