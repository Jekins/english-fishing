const sass = require('node-sass');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: {
      src: {
        blocks: 'src/blocks',
        scss: 'src/scss',
      },
      dest: {
        js: 'public/js',
        css: 'public/css',
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> | Front-end: Jekins */\n'
      },
      js: {
        src: '<%= path.src.blocks %>/**/*.js',
        dest: '<%= path.dest.js %>/common.js'
      },
      css: {
        src: '<%= path.dest.css %>/includes/*.css',
        dest: '<%= path.dest.css %>/concat/common.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> | Front-end: Jekins */\n'
      },
      js: {
        files: {
          '<%= path.dest.js %>/common.min.js': '<%= path.dest.js %>/common.js'
        }
      }
    },
    sass: {
      options: {
        implementation: sass,
        outputStyle: 'compressed'
      },
      files: {
        expand: true,
        cwd: '<%= path.src.scss %>',
        src: ['*.scss'],
        dest: '<%= path.dest.css %>/includes/',
        ext: '.css'
      }
    },
    clean: {
      css: {
        src: [
          "<%= path.dest.css %>/includes/",
          "<%= path.dest.css %>/concat/"
        ]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 20 versions', 'ie 10']
      },
      files: {
        src: '<%= path.dest.css %>/concat/*.css',
        dest: '<%= path.dest.css %>/common.min.css'
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      js: {
        files: [
          '<%= path.src.blocks %>/**/*.js'
        ],
        tasks: [
          'concat:js',
          'uglify:js',
        ]
      },
      scss: {
        files: [
          '<%= path.src.scss %>/**/*.scss',
          '<%= path.src.blocks %>/**/*.scss',
        ],
        tasks: [
          'sass',
          'concat:css',
          'autoprefixer',
          'clean:css',
        ]
      },
    },
    connect: {
      server: {
        options: {
          port: 7777,
          base: 'public',
          livereload: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');


  grunt.registerTask('default', ['concat:js', 'uglify:js', 'sass', 'concat:css', 'autoprefixer', 'clean:css']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);

};
