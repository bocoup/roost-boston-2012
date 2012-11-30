define([
  'backbone',
  'data/sensors',
  'views/sensors-list',
  'views/sensor-detail'
], function( B, SensorCollection, SensorsList, SensorDetail ) {
  var controller, sensorList, sensorDetail;
  var sensors = new SensorCollection();

  var Controller = function() {
    sensorList = new SensorsList({
      collection: sensors
    });

    sensorList.render();
    sensorList.placeAt('#sensors-list');
  };

  Controller.prototype.showDetail = function( sensorId ) {
    sensorDetail = new SensorDetail({
      model: sensors.get( sensorId )
    }).render();

    sensorDetail.placeAt('#sensor-detail');
  };

  var Router = B.Router.extend({
    routes: {
      '': 'index',
      'sensors/:sensorId': 'sensor'
    },

    index: function() {
      controller = new Controller();
    },

    sensor: function( sensorId ) {
      if ( !controller ) {
        controller = new Controller();
      }

      if ( sensorDetail ) {
        sensorDetail.destroy();
      }

      sensors.fetch({
        success: function() {
          controller.showDetail( sensorId );
        }
      });
    }
  });

  return Router;
});