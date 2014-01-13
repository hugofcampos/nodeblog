module.exports = function(app) {

  var Post = app.core.models.post;

  var AdminController = {
    index: function(req, res){
      Post.find().sort('-date').exec(function(err, posts) {
        switch (req.params.format) {
          
          case 'json':
            res.send(posts.map(function(p) {
              return p;
            }));
          break;

          default:
            res.render('admin/posts/index', {'posts':posts});
        }
      });

    },
    create: function(req, res){      
      req.body.tags = AdminController.tagTextToObj(req.body.tags);

      var post = new Post(req.body);
      post.date = new Date();

      post.save(function(err) {
        if(err) throw(err);
        switch (req.params.format) {
          case 'json':
            res.send(post.__doc);
           break;

           default:
            res.redirect('/admin/posts.html');
        }
      });
    },
    read: function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}
        switch (req.params.format) {
          
          case 'json':
            res.send(post);
          break;

          default:
            res.render('admin/posts/read', {'post':post});
        }
      });
    },
    updateForm: function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}
        tags = AdminController.tagObjToText(post.tags);
        res.render('admin/posts/update', {'post':post, 'tags':tags});
      });
    },
    update: function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err) {throw err;}

        post.title = req.body.title;
        post.content = req.body.content;
        post.tags = AdminController.tagTextToObj(req.body.tags);
        post.date = new Date();
        post.save();

        switch (req.params.format) {
          
          case 'json':
            res.send(post);
          break;

          default:
            res.redirect('/admin/posts.html');
        }
      });
    },
    remove: function(req, res){
      Post.findById(req.params.id).remove().exec(function(err, post){
        if(err) {throw err;}
        switch (req.params.format) {
          
          case 'json':
            res.send({res:1});
          break;

          default:
            res.redirect('/admin/posts.html');
        }
      });
    },
    tagTextToObj: function(tags){      
      objTags = Array();
      tmpTags = tags.split(',');
      for(var i in tmpTags){
        objTags.push({name:tmpTags[i]});
      }
      return objTags;
    },
    tagObjToText: function(tags){
      txtTags = Array();
      for(var i=0; i<tags.length; i++){
        txtTags.push(tags[i].name);
      }
      return txtTags.join(', ');
    }
  };

  return AdminController;
}