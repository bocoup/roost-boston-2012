/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'app/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
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
        eqnull: true
      },
      globals: {
        jQuery: true
      }
    },

    requirejs: {
      compile: {
        options: {
          appDir: 'app',
          baseUrl: './',
          modules: [ { name: 'js/app' } ],
          dir: 'build',
          paths: {
            jquery: 'lib/jquery'
          }
        }
      }
    }


  });

  // Default task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('default', 'lint test');

};
