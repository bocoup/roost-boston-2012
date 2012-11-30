define([ 'socketio' ], function( io ) {
  var s = io.connect('http://localhost:4000');
  return s || { on: function() {} };
});