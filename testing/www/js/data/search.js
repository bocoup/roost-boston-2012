var app = window.app = window.app || {};

app.Search = (function() {
  var Search = function() {};

  Search.prototype = {
    fetch : function( query ) {
      return $.getJSON( '/data/search.json', {
        q : query
      }).pipe( $.proxy( this, '_process') );
    },

    _process : function( resp ) {
      return resp.results;
    }
  };

  return Search;
}());