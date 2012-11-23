require.config({
  deps: [ 'main' ],
  paths: {
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    jquery: '../lib/jquery'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone',
      deps: [ 'jquery', 'underscore' ]
    }
  }
});