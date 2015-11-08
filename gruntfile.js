module.exports = function(grunt) {


	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};
	require('load-grunt-tasks')(grunt);
	/*require('time-grunt')(grunt);	*/

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		yeoman: appConfig,

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				dest: '.temp/concat/vendor.js',
				src: ['bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js'
				]
			},
			vendor: {
				dest: '.temp/concat/scripts.js',
				src: ['<%= yeoman.app %>/app/app.js',
					'<%= yeoman.app %>app/{,*/}*.js',
					'<%= yeoman.app %>/app/{,*/}*/{,*/}*.js',
					'<%= yeoman.app %>/common/services/*.js'
				]
			},
			csscommon: {
				dest: '.temp/concat/main.css',
				src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
					'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
				]
			}
		},


		jshint: {
			files: ['gruntfile.js', 'app/**/*.js', '!app/lib/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/app/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},


		concurrent: {
			server: [
				'copy:dist', 'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		connect: {
			options: {
				port: 9001,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35727
			},
			livereload: {
				options: {
					open: true,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static('src')
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>'
				}
			}
		},


		watch: {
			bower: {
				files: ['bower.json']
			},
			js: {
				files: ['<%= yeoman.app %>app/{,*/}*.js',
					'<%= yeoman.app %>/app/{,*/}*/{,*/}*.js',
					'<%= yeoman.app %>app/*.js',
					'<%= yeoman.app %>/common/services/*.js'
				],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['gruntfile.js', '<%= yeoman.app %>app/{,*/}*.js',
					'<%= yeoman.app %>/app/{,*/}*/{,*/}*.js',
					'<%= yeoman.app %>app/*.js',
					'<%= yeoman.app %>/common/services/*.js',
					'<%= yeoman.app %>/app/{,*/}*/{,*/}*.html'
				]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '**/*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.temp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		uglify: {
			build: {
				files: [{
					expand: true,
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts',
					cwd: '.temp/concat'
				}]
			},
			options: {
				mangle: true
			},
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.html',
						'*.{ico,png,txt}',
						'app/{,*/}*/{,*/}*.html',
						'views/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'fonts/*'
					]
				}]
			},
			js: {
				expand: false,

				dest: '<%= yeoman.dist %>/scripts/',
				src: ['.temp/concat/*.js']
			},
			styles: {
				expand: true,
				src: '*.css',
				dest: '<%= yeoman.dist %>/styles',
				cwd: '.temp/concat'
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	/*grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');*/

	// 'clean:temp', 'clean:dist', 'copy:dist','copy:styles',
	// Default task(s).
	grunt.registerTask('default', ['jshint', 'connect:livereload', 'watch']);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:server',
		'concat',
		'ngmin',
		'uglify',
		'usemin',
		'htmlmin',
		'copy:styles'
	]);

};