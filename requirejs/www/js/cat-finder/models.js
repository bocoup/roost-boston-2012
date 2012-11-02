window.CatFinder = window.CatFinder || {};

CatFinder.Models = {};
CatFinder.Collections = {};

CatFinder.Models.Cat = Backbone.Model.extend();

CatFinder.Collections.Cats = Backbone.Collection.extend({
  model: CatFinder.Models.Cat,

  url: 'js/cat-finder/cats.json'
});

CatFinder.Models.App = Backbone.Model.extend({
  initialize: function() {
    this.on('change:searchTerm', function(term) {
      var matches = CatFinder.cats.filter(function(cat) {
        return cat.get('name').match(term);
      });
      this.set('results', matches);
    }, this);
  }
});

CatFinder.cats = new CatFinder.Collections.Cats([
  { name: 'Myster', type: 'black' },
  { name: 'Sap', type: 'tortoise' },
  { name: 'Max', type: 'siamese' }
]);

CatFinder.app = new CatFinder.Models.App();