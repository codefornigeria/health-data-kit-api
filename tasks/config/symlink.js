module.exports = function(grunt) {

  grunt.config.set('symlink', {
      dev: {

              src: '.tmp/uploads/**',
              dest: '.tmp/public/uploads/'

      }
  });

   grunt.loadNpmTasks('grunt-contrib-symlink');
};
