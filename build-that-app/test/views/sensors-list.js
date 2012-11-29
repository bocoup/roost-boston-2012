define([
  'app/views/sensors-list',
  'backbone',
  'jquery',
  'lib/jquery.simulate.js'
], function( SensorsList, B, $ ) {
  suite('SensorsList', function() {
    var sensorCollection;

    var sensors = [
      { id: 'sensor-1', name: 'sensor 1', data: [ 1, 2, 3 ] },
      { id: 'sensor-2', name: 'sensor 2', data: [ 1, 2, 3 ] },
      { id: 'sensor-3', name: 'sensor 3', data: [ 1, 2, 3 ] }
    ];

    setup(function() {
      $('#test').remove();
      $('<div id="test">').appendTo('body');
      sensorCollection = new B.Collection( sensors );
    });

    teardown(function() {
      $('#test').empty();
    });

    test('Create a SensorsList view', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      assert( sl, 'SensorsList created' );
      assert.equal( sl.el, document.getElementById('test') );
      sl.destroy();
    });

    test('Render the data', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.render();

      assert.equal( $('#test li').length, 3 );
      sl.destroy();
    });

    test('Render updated data', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.render();
      assert.equal( $('#test li').length, 3 );

      sensorCollection.add({
        id: 'sensor-4',
        name: 'sensor 4',
        data: [ 1, 2, 3 ]
      });

      assert.equal( $('#test li').length, 4 );
      sl.destroy();
    });

    test('Render on collection reset', function() {
      var flag = false;

      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.postRender = function() {
        flag = true;
      };

      sensorCollection.trigger('reset');
      assert( flag );
    });
  });
});