require.config({
  deps: [
    window.location.pathname === '/_test' ? 'test/config' : 'main'
  ],
  paths: {
    lib: '/lib',
    underscore: '/lib/underscore',
    backbone: '/lib/backbone',
    jquery: '/lib/jquery',
    text: '/lib/text',
    test: '/_test',
    socketio: '/socket.io/socket.io'
  },
  shim: {
    'socketio': {
      exports: 'io'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone',
      deps: [ 'jquery', 'underscore' ]
    }
  }
});