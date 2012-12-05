var sensors   = require( './test-sensors.js');
var server    = require( './server.js' );
server( sensors );

// var arduino   = require( './sensors.js' );
// var server    = require( './server.js' );
// arduino.board.on( 'ready', function() {
//   server( arduino.sensors() );
// });