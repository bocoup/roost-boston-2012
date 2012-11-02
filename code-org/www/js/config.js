require.config({
  baseUrl : './js',
  deps : [ 'main' ],
  paths : {
    'jquery' : '../lib/jquery',
    'backbone' : '../lib/backbone',
    'underscore' : '../lib/underscore'
  },
  shim : {
    'backbone' : {
      deps : [ 'underscore', 'jquery' ],
      exports : 'Backbone'
    },
    'underscore' : {
      exports : '_'
    }
  }
});