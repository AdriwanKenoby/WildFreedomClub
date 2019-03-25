'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const logger = require('morgan');
const helmet = require('helmet');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const flash = require('connect-flash');
const passport = require('./config/passport');
const db =require('./DB/db');
// Routers
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('MyAwesomeSecret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session',
  keys: [ 'user' ],
  cookie: {
    secure: true,
    expires: new Date( Date.now() + 60 * 60 * 1000 ), // 1 hour
    httpOnly: true
  }
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
// redirect JS popper
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
// redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/users', ensureLoggedIn('/login'), usersRouter);
app.use('/chat', ensureLoggedIn('/login'), chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
