define(function() {
  var s = window.io && window.io.connect('http://localhost:4000');
  return s || {
    on: function() {}
  };
});