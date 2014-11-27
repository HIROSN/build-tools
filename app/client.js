'use strict';

var $ = require('jquery');
var Handlebars = require('handlebars');

$(function() {
  var createJsonData = require('./js/create_json_data');
  var radius = 500; // 500m for now

  createJsonData({radius: radius}, function(data) {
    var dfd = $.Deferred();

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      url: '/api',
      dataType: 'json',
      success: dfd.resolve,
      error: dfd.reject
    });

    dfd.promise().then(function(results) {
      var template = Handlebars.compile($('#places-template').html());

      $(template(results)).
        hide().
        appendTo($('#places')).
        slideDown('fast');
    });
  });
});