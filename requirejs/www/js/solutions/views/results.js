define([
  'backbone',
  'underscore',
  'text!templates/cat.html'
], function(B, _, catTemplate) {
  return B.View.extend({
    el: "#results",

    initialize: function() {
      this.model.on("change:results", this._onChange, this);
    },

    _onChange: function(model) {
      var tmpl = _.template(catTemplate);
      var html = _.map(model.get("results"), function(result) {
        return tmpl(result.toJSON());
      }).join("");

      this.$el.html(html);
    }
  });
});