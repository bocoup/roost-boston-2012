define([ 'backbone', 'app/router' ], function(B, Router) {
  $(function() {
    new Router();
    B.history.start();
  });
});