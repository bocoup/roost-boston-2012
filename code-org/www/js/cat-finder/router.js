window.CatFinder = window.CatFinder || {};

CatFinder.Router = Backbone.Router.extend({
  routes: {
    '': 'search'
  },

  search: function() {
    new CatFinder.Views.Search({
      model: CatFinder.app
    });

    new CatFinder.Views.Results({
      model: CatFinder.app
    });
  }
});

$(function() {
  new CatFinder.Router();
  Backbone.history.start();
});
