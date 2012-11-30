define([
  'backbone',
  'data/sensors',
  'views/sensors-list',
  'views/sensor-detail'
], function( B, SensorCollection, SensorsList, SensorDetail ) {
  var sensorList, sensorDetail;
  var sensors = new SensorCollection();

  var Router = B.Router.extend({
    routes: {
      '': 'index',
      'sensors/:sensorId': 'sensor'
    },

    index: function() {
      sensorList = new SensorsList({
        collection: sensors
      });

      sensorList.render();
      sensorList.placeAt('#sensors-list');
    },

    sensor: function( sensorId ) {
      if ( sensorDetail ) {
        sensorDetail.destroy();
      }

      sensorDetail = new SensorDetail({
        model: sensors.get( sensorId )
      }).render();

      sensorDetail.placeAt('#sensor-detail');
    }
  });

  return Router;
});