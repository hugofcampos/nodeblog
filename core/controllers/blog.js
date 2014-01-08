module.exports = function(app) {

  var Post = app.core.models.post;

	var BlogController = {
		index: function(req, res){

      Post.find(function(err, posts){
        res.render('blog/index', {'posts':posts});
      });

		},
    single: function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}
        res.render('blog/single', {'post':post});
      });
    }
	};

	return BlogController;
}