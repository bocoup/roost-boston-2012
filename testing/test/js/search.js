/*global
  test:true,
  module:true,
  ok:true,
  equal:true,
  sinon:true,
  stop:true,
  start:true
*/

var xhr, requests;

module('search data', {
  setup : function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function( req ) { requests.push(req); };
  },
  teardown : function() {
    xhr.restore();
  }
});

test('search data is properly fetched', function() {
  var search = new app.Search();
  var result = search.fetch('cat');

  requests[0].respond(
    200,
    { "Content-type" : "text/json" },
    JSON.stringify( { results : [ 'cat' ] } )
  );

  equal( requests[0].url, '/data/search.json?q=cat' );
  ok( result.then, 'result is a promise' );

  result.done(function( data ) {
    equal( data[0], 'cat' );
  });
});