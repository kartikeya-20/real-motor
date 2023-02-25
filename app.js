var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var venderRouter = require('./routes/vender');
// const { isatty } = require('tty');

const events = require('events');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/vender',venderRouter)
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


const myEmitter = new events.EventEmitter();

// new service ressquest event
 myEmitter.on('NewServiceRequested',(data) =>{   
 console.log('NewServiceRequested: ' + data);
 });

 // Raising NewServiceRequested event
myEmitter.emit('NewServiceRequested', 'This is my first Node.js event emitter example.');

app.listen(process.env.PORT, () => {
  console.log("listening");
});

module.exports = app;





