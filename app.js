var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//db
var dbConnection = require('./bin/db');
dbConnection.on("error", console.error.bind(console, "connection error: "));
dbConnection.once("open", function () {
  console.log("Connected successfully");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var parkingRouter = require('./routes/parkingroutes');
var bookingRouter = require('./routes/bookingRoute');
var commonRouter = require('./routes/dashboardRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parking', parkingRouter);
app.use('/booking', bookingRouter);
app.use('/common', commonRouter);

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
