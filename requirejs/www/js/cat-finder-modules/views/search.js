define([ 'backbone' ], function(B) {
  return B.View.extend({
    el: "#search",

    events: {
      "submit form": "_onSearch"
    },

    _onSearch: function(evt) {
      evt.preventDefault();
      var term = this.$el.find("input[name='q']").val();
      this.model.set("searchTerm", term);
    }
  });
});