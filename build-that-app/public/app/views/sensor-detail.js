define([
  './base',
  'text!./templates/sensor-detail.html',
  'underscore',
  'lib/jquery.sparkline.js'
], function( SuperView, tmpl, _ ) {
  var SensorDetail = SuperView.extend({
    template: tmpl,

    elements: [
      'min',
      'max',
      'points',
      'sparkline'
    ],

    initialize: function() {
      this.bindTo( this.model, 'change', this.update );
    },

    update: function() {
      var data = this.model.get('data');

      this.minElement.text( _.min( data ) );
      this.maxElement.text( _.max( data ) );
      this.pointsElement.text( data.length );
      this.sparklineElement.empty().attr( 'values', data.join(',') );
      this.sparklines();
    },

    postPlaceAt: function() {
      this.sparklines();
    },

    sparklines: function() {
      this.sparklineElement.sparkline();
    }
  });

  return SensorDetail;
});