define([
  'views/base',
  'text!./templates/sensor-list.html',
  'lib/jquery.sparkline'
], function( SuperView, tmpl ) {
  var SensorsList = SuperView.extend({
    template: tmpl,

    initialize: function() {
      this.bindTo( this.collection, 'add change reset', this.render );
    },

    postRender: function() {
      this.$el.find('.sparklines').sparkline('html', { enableTagOptions: true });
    }
  });

  return SensorsList;
});