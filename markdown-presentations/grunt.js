/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-css');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'assets/scripts/presentation.js']
    },
    cssmin: {
      dist: {
        src: [
          "assets/libs/codemirror/lib/codemirror.css",
          "assets/styles/presentation.css"
        ],
        dest: "dist/built.min.css"
      }
    },
    concat: {
      dist: {
        src: [
          'assets/libs/jquery.min.js',
          'assets/scripts/presentation.js',
          'assets/libs/codemirror/lib/codemirror.js',
          'assets/libs/codemirror/mode/xml/xml.js',
          'assets/libs/codemirror/mode/javascript/javascript.js',
          'assets/libs/codemirror/mode/css/css.js',
          'assets/libs/codemirror/mode/shell/shell.js',
          'assets/libs/codemirror/mode/htmlmixed/htmlmixed.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
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
        $: true,
        alert: true,
        CodeMirror: true,
        escape: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint cssmin concat min');

};
