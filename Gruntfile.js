module.exports = function (grunt) {
  grunt.initConfig({

    watch: {
      html: {
        files: ['**/*.html'],
         options: {
          interrupt: true,
          livereload: true,
        }
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['default'],
        options: {
          interrupt: true,
          livereload: true,
        }
      }
    },

    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'none',
        noCache: true
      },
      single_file: {
        files: {
          'dist/css/br-progress.css': 'src/br-progress.scss'
        }
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },

    postcss: {
      options: {
        safe: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 2 version'})
        ]
      },
      dist: {
        expand: true,
        cascade: true,
        remove: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask( 'default', [ 'sass', 'postcss', 'cssmin' ] );

};