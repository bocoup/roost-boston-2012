define([ 'backbone', 'underscore' ], function(B, _) {
  return B.View.extend({
    el: "#results",

    initialize: function() {
      this.model.on("change:results", this._onChange, this);
    },

    _onChange: function(model) {
      var tmpl = _.template("<li><%= name %> (<%= type %>)</li>");
      var html = _.map(model.get("results"), function(result) {
        return tmpl(result.toJSON());
      }).join("");

      this.$el.html(html);
    }
  });
});