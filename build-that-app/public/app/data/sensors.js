define([ 'backbone', 'underscore', 'socketio' ], function( B, _, socket ) {
  var SensorsCollection = B.Collection.extend({
    url: '/data/sensors',

    initialize: function() {
      socket.on( 'data', _.bind( this.update, this ) );
    },

    update: function( data ) {
      _.each( this.parse( data ), function(s) {
        var model = this.get( s.id );

        if ( model ) {
          model.set( 'data', s.data );
        } else {
          this.add( s );
        }
      }, this);
    },

    parse: function( resp ) {
      return resp.sensors;
    }
  });

  return SensorsCollection;
});