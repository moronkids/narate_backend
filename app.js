var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');

var app = express();
app.use(cors());
app.options("*", cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.options('*', cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);





module.exports = app;
