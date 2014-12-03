'use strict';

var $ = require('jquery');
var Handlebars = require('handlebars');
var createJsonData = require('./create_json_data');

module.exports = function(radius) {
  var params = {
    radius: radius,
    types: 'bakery|bar|cafe|food|meal_takeaway|restaurant'
  };

  $('#places > div').slideUp('fast', function() {
    $(this).remove();
  });

  createJsonData(params, function(data) {
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
      $(template(results))
      .hide()
      .appendTo($('#places'))
      .slideDown('fast');
    });
  });
};
