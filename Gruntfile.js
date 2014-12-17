module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			stylus: {
	      files: ['styl/**/*.styl'],
	      tasks: ['notify:stylus','stylus', 'cssmin'],
	      options: {
	          spawn: false,
	          livereload: true
	      }
	    },
      livereload: {
        options: { livereload: true },
        files: ['**/*.html']
      }
    },
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		},
		copy: {
			prepare: {
				files: [{
					src: [
						'**',
						'!node_modules/**',
						'!bower_components/**',
						'!Contributing.md',
						'!Gruntfile.js',
						'!License.md',
						'!Readme.md',
						'!bower.json',
						'!package.json',
						'assets/**',
						'screencasts/**'
					],
					dest: 'temp/pres/'
				},{
					expand: true,
					cwd: 'node_modules/shower-core/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/'
				},{
					expand: true,
					cwd: 'node_modules/shower-ribbon/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/themes/ribbon/'
				},{
					expand: true,
					cwd: 'node_modules/shower-bright/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/pres/shower/themes/bright/'
				}]
			}
		},
		replace: {
			core: {
				src: 'temp/pres/index.html',
				overwrite: true,
				replacements: [{
					from: /(node_modules|bower_components)\/shower-core/g,
					to: 'shower'
				},{
					from: /(node_modules|bower_components)\/shower-(ribbon|bright)/g,
					to: 'shower/themes/$2'
				}]
			},
			themes: {
				src: 'temp/pres/shower/themes/*/index.html',
				overwrite: true,
				replacements: [{
					from: '../shower-core', to: '../..'
				}]
			}
		},
		'gh-pages': {
			options: {
				base: 'temp/pres',
				clone: 'temp/clone'
			},
			src: ['**']
		},
		compress: {
			shower: {
				options: {
					archive: 'archive.zip'
				},
				files: [{
					expand: true,
					cwd: 'temp/pres/',
					src: '**',
					dest: '.'
				}]
			}
		},
		stylus: {
      compile: {
        options: {
          paths: ['styl'],
          urlfunc: 'url64',
          'include css': true,
          compress: false
        },
        files: {
          'css/style.css': ['styl/style.styl']
        }
      }
    },
		cssmin: {
      dist: {
        src: 'css/style.css',
        dest: 'css/style.min.css'
      }
    },
    notify: {
      stylus: {
        options: {
          title: 'Готово!',  // optional
          message: 'STYLUS скомпилирован', //required
        }
      }
    },
    imagemin: {
    	all: {
	    	files: [{
	        expand: true,                  // Enable dynamic expansion
	        cwd: 'pictures/',                   // Src matches are relative to this path
	        src: ['**/*.{png,jpg,gif}']   // Actual patterns to match
	        // dest: 'pictures/'                  // Destination path prefix
	      }]
      }
    },
		clean: ['temp']
	});

	grunt.registerTask('publish', [
		'copy',
		'replace',
		'gh-pages',
		'clean'
	]);

	grunt.registerTask('archive', [
		'copy',
		'replace',
		'compress',
		'clean'
	]);

	grunt.registerTask('w', ['watch']);

};
