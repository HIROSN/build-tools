'use strict';

var $ = require('jquery');
var fillPlaces = require('./js/fill_places');

$(function() {
  var $select = $('select');
  fillPlaces(+$select.val());

  $select.on('change', function() {
    $select.blur();
    fillPlaces(+$select.val());
  });
});
