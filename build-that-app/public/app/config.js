require.config({
  deps: [ 'main' ],
  paths: {
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    jquery: '../lib/jquery',
    text: '../lib/text'
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