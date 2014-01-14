var config = require('./core/config'),
    express = require('express'),
    path 	= require('path'),
    load 	= require('express-load'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
	
var app	= express();

global.db = mongoose.connect(config.db.mongodb);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'core/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({ secret: 'the quick brown fox jumps over the lazy dog' }));
// // Passport!
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'content')));

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ email: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));  

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });


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
