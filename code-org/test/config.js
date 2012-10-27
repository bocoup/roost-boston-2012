require.config({
  baseUrl : './',
  paths : {
    'jquery' : '../www/lib/jquery',
    'rsvp' : '../www/lib/rsvp',
    'backbone' : '../www/lib/backbone',
    'underscore' : '../www/lib/underscore',
    'app' : '../www/js'
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

console.log('this one');