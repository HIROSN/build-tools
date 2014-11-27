'use strict';

var express = require('express');
var app = express();

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/public'));
app.post('/api', require('./routes/post_handler'));

app.listen(process.env.PORT || 3000);
