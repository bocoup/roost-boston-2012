define([
  'backbone',
  'controllers/sensor-index'
], function( B, SensorIndex ) {
  var controller;

  var Router = B.Router.extend({
    routes: {
      '': 'index',
      'sensors/:sensorId': 'sensor'
    },

    index: function() {
      controller = new SensorIndex();
    },

    sensor: function( sensorId ) {
      if ( !controller ) {
        controller = new SensorIndex();
      }

      controller.showDetail( sensorId );
    }
  });

  return Router;
});