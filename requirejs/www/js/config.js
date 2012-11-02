require.config({
  // where to look for files, relative to this config file
  baseUrl: "./js",

  // the main dependency for the app
  deps: [ "main" ],

  // shortcut names for various dependencies
  paths: {
    "jquery": "../lib/jquery",
    "backbone": "../lib/backbone",
    "underscore": "../lib/underscore"
  },

  // shim to work with non-AMD files
  shim: {
    "backbone": {
      deps: [ "underscore", "jquery" ],
      exports: "Backbone"
    },
    "underscore": {
      exports: "_"
    }
  }
});