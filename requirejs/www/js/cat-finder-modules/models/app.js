define([ 'backbone', 'app/collections/cats' ], function(B, cats) {
  return B.Model.extend({
    initialize: function() {
      this.on('change:searchTerm', function(model) {
        var term = model.get('searchTerm');

        var matches = cats.filter(function(cat) {
          return cat.get('name').match(term);
        });

        this.set('results', matches);

      }, this);
    }
  });
});