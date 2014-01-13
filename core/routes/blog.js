module.exports = function(app){
	var blog = app.core.controllers.blog;

  app.get('/:search?', blog.index);
	app.get('/tag/:tag', blog.byTag);
  app.get('/post/:id', blog.single);
}