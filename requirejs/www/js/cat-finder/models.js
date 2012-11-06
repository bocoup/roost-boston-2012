window.CatFinder = window.CatFinder || {};

CatFinder.Models = {};

CatFinder.Models.App = Backbone.Model.extend({
  initialize: function() {
    this.on('change:searchTerm', function(model) {
      var term = model.get('searchTerm');

      var matches = CatFinder.cats.filter(function(cat) {
        return cat.get('name').match(term);
      });

      console.log('matches', matches);

      this.set('results', matches);

    }, this);
  }
});

CatFinder.cats = new Backbone.Collection([
  { name: 'Myster', type: 'black' },
  { name: 'Sap', type: 'tortoise' },
  { name: 'Max', type: 'siamese' }
]);

CatFinder.app = new CatFinder.Models.App();