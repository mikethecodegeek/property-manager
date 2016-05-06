/**
 * Created by Admin on 4/30/16.
 */
const PORT = process.env.PORT || 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
//var MONGODB_URI = 'mongodb://<example>:<example>@ds013222.mlab.com:13222/properties'
const MONGOURL = process.env.MONGOLAB_CHARCOAL_URI || 'mongodb://localhost/mongo-express';
mongoose.connect(MONGOURL, err => {
    console.log(err || 'Connected to MongoDB')
});
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

var server = http.createServer(app);

server.listen(PORT, err => {
    console.log(err || `Server listening on port ${PORT}`);
});
