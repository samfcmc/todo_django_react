module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appPath: 'todo_react',
    staticFilesPath: '<%= appPath %>/static',
    bowerComponentsPath: 'bower_components',
    bowerTargetPath: '<%= staticFilesPath %>/<%= bowerComponentsPath %>',
    bower: {
      install: {
        options: {
          targetDir: '<%= bowerTargetPath %>'
        }
      },
    },
    connect: {
      dev: {
        options: {
          port: 9000,
          middleware: function(connect, options, defaultMiddleware) {
            var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [proxySnippet].concat(defaultMiddleware);
          }
        },
        proxies: [
          {
            context: ['/'],
            host: 'localhost',
            port: 8000,
          }
        ]
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install'],
      },
    },
    clean: {
      bower: ['<%= bowerComponentsPath %>', '<%= bowerTargetPath %>']
    }
  });

  // Register tasks here.
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['bower:install', 'configureProxies:dev', 'connect:dev', 'watch']);

};
