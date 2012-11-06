define([
  'backbone',
  'app/views/search',
  'app/views/results',
  'app/models/app'
], function(B, Search, Results, App) {
  return Backbone.Router.extend({
    routes: {
      "": "search"
    },

    search: function() {
      var app = new App();
      new Search({ model: app });
      new Results({ model: app });
    }
  });
});