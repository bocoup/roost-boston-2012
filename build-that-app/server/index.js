var sensors   = require( './sensors.js' );
var server    = require( './server.js' );

sensors.board.on( 'ready', function() {
  server( sensors.sensors() );
});

// server( sensors );