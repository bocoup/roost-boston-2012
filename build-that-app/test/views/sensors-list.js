/*global assert:true, suite:true, setup:true, teardown:true, test:true */

define([
  'views/sensors-list',
  'backbone',
  'jquery'
], function( SensorsList, B, $ ) {
  suite('SensorsList', function() {
    var sensorCollection, sensors;

    setup(function() {
      sensors = [
        { id: 'sensor-1', name: 'sensor 1', data: [ 1, 2, 3 ], type: 'fake' },
        { id: 'sensor-2', name: 'sensor 2', data: [ 1, 2, 3 ], type: 'fake' },
        { id: 'sensor-3', name: 'sensor 3', data: [ 1, 2, 3 ], type: 'fake' }
      ];

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
      assert.equal( $('#test li .sparklines').attr('values'), '1,2,3' );

      sl.destroy();
    });

    test('Render on new data', function() {
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

    test('Render on data reset', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.render();

      assert.equal( $('#test li').length, 3 );

      sensors.push({ id: 'sensor-4', name: 'sensor 4', data: [ 1, 2, 3 ], type: 'fake' });

      sensorCollection.reset( sensors )

      assert.equal( $('#test li').length, 4 );
    });

    test('Render on data add', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.render();

      assert.equal( $('#test li').length, 3 );

      sensorCollection.add({ id: 'sensor-4', name: 'sensor 4', data: [ 1, 2, 3 ], type: 'fake' });

      assert.equal( $('#test li').length, 4 );
    });

    test('Render on data change', function() {
      var sl = new SensorsList({
        collection: sensorCollection,
        el: '#test'
      });

      sl.render();

      assert.equal( $('#test li').length, 3 );

      var model = sensorCollection.get('sensor-3');
      model.set('name', 'renamed sensor');

      assert.equal( $('#test li').length, 3 );
      assert( $('#test').html().match('renamed sensor') );
    });
  });
});