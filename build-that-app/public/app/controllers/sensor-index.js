define([
  'data/sensors',
  'views/sensors-list',
  'views/sensor-detail',
  'backbone'
], function( SensorCollection, SensorsList, SensorDetail, B ) {
  var sensorList, sensorDetail;
  var sensors = new SensorCollection();

  var SensorIndex = function() {
    app.on( 'change:currentSensor', function( app, sensorId ) {
      this.showDetail( sensorId );
    }, this);

    sensorList = new SensorsList({
      el: '#sensors-list',
      collection: sensors
    });

    sensors.fetch();
  };

  SensorIndex.prototype.showDetail = function( sensorId ) {
    if ( sensorDetail ) {
      sensorDetail.destroy();
    }

    sensors.fetch({
      success: function() {
        sensorDetail = new SensorDetail({
          model: sensors.get( sensorId )
        }).render();

        sensorDetail.placeAt('#sensor-detail');
      }
    });

  };

  return SensorIndex;
});