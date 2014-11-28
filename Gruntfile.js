'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    '**/*.js',
    '!node_modules/**/*',
    '!bower_components/**/*',
    '!test/browser/**/*',
    '!public/**/*'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-css');

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties'
      }
    },

    simplemocha: {
      src: ['test/api/**/*.js']
    },

    clean: {
      dev: {
        src: ['public/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html'],
        expand: true,
        dest: 'public/'
      },

      map: {
        cwd: 'bower_components/jquery/dist/',
        src: ['**/jquery.min.map'],
        expand: true,
        dest: 'public/'
      }
    },

    browserify: {
      dev: {
        src: [
          'app/**/*.js',
          'app/js/**/*.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js'
        ],
        dest: 'public/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: [
          'test/browser/js/**/*.js',
          'app/js/**/*.js'
        ],
        dest: 'test/browser/test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    sass: {
      dist: {
        files: {
          'public/stylesheet.css': 'app/css/stylesheet.scss'
        }
      }
    },

    cssmin: {
      target: {
        src: 'bower_components/foundation/css/foundation.css',
        dest: 'public/foundation.min.css'
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'simplemocha',
    'clean:dev',
    'copy:dev',
    'copy:map',
    'browserify:dev',
    'browserify:test',
    'sass',
    'cssmin'
  ]);
};
