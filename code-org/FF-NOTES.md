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

## amd format

    define([ 'dependencyA', 'dependencyB' ], function( a, b ) {
      // ...

      return {
        myMethod : function() {
          // ...
        }
      };
    });

## module pattern refresher

- private variables
- expose limited API
- return function, object, constructor

## require.config

- `baseUrl`
- `deps`
- `shim`
- `paths`

## examples

- jquery
- underscore / backbone via `shim`
- jquery plugin via `shim`
- custom namespaces

## exercises