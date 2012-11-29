define([
  './base',
  'text!./templates/sensor-detail.html'
], function( SuperView, tmpl ) {
  var SensorDetail = SuperView.extend({
    template: tmpl
  });

  return SensorDetail;
});