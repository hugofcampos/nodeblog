var request = require('supertest'),
    express = require('express'),
    should = require('should');

process.env.NODE_ENV = "test";

var app = require('../app.js'),
    AdminController = app.core.controllers.admin;

describe('Tags', function(){
  var text,
      obj;

  before(function(done) {
    text = 'test1,test2,test3';
    obj = [{name:'test1'},{name:'test2'},{name:'test3'}];
    done(null);
  });

  describe('Tags transforms', function(){
    it('should transform a comma separated string in tags object', function(){
      var object = AdminController
        .tagTextToObj(text)
        .should.eql(obj);
    });

    it('should transform a tags object in comma separated string', function(){
      AdminController
        .tagObjToText(obj)
        .should.equal(text);
    });
  });
});