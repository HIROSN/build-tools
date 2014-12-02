'use strict';

module.exports = function(grunt) {
  var srcFiles = [
    '**/*.js',
    '!node_modules/**/*',
    '!bower_components/**/*',
    '!test/browser/**/*',
    '!build/**/*',
    '!public/**/*'
  ];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
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
        src: ['build/', 'public/']
      }
    },

    browserify: {
      dev: {
        src: [
          'app/**/*.js',
          'app/js/**/*.js'
        ],
        dest: 'build/bundle.js',
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
          'build/stylesheet.css': 'app/css/stylesheet.scss'
        }
      }
    },

    uglify: {
      target: {
        files: {
          'public/bundle.js': ['build/bundle.js']
        }
      }
    },

    htmlmin: {
      dist: {
        files: {
          'public/index.html': 'app/index.html'
        },
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      }
    },

    cssmin: {
      target: {
        src: 'build/stylesheet.css',
        dest: 'public/stylesheet.css'
      },

      foundation: {
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
    'browserify:dev',
    'browserify:test',
    'sass',
    'uglify',
    'htmlmin',
    'cssmin'
  ]);
};
