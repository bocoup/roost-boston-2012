define([ 'backbone', 'underscore', './socket' ], function( B, _, socket ) {
  var SensorsCollection = B.Collection.extend({
    url: '/data/sensors',

    initialize: function() {
      var self = this;

      socket.on( 'data', function( data ) {
        _.each( data.sensors, function(s) {
          var model = self.get( s.id );

          if ( model ) {
            model.set( 'data', s.data );
          } else {
            self.add( s, { silent: true } );
          }
        }, self);

        self.trigger( 'change' );
      });
    },

    parse: function( resp ) {
      return resp.sensors;
    }
  });

  return SensorsCollection;
});