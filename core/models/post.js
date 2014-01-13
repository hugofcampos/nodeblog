module.exports = function(app){
  var Schema = require('mongoose').Schema;

  var post = new Schema({
    title  	:  String,
    content :  String,
    date  	:  Date,
    tags    :  [{ name: String }]
  });

  post.statics.getTags = function (cb) {

    return this.aggregate([
      { $project: { tags: 1} },
      { $unwind: '$tags' },
      { $group: {
          _id: '$tags.name',
          count: { $sum: 1 }
        }
      }
    ]).sort('-count').exec(cb);
  }

  return global.db.model('posts', post);
};