module.exports = function(app) {

  var Post = app.core.models.post;

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
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}
        Post.getTags(function(err, tags){
          res.render('blog/single', {'post':post, 'tags':tags});          
        });        
      });
    }
	};

	return BlogController;
}