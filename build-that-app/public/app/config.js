require.config({
  deps: [
    window.location.pathname === '/_test' ? 'test/config' : 'main'
  ],
  paths: {
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    jquery: '../lib/jquery',
    text: '../lib/text',
    test: '../_test'
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