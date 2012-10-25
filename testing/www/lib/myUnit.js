window.test = function( msg, fn ) {
  var fail, assertion, el;

  try {
    fn();
  } catch( e ) {
    fail = e.message;
  }

  el = document.createElement( 'p' );
  el.innerHTML = ( fail ? 'FAIL: ' : 'PASS: ' ) + msg;
  el.className = fail ? 'fail' : 'pass';
  document.body.appendChild( el );

  if ( fail ) {
    assertion = document.createElement( 'p' );
    assertion.innerHTML = fail;
    assertion.className = ( fail ? 'fail' : 'pass' ) + ' assertion';

    document.body.appendChild( assertion );
  }
};

window.assert = function( val, msg ) {
  if ( !val ) {
    throw new Error( msg );
  }
};