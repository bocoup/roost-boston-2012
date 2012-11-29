var _         = require( 'underscore' );
var express   = require( 'express' );
var app       = express( express.bodyParser() );
var server    = require( 'http').createServer( app );
var baseDir   = __dirname + '/../';
var sensors   = [];
var io        = require( 'socket.io' ).listen( server );

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

io.sockets.on( 'connection', function(s) {
  function sendData() {
    s.emit( 'data', { sensors: sensors });
    setTimeout( sendData, 500 );
  }
  sendData();
});

app.use( '/', express.static( baseDir + 'public' ) );
app.use( '/_test', express.static( baseDir + 'test') );

app.get( '/sensors/:sensorId', function( req, res ) {
  res.redirect( '/' );
});

app.get( '/data/sensors', function( req, res ) {
  res.json({ sensors: sensors });
});

app.get( '/data/sensors/:sensorId', function( req, res ) {
  var s = _.filter( sensors, function(s) {
    return s.id === req.params.sensorId;
  });

  res.json( s );
});

server.listen( 4000 );

console.log( 'Serving on http://localhost:4000' );