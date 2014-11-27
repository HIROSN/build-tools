(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(params, done) {
  if (!navigator.geolocation) { return done({}); }
  if (!params || !params.radius) { return done({}); }

  navigator.geolocation.getCurrentPosition(function(position) {
    var json = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      radius: params.radius
    };

    if (params.name) { json.name = params.name; }
    if (params.types) { json.types = params.types; }
    done(json);
  });
};

},{}],2:[function(require,module,exports){
'use strict';

var expect = chai.expect;
var createJsonData = require('../../../app/js/create_json_data');

describe('Browser unit tests', function() {
  it('it should create an object', function(done) {
    createJsonData({}, function(data) {
      expect(data).to.be.a('object');
      done();
    });
  });
});

},{"../../../app/js/create_json_data":1}]},{},[2,1]);
