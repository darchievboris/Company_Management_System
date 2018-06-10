const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.get('/', (req, res) => {
  res.send({})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);