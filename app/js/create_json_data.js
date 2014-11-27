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
