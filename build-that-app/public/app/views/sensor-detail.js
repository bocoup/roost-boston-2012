define([
  './base',
  'text!./templates/sensor-detail.html',
  'lib/jquery.sparkline.js'
], function( SuperView, tmpl ) {
  var SensorDetail = SuperView.extend({
    template: tmpl,

    initialize: function() {
      this.bindTo( this.model, 'change', this.update );
    },

    update: function() {
      this.render();
      this.sparklines();
    },

    postPlaceAt: function() {
      this.sparklines();
    },

    sparklines: function() {
      $('#sensor-detail .sparklines').sparkline();
    }
  });

  return SensorDetail;
});