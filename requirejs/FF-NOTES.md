# requirejs

## what problems does it solve?

- eliminate script tag hell
- avoid polluting global scope
- modularization
- dependency management
    - plugins
    - libraries
    - your modules
    - text
- production builds

## traditional application

www/index-traditional.html

- organized, but ...
- global namespace
- lots of script tags
- no expression of dependencies
- how to build for production?
- amd to the rescue

```
define([ 'dependencyA', 'dependencyB' ], function( a, b ) {
  // ...

  return {
    myMethod : function() {
      // ...
    }
  };
});
```

```
define(function( require ) {
  var a = require( 'dependencyA' );
  var b = require( 'dependencyB' );

  // ...

  return {
    myMethod : function() {
      // ...
    }
  };
});
```

## module pattern refresher

- private variables
- expose limited API
- return function, object, constructor

## reworking our existing app

- app code
    - require.config
        - `baseUrl`
        - `deps`
        - `paths`
        - `shim`
- jquery
- underscore, backbone via `shim`
- template plugin

## builds

- grunt
- configuration via grunt.js
- `grunt requirejs` to create the build