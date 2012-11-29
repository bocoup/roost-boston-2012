define([
  './base',
  'text!./templates/sensor-list.html'
], function( SuperView, tmpl ) {
  var SensorsList = SuperView.extend({
    events: {
      'click li a': '_handleClick'
    },

    template: tmpl,

    initialize: function() {
      this.bindTo( this.collection, 'add', this.render );
      this.bindTo( this.collection, 'reset', this.render );
      this.app = this.options.app || {};
    },

    _handleClick: function(evt) {
      evt.preventDefault();

      var sensorId = $( evt.target ).closest('li').attr('data-id');
      this.app.set( 'currentSensor', sensorId );
    }
  });

  return SensorsList;
});