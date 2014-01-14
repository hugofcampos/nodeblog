var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = "test";

var app = require('../app.js'),
    User = app.core.models.user;

describe('Blog', function(){
  it('respond with plain text', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
});

describe('Admin', function(){
  before(function(done) {
    User.remove({}, function() {
        done(null);
    });
  });

  describe('Authentication', function(){
    it('admin is accessible if there is no user', function(done){
      request(app)
        .get('/admin')
        .expect(200, done);
    });

    it('admin is not accessible if there is users', function(done){
      var u = new User({name:"Foo Bar", email:"foo@bar.com", password:"foobar"});
      u.save(function(err, user){
        request(app)
        .get('/admin')
        .expect(302, done);
      });
    });
  });
});