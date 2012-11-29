define([
  './base',
  'text!./templates/sensor-list.html',
  '/lib/jquery.sparkline.js'
], function( SuperView, tmpl ) {
  var SensorsList = SuperView.extend({
    template: tmpl,

    initialize: function() {
      this.bindTo( this.collection, 'add change reset', this.render );
    },

    postRender: function() {
      this.$el.find('.sparklines').sparkline();
    }
  });

  return SensorsList;
});