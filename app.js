require("dotenv").config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const config = require("./config")

const apiRoutes = require('./routes');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  config.response(res, 404, "path not found!")
});

// error handler
app.use(function(err, req, res, next) {
  config.response(res, err.status || 500, err.message)
});

module.exports = app;
