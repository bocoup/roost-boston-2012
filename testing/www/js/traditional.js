$(function() {

  var _templateCache = {};

  var resultsList = $( '#results' );
  var liked = $( '#liked' );
  var pending = false;

  function getTemplate( name ) {
    if ( _templateCache[ name ] ) {
      return _templateCache[ name ];
    }

    return $.get( '/templates/' + name ).pipe(function( tmpl ) {
      _templateCache[ name ] = _.template( tmpl );
      return _templateCache[ name ];
    });
  }

  $( '#searchForm' ).on( 'submit', function( e ) {
    e.preventDefault();

    if ( pending ) { return; }

    var form = $( this );
    var query = $.trim( form.find( 'input[name="q"]' ).val() );

    if ( !query ) { return; }

    pending = true;

    var req = $.ajax( '/data/search.json', {
      data : { q: query },
      dataType : 'json'
    });

    var tmpl = getTemplate( 'people-detailed.tmpl' );

    $.when( tmpl, req ).done(function( tmpl, data ) {
      var people = data[ 0 ].results;

      resultsList.html( tmpl( { people : people } ) );

      pending = false;
    });

    $('<li>', {
      'class' : 'pending',
      html : 'Searching &hellip;'
    }).appendTo( resultsList.empty() );
  });

  resultsList.on( 'click', '.remove', function( e ) {
    e.preventDefault();
    $( this ).closest( 'li' ).remove();
  });

  resultsList.on( 'click', '.like', function(e) {
    e.preventDefault();
    var name = $( this ).closest( 'li' ).find( 'h2' ).text();
    liked.find( '.no-results' ).remove();
    $( '<li>', { text: name } ).appendTo( liked );
  });

});
