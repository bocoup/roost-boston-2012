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

      sd.destroy();
    });

    test('Update sensor data', function() {
      var sd = new SensorDetail({
        model: sensorModel,
        el: '#test'
      });

      sd.render();

      sensorModel.set('data', [ 1, 2, 3, 4 ]);
      assert.equal( $('#test .js-max').html(), '4' );

      sd.destroy();
    });
  });
});