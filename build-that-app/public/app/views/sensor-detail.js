define([
  './base',
  'text!./templates/sensor-detail.html',
  'lib/jquery.sparkline.js'
], function( SuperView, tmpl ) {
  var SensorDetail = SuperView.extend({
    template: tmpl,
    postPlaceAt: function() {
      $('#sensor-detail .sparklines').sparkline();
    }
  });

  return SensorDetail;
});