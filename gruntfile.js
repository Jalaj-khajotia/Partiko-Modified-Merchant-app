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
				src: ['app/**/*.js', '!app/lib/**/*.js'],
				dest: '<%= yeoman.dist %>/scripts.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
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

		concurrent: {
			server: [
				'copy:styles'
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



		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
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
							connect.static('app')
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
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js',
					'<%= yeoman.app %>/scripts/{,*/}*/{,*/}*.js'
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
				files: ['gruntfile.js', 'app/*.js', 'app/*.html',
					'app/{,*/}*/{,*/}*.js', 'app/{,*/}*/{,*/}*.html',
					'app/{,*/}*.js', 'app/{,*/}/{,*/}/{,*/}*.js',
					'app/{,*/}/{,*/}/{,*/}*.html'
				]
			}
		},

		clean: {
			temp: {
				src: ['tmp']
			},
			dist: {
				src: ['dist']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'lib/{,*/}*.js',
						'*.js',
						'lib/{,*/}/{,*/}*.css',
						'lib/{,*/}*.css',
						'lib/{,*/}/{,*/}*.js',
						'Starter/{,*/}/{,*/}*.js',
						'Starter/{,*/}/{,*/}*.html',
						'*.html',
						'views/{,*/}*.html',
						'bower_components/**/*',
						'images/{,*/}*.{webp}',
						'fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: 'app/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
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
	grunt.registerTask('default', ['jshint','connect:livereload', 'watch']);

};