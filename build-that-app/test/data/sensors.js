define([ 'app/data/sensors' ], function( SensorsCollection ) {
  suite('SensorsCollection', function() {
    var xhr, requests;

    setup(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function(req) {
        requests.push(req);
      };
    });

    teardown(function() {
      xhr.restore();
    });

    test('Create a SensorsCollection', function() {
      var sc = new SensorsCollection();
      assert( sc );
    });

    test('Ping the proper URL', function() {
      var sc = new SensorsCollection();
      sc.fetch();
      assert.equal( requests[0].url, '/data/sensors' );
    });

    test('Parse data returned by server', function() {
      var sc = new SensorsCollection();
      sc.fetch();

      var req = requests[0];

      req.respond( 200, { 'Content-type' : 'text/json' },
        JSON.stringify({ sensors: [
          { id: 'sensor-1', name: 'sensor 1', data: [ 1 ] }
        ] })
      );

      assert.equal( sc.length, 1 );
      assert.equal( sc.get('sensor-1').get('name'), 'sensor 1' );
    });

  });
});