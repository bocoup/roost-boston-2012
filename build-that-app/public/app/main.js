require([
  'router',
  'backbone'
], function( Router, B ) {
  $(function() {

    var router = new Router();
    B.history.start({ pushState: true, root: '/' });

    // https://raw.github.com/tbranyen/backbone-boilerplate/master/app/main.js
    $( document ).on('click', 'a[href]:not([data-bypass])', function(evt) {
      var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
      var root = location.protocol + '//' + location.host + '/';

      if (href.prop.slice(0, root.length) === root) {
        evt.preventDefault();
        Backbone.history.navigate(href.attr, true);
      }
    });

  });
});