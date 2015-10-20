var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var support = require('./support');

var consts = support.constants;

describe('The generator', function() {

	describe('with all options enabled', function() {

		before(function(done) {

			helpers.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, './tmp'))
				.withPrompts({
					appname: consts.appName,
					bootstrap: true,
					useGulp: true
				})
				.withOptions({
					docker: true
				})
				.on('ready', function(generator) {

				})
				.on('end', done);
		});

		describe('the startup file', function() {
			it('is generated', function() {
				assert.file(support.appPath('Startup.cs'));
			});

			it('has the correct namespace', function() {
				assert.fileContent(support.appPath('Startup.cs'), 'namespace ' + consts.expectedNamespace)
			});
		});

		describe('package.json', function() {
			it('is generated', function() {
				assert.file(support.appPath('package.json'));
			});

			it('has the right app name', function() {
				assert.fileContent(support.appPath('package.json'), '"name": "' + consts.expectedPackageName + '"');
			});
		});

		describe('HomeController', function() {
			it('is generated', function() {
				assert.file(support.appPath('Controllers/HomeController.cs'));
			});

			it('has the right namespace', function() {
				assert.fileContent(support.appPath('Controllers/HomeController.cs'), 'namespace ' + consts.expectedNamespace);
			});
		});

		describe('gulpfile.js', function() {
			it('is generated', function() {
				assert.file(support.appPath('gulpfile.js'));
			});

			it('contains the bootstrap task', function() {
				assert.fileContent(support.appPath('gulpfile.js'), 'gulp\.task\(\'bootstrap\', ');
			})
		});
		
		describe('project.json', function() {
			
			it('is generated', function() {
				assert.file(support.appPath('project.json'))
			})
						
			it('has the right tooling namespace', function() {
				assert.fileContent(support.appPath('project.json'), '"defaultNamespace": "' + consts.expectedNamespace + '"');
			});
		})

		describe('other supporting files', function() {

			it('generates .gitignore', function() {
				assert.file(support.appPath('.gitignore'));
			});

			it('generates the viewstart file', function() {
				assert.file(support.appPath('Views/_ViewStart.cshtml'));
			});
		});

		describe('the layout file', function() {

			var layoutFile = support.appPath('Views/Shared/_Layout.cshtml');

			it('is generated', function() {
				assert.file(layoutFile);
			});

			it('loads Bootstrap from the local source', function() {
				assert.fileContent(layoutFile, 'href="\/lib\/bootstrap\/css\/bootstrap\.min\.css"');
				assert.fileContent(layoutFile, '<script src="lib\/bootstrap\/js\/bootstrap\.min\.js"');
			});
		});

		describe('the index file', function() {

			var indexFile = support.appPath('Views/Home/Index.cshtml');

			it('is generated', function() {
				assert.file(indexFile);
			});

			it('contains the bootstrap styling', function() {
				assert.fileContent(indexFile, '<div class="container">');
			});

		});
		
		describe('the web.config file', function() {
			var file = support.appPath('wwwroot/web.config');
			
			it ('is generated', function() {
				assert.file(file);
			})
		})

		describe('the docker file', function() {

			var dockerFile = support.appPath('Dockerfile');

			it('is generated', function() {
				assert.file(dockerFile);
			});

			it('has the right app name', function() {
				assert.fileContent(dockerFile, 'ADD . \/' + consts.expectedPackageName);
			});

			it('has the right working dir', function() {
				assert.fileContent(dockerFile, 'WORKDIR \/' + consts.expectedPackageName);
			})

			describe('with gulp enabled', function() {

				it('installs node', function() {
					assert.fileContent(dockerFile, 'RUN apt-get install -y nodejs');
				});

				it('runs gulp', function() {
					assert.fileContent(dockerFile, 'RUN gulp');
				});
				
			});
		});
	});
});