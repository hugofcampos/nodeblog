module.exports = function(app){
  var Schema = require('mongoose').Schema;

  var comment = new Schema({
    author    :  String,
    comment   :  String,
    post     : {type : Schema.Types.ObjectId, ref : 'posts'}
  });

  return global.db.model('comments', comment);
};
