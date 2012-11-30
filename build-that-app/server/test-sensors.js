var _ = require( 'underscore' );

module.exports = (function() {
  var sensors = [];

  var sensorTypes = [
    'motion',
    'accelerometer',
    'temperature',
    'photocell',
    'potentiometer'
  ];

  var Sensor = function( id ) {
    this.id = id;
    this.data = [];
    this.name = id;
    this.type = sensorTypes[ _.random( sensorTypes.length - 1 ) ];
  };

  Sensor.prototype.generateData = function() {
    this.data.push( _.random( 0, 255 ) );

    this._cleanup();
    setTimeout(function() {
      this.generateData();
    }.bind(this), 500 );
  };

  Sensor.prototype._cleanup = function() {
    if ( this.data.length > 100 ) {
      this.data.shift();
    }
  };

  for ( var i = 0; i < 5; i++ ) {
    var s = new Sensor( 'sensor-' + i );
    sensors.push( s );
    s.generateData();
  }

  return sensors;
}());