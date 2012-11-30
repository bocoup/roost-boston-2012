var _         = require( 'underscore' );
var express   = require( 'express' );
var app       = express( express.bodyParser() );
var server    = require( 'http').createServer( app );
var baseDir   = __dirname + '/../';
var io        = require( 'socket.io' ).listen( server );
var fs        = require( 'fs' );

module.exports = function( sensors ) {
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
    fs.readFile( baseDir + 'public/index.html', 'utf8', function( err, txt ) {
      res.send( txt );
    });
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
};