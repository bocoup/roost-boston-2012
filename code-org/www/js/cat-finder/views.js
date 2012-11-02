window.CatFinder = window.CatFinder || {};

CatFinder.Views = {};

CatFinder.Views.Search = Backbone.View.extend({
  el: '#search',

  events: {
    'submit form': '_onSearch'
  },

  _onSearch: function(evt) {
    evt.preventDefault();
    var term = this.$el.find('input[name="q"]').val();
    this.model.set('searchTerm', term);
  }
});

CatFinder.Views.Results = Backbone.View.extend({
  el: '#results',

  initialize: function() {
    this.model.on('change:results', this._onChange, this);
  },

  _onChange: function(model) {
    var tmpl = _.template('<li><%= name %> (<%= type %>)</li>');
    var html = _.map(model.get('results'), function(result) {
      return tmpl(result.toJSON());
    }).join('');

    this.$el.html(html);
  }
});