var express = require('express');
var logger = require('morgan');
var swig = require('swig');
var bodyparser = require('body-parser');
var sass = require('node-sass-middleware');
var path = require('path');

var app = express();
require('./config/swig.js').config(app);

// app.use(sass({
//   root: __dirname,
//   src: '/scss',
//   dest: '/public/css',
//   debug: true
// }))
app.use(logger('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var root = require('./routes/root');
app.use('/', root);

app.listen(3001);





// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render(
        // ... fill in this part
    );
});
