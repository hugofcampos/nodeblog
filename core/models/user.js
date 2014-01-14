module.exports = function(app){
  var Schema = require('mongoose').Schema,
      bcrypt = require('bcrypt');
      SALT_WORK_FACTOR = 10;

  var userSchema = Schema({
    name    :  String,
    email   :  String,
    password :  String
  });

  userSchema.pre('save', function(next) {
    var user = this;
    
    if(!user.isNew && !user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function(candidatePassword, cb) {
      console.log(candidatePassword);
      console.log(this.password);
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  };

  return global.db.model('users', userSchema);
};