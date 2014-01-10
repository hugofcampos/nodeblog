module.exports = function(app){
  var admin = app.core.controllers.admin;

  // Home
  app.get('/admin', admin.index);

  // List
  app.get('/admin/posts.:format', admin.index);

  // Create 
  app.post('/admin/posts.:format?', admin.create);

  // Read
  app.get('/admin/posts/:id.:format?', admin.read);

  // Update
  app.put('/admin/posts/:id.:format?', admin.update);
  app.post('/admin/posts/:id/update.html', admin.update);
  app.get('/admin/posts/:id/update.html', admin.updateForm);

  // Delete
  app.del('/admin/posts/:id.:format?', admin.remove);
  app.get('/admin/posts/:id/delete.html', admin.remove);
}