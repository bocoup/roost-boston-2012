/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: [ 'grunt.js', 'public/app/**/*.js', 'test/**/*.js' ]
    },
    watch: {
      files: '<config:lint.files>'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        require: true,
        define: true
      }
    },

    requirejs: {
      compile: {
        options: {
          // https://github.com/jrburke/r.js/blob/master/build/example.build.js
          appDir: 'public/',
          baseUrl: './',

          modules: [ { name: 'app/main' } ],
          dir: 'build',

          paths: {
            underscore: 'lib/underscore',
            backbone: 'lib/backbone',
            jquery: 'lib/jquery',
            text: 'lib/text'
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
        }
      }
    },

    mocha: {
      all: [ 'http://localhost:4000/_test' ]
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint mocha');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
