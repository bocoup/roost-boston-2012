/*global assert:true, suite:true, setup:true, teardown:true, test:true */

define([
  'views/sensor-detail',
  'backbone',
  'jquery'
], function( SensorDetail, B, $ ) {
  suite('SensorDetail', function() {
    var sensorModel;

    setup(function() {
      $('#test').remove();
      $('<div id="test">').appendTo('body');

      sensorModel = new B.Model({
        id: 'sensor-1',
        name: 'sensor 1',
        data: [ 1, 2, 3, 3 ],
        type: 'temperature'
      });
    });

    test('Create a SensorDetail view', function() {
      var sd = new SensorDetail({
        model: sensorModel,
        el: '#test'
      });

      assert( sd );
      assert.equal( sd.el, document.getElementById('test') );

      sd.destroy();
    });

    test('Display sensor data', function() {
      var sd = new SensorDetail({
        model: sensorModel,
        el: '#test'
      });

      sd.render();

      assert( $('#test').html().match('sensor 1') );
      assert.equal( $('#test .js-min').html(), '1' );
      assert.equal( $('#test .js-max').html(), '3' );
      assert.equal( $('#test .js-points').html(), '4' );
      assert.equal( $('#test .js-sparkline').attr('values'), '1,2,3,3' );

      sd.destroy();
    });

    test('Update sensor data on model update', function() {
      var sd = new SensorDetail({
        model: sensorModel,
        el: '#test'
      });

      sd.render();

      sensorModel.set('data', [ 0, 1, 2, 3, 4 ]);

      assert.equal( $('#test .js-max').html(), '4' );
      assert.equal( $('#test .js-min').html(), '0' );
      assert.equal( $('#test .js-points').html(), '5' );
      assert.equal( $('#test .js-sparkline').attr('values'), '0,1,2,3,4' );

      sd.destroy();
    });
  });
});