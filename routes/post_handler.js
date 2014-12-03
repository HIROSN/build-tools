'use strict';

var request = require('superagent');
var distance = require('google-distance');
var async = require('async');

var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;

var postHandler = function(req, res) {
  if (!req.body)  { return res.status(500).json({}); }
  if (!req.body.latitude) { return res.status(500).json({}); }
  if (!req.body.longitude) { return res.status(500).json({}); }
  if (!req.body.radius) { return res.status(500).json({}); }

  var radius = process.env.RADIUS || req.body.radius;
  var origin = req.body.latitude + ',' + req.body.longitude;
  var query = '&location=' + origin + '&radius=' + radius;

  if (req.body.name) {
    query += '&name=' + req.body.name;
  }

  if (req.body.types) {
    query += '&types=' + req.body.types;
  }

  request.get(url + 'key=' + apiKey + query).end(function(err, data) {
    if (err || !data) { return res.status(500).json({}); }
    var json = JSON.parse(data.text);
    if (!json || !json.results) { return res.status(500).json({}); }

    async.map(json.results, function(place, done) {
      var destination = place.geometry && place.geometry.location && (
        place.geometry.location.lat + ',' + place.geometry.location.lng);

      var icon = place.icon && place.icon.replace(
        new RegExp('http:', 'gi'), 'https:');

      var openNow = !place.opening_hours ? '??' :
        place.opening_hours.open_now ? 'Yes' : 'No';

      var url = destination && (
        'https://maps.google.com/maps?q=' + destination);

      var result = {
        icon: icon,
        name: place.name,
        openNow: openNow,
        url: url,
        distance: '',
        distanceValue: radius
      };

      if (json.results.length <= 1) { return done(null, result); }

      distance.get({
        origin: origin,
        destination: destination
      },
      function(err, data) {
        if (err) { done(err, result); }
        result.distance = data.distance;
        result.distanceValue = data.distanceValue;
        done(null, result);
      });
    },
    function(err, results) {
      if (err) { return res.status(500).json({}); }

      results.sort(function(a, b) {
        return a.distanceValue - b.distanceValue;
      });

      res.json({places: results});
    });
  });
};

module.exports = postHandler;
