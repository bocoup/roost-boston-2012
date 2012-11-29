define([
  'data/sensors',
  'views/sensors-list',
  'views/sensor-detail'
  'backbone'
], function( SensorCollection, SensorsList, SensorDetail, B ) {
  var app = new B.Model();
  var sensorList, sensorDetail;
  var sensors = new SensorCollection();

  var SensorIndex = function() {
    app.on( 'change:currentSensor', function( app, sensorId ) {
      this.showDetail( sensorId );
    }, this);

    sensorList = new SensorsList({
      el: '#sensors-list',
      app: app,
      collection: sensors
    });

    sensors.fetch();
  };

  SensorIndex.prototype.showDetail = function( sensorId ) {
    if ( sensorDetail ) {
      sensorDetail.destroy();
    }

    sensorDetail = new SensorDetail({
      el: '#sensor-detail',
      model: sensors.get( sensorId );
    });

    sensorDetail.render();
  };

  return SensorIndex;
});