module.exports = function(app) {

  var Post = app.core.models.post;
  var Comment = app.core.models.comment;

	var BlogController = {
		index: function(req, res){

      var params = {};
      if (req.params.search){
        params.title = new RegExp(req.params.search, 'i');
      }

      var query = Post.find(params);

      query.exec(function(err, posts){

        Post.getTags(function(err, tags){
          res.render('blog/index', {'posts':posts, 'tags':tags});
        });

      });

    },
    byTag: function(req, res){

      var params = {};
      if (req.params.tag){
        params['tags.name'] = req.params.tag;
      }

      var query = Post.find(params);

      query.exec(function(err, posts){

        Post.getTags(function(err, tags){
          res.render('blog/index', {'posts':posts, 'tags':tags});
        });

      });

		},    
    single: function(req, res){
      Post.findById(req.params.id).populate('comments').exec(function(err, post){
        if(err) {throw err;}
        Comment.find({post:post._id}).exec(function(err, comments){
          Post.getTags(function(err, tags){
            res.render('blog/single', {'post':post, 'comments':comments, 'tags':tags});
          });
        });
      });
    },
    addComment: function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}
        
        var comment = new Comment(req.body);
        comment.post = post._id;

        comment.save(function(err) {
          if(err) throw(err);
          res.redirect('/post/'+req.params.id);
        });

      });      
    },
	};

	return BlogController;
}