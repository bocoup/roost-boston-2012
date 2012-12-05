var five = require('johnny-five');

module.exports = (function() {

  var board = new five.Board();
  var sensors = [];

  var Sensor = function( id, type, sensor ) {
    this.id = id;
    this.data = [];
    this.name = id;
    this.type = type;

    sensor.on( 'read', function() {
      this.data.push( sensor.scaled );
      this._cleanup();
    }.bind( this ) );
  };

  Sensor.prototype._cleanup = function() {
    if ( this.data.length > 100 ) {
      this.data.shift();
    }
  };

  board.on( 'ready', function() {
    var pot = new five.Sensor({ pin: 'A0', freq: 500 });
    pot.scale([ 0, 100 ]);

    var temp = new five.Sensor({ pin: 'A1', freq: 500 });
    temp.scale([ 0, 500 ]);

    var photo = new five.Sensor({ pin: 'A2', freq: 500 });
    photo.scale([ 0, 100 ]);

    var motion = new five.Sensor({ pin: 'A3', freq: 500 });
    motion.scale([ 0, 100 ]);

    sensors = [
      new Sensor( 'sensor-0', 'potentiometer', pot ),
      new Sensor( 'sensor-1', 'temperature', temp ),
      new Sensor( 'sensor-2', 'photocell', photo ),
      new Sensor( 'sensor-3', 'motion', motion )
    ];
  });

  return {
    board: board,
    sensors: function() {
      return sensors;
    }
  };

}());

