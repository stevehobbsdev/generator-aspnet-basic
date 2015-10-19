var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

var consts = {
	appName: 'Test App',
	expectedNamespace: 'Test_App',
	expectedPackageName: 'Test_App'
};

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
				assert.file('Startup.cs');
			});

			it('has the correct namespace', function() {
				assert.fileContent('Startup.cs', 'namespace ' + consts.expectedNamespace)
			});
		});

		describe('package.json', function() {
			it('is generated', function() {
				assert.file('package.json');
			});

			it('has the right app name', function() {
				assert.fileContent('package.json', '"name": "' + consts.expectedPackageName + '"');
			});
		});

		describe('HomeController', function() {
			it('is generated', function() {
				assert.file('Controllers/HomeController.cs');
			});

			it('has the right namespace', function() {
				assert.fileContent('Controllers/HomeController.cs', 'namespace ' + consts.expectedNamespace);
			});
		});

		describe('gulpfile.js', function() {
			it('is generated', function() {
				assert.file('gulpfile.js');
			});

			it('contains the bootstrap task', function() {
				assert.fileContent('gulpfile.js', 'gulp\.task\(\'bootstrap\', ');
			})
		});

		describe('other supporting files', function() {

			it('generates .gitignore', function() {
				assert.file('.gitignore');
			});

			it('generates a project file', function() {
				assert.file('project.json');
			});

			it('generates the viewstart file', function() {
				assert.file('Views/_ViewStart.cshtml');
			});
		});

		describe('the layout file', function() {

			var layoutFile = 'Views/Shared/_Layout.cshtml';

			it('is generated', function() {
				assert.file(layoutFile);
			});

			it('loads Bootstrap from the local source', function() {
				assert.fileContent(layoutFile, 'href="\/lib\/bootstrap\/css\/bootstrap\.min\.css"');
				assert.fileContent(layoutFile, '<script src="lib\/bootstrap\/js\/bootstrap\.min\.js"');
			});
		});

		describe('the index file', function() {

			var indexFile = 'Views/Home/Index.cshtml';

			it('is generated', function() {
				assert.file(indexFile);
			});

			it('contains the bootstrap styling', function() {
				assert.fileContent(indexFile, '<div class="container">');
			});

		});
		
		describe('the web.config file', function() {
			var file = 'wwwroot/web.config';
			
			it ('is generated', function() {
				assert.file(file);
			})
		})

		describe('the docker file', function() {

			var dockerFile = 'Dockerfile';

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