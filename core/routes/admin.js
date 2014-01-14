module.exports = function(app){
  var admin = app.core.controllers.admin,
      passport = require('passport'),
      User = app.core.models.user;

  // Home
  app.get('/admin', ensureAuthenticated, admin.index);

  // List
  app.get('/admin/posts.:format', ensureAuthenticated, admin.index);

  // Create 
  app.post('/admin/posts.:format?', ensureAuthenticated, admin.create);

  // Read
  app.get('/admin/posts/:id.:format?', ensureAuthenticated, admin.read);

  // Update
  app.put('/admin/posts/:id.:format?', ensureAuthenticated, admin.update);
  app.post('/admin/posts/:id/update.html', ensureAuthenticated, admin.update);
  app.get('/admin/posts/:id/update.html', ensureAuthenticated, admin.updateForm);

  // Delete
  app.del('/admin/posts/:id.:format?', ensureAuthenticated, admin.remove);
  app.get('/admin/posts/:id/delete.html', ensureAuthenticated, admin.remove);

  // List Users
  app.get('/admin/users.:format', ensureAuthenticated, admin.indexUser);

  // Create User
  app.post('/admin/users.:format?', ensureAuthenticated, admin.createUser);

  // Read User
  app.get('/admin/users/:id.:format?', ensureAuthenticated, admin.readUser);

  // Delete User
  app.del('/admin/users/:id.:format?', ensureAuthenticated, admin.removeUser);
  app.get('/admin/users/:id/delete.html', ensureAuthenticated, admin.removeUser);

  // Change User Pass
  app.put('/admin/users/:id.:format?', ensureAuthenticated, admin.updateUser);
  app.post('/admin/users/:id/update.html', ensureAuthenticated, admin.updateUser);
  app.get('/admin/users/:id/update.html', ensureAuthenticated, admin.updateFormUser);

  app.get('/admin/login', admin.login);
  
  app.post('/admin/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        return res.redirect('/admin/login')
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/admin');
      });
    })(req, res, next);
  });

  app.get('/admin/logout', function(req, res){
    req.logout();
    res.redirect('/admin/login');
  });
  
  function ensureAuthenticated(req, res, next) {
    User.count(function(err, c)
    {
      res.locals.user = null;
      if(c<=0) { return next(); }
      if (req.isAuthenticated()) { 
        res.locals.user = req.user;
        return next(); 
      }
      res.redirect('/admin/login')
    });
  }


}