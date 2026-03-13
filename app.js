var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Registro  de las rutas a los enrutadores
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorRouter = require('./routes/author');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Uso de las rutas y modificacion de la ruta para el index,
//Agregando  la ruta /index para que tambien renderice la vista index.hbs
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter); // Usamos el enrutador de author para la ruta /author


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
