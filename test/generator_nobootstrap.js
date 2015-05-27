var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

var consts = {
	appName: 'Test App',
	expectedNamespace: 'Test_App',
	expectedPackageName: 'Test_App'
};

describe('The generator', function() {

	describe('without bootstrap', function() {

		before(function(done) {

			helpers.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, './tmp'))
				.withPrompts({
					appname: consts.appName,
					bootstrap: false,
					useGulp: true
				})
				.on('ready', function(generator) {

				})
				.on('end', done);
		});

		describe('package.json', function() {
			it('is generated', function() {
				assert.file('package.json');
			});

			it('does not load bootstrap as a dependency', function() {
				assert.noFileContent('package.json', /bootstrap: \^[\d]\.[\d]\.[\d]/);
			});
		});

		describe('gulpfile.js', function() {
			it('is generated', function() {
				assert.file('gulpfile.js');
			});

			it('does not contain the bootstrap task', function() {
				assert.noFileContent('gulpfile.js', 'gulp\.task\(\'bootstrap\', ');
			})

			it('contains a default gulp task', function() {
				assert.fileContent('gulpfile.js', /gulp\.task\('default', /);
			});
		});

		describe('the layout file', function() {

			var layoutFile = 'Views/Shared/_Layout.cshtml';

			it('is generated', function() {
				assert.file(layoutFile);
			});

			it('does not load bootstrap', function() {
				assert.noFileContent(layoutFile, 'href="\/lib\/bootstrap\/css\/bootstrap\.min\.css"');
				assert.noFileContent(layoutFile, '<script src="lib\/bootstrap\/js\/bootstrap\.min\.js"');
			});
		});

		describe('the index file', function() {

			var indexFile = 'Views/Home/Index.cshtml';

			it('is generated', function() {
				assert.file(indexFile);
			});

			it('does not contain the bootstrap styling', function() {
				assert.noFileContent(indexFile, '<div class="col-md-12">');
			});

		});
	});
});