module.exports = function(app){
	var blog = app.core.controllers.blog;

	app.get('/', blog.index);
  app.get('/post/:id', blog.single);
}