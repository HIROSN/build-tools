'use strict';

var chai = require('chai');
var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../../index');
chai.use(require('chai-http'));

describe('API tests', function() {
  it('should return status 500 for empty request', function(done) {
    chai.request(server)
    .post('/api')
    .end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('requires an API key to run tests', function() {
    expect(process.env).to.have.property('GOOGLESERVERAPIKEY');
  });

  it('should be able to find a place by name', function(done) {
    chai.request(server).
    post('/api')
    .send({
      latitude: 47.6234456,
      longitude: -122.33601,
      radius: 500,
      name: 'Code Fellows'
    })
    .end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('places');
      expect(Array.isArray(res.body.places)).equals(true);
      expect(res.body.places.length).to.equal(1);
      done();
    });
  });
});
