module.exports = function(app){
  var Schema = require('mongoose').Schema;

  var post = Schema({
    title  	:  String,
    content :  String,
    date  	:  Date
  });

  return global.db.model('posts', post);
};