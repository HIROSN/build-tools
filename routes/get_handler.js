'use strict';

var request = require('superagent');
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;

var getHandler = function(req, res) {
  if (!req.body)  { return res.status(500).json({}); }
  if (!req.body.latitude) { return res.status(500).json({}); }
  if (!req.body.longitude) { return res.status(500).json({}); }
  if (!req.body.radius) { return res.status(500).json({}); }

  var query = '&location=' + req.body.latitude + ',' + req.body.longitude +
    '&radius=' + req.body.radius;

  if (req.body.name) {
    query += '&name=' + req.body.name;
  }

  if (req.body.types) {
    query += '&types=' + req.body.types;
  }

  request.
    get(url + 'key=' + apiKey + query).
    end(function(err, data) {
      if (err || !data) { return res.status(500).json({}); }
      res.json(JSON.parse(data.text));
    });
};

module.exports = getHandler;
