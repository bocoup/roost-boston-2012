define([ 'backbone' ], function( B ) {
  var SensorsCollection = B.Collection.extend({
    url: '/data/sensors',
    parse: function( resp ) {
      return resp.sensors;
    }
  });

  return SensorsCollection;
});