var express = require('express'),
	path 	= require('path'),
	load 	= require('express-load'),
  mongoose = require('mongoose');
	
var app	= express();

global.db = mongoose.connect('mongodb://localhost/blog');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'core/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'content')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

load('core/models')
  .then('core/controllers')
  .then('core/routes')
  .into(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});