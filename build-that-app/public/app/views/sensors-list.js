define([
  './base',
  'text!./templates/sensor-list.html'
], function( SuperView, tmpl ) {
  var SensorsList = SuperView.extend({
    template: tmpl,

    initialize: function() {
      this.bindTo( this.collection, 'add', this.render );
      this.bindTo( this.collection, 'reset', this.render );
    }
  });

  return SensorsList;
});