var app = window.app = window.app || {};

app.SearchResults = (function() {

  var SearchResults = function( settings ) {
    this.app = settings.app;
    this.$el = $( settings.el );

    this.$el.on( 'click', '.like', $.proxy( this, '_handleLike' ) );
    this.$el.on( 'click', '.remove', $.proxy( this, '_handleRemove' ) );

    RSVP.EventTarget.mixin(this);
  };

  SearchResults.prototype = {
    set : function( val ) {
      var $el = this.$el;
      $el.empty();

      return app.loadTemplate( 'people-detailed.tmpl' ).done(function( t ) {
        var html = t( { people : val.results } );
        $el.html( html );
      });
    },

    _handleLike : function( evt ) {
      evt.preventDefault();
      var name = $( evt.currentTarget ).closest( 'li' ).find( 'h2' ).html();
      this.handleLike( name );
    },

    handleLike : function( name ) {
      var liked = this.app.get( 'liked' ) || [];
      liked.push( name );
      this.app.set( 'liked',  liked );
    },

    _handleRemove : function( evt ) {
      evt.preventDefault();
      $( evt.target ).closest( 'li' ).remove();
    }
  };

  return SearchResults;

}());