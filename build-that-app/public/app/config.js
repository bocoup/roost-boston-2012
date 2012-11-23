require.config({
  deps: [ 'main' ],
  paths: {
    vendor: '../lib'
  },
  shim: {
    'vendor/underscore': {
      exports: '_'
    },
    'vendor/backbone': {
      exports: 'Backbone',
      deps: [ 'vendor/jquery', 'vendor/underscore' ]
    }
  }
});