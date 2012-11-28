var express   = require( 'express' );
var _         = require( 'underscore' )
var app       = express( express.bodyParser() );
var baseDir   = __dirname + '/../';
var sensors   = [];

var Sensor = function( id ) {
  this.id = id;
  this.data = [];
};

Sensor.prototype.generateData = function() {
  this.data.push( Math.random() );
  this._cleanup();
};

Sensor.prototype._cleanup = function() {
  if ( this.data.length > 1000 ) {
    this.data.shift();
  }
};

for ( var i = 0; i < 5; i++ ) {
  var s = new Sensor( 'sensor-' + i );
  sensors.push( s );

  (function(s){
    setTimeout(function() {
      s.generateData();
    }, 1000);
  }(s));
}

app.use( '/', express.static( baseDir + 'public' ) );
app.use( '/test', express.static( baseDir + 'test') );

app.get( '/data/sensors', function( req, res ) {
  res.json({ sensors: sensors });
});

app.get( '/data/sensors/:sensorId', function( req, res ) {
  var s = _.filter( sensors, function(s) {
    return s.id === req.params.sensorId;
  });

  res.json( s );
});

app.listen( 4000 );

console.log( 'Serving on http://localhost:4000' );