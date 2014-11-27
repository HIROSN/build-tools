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
