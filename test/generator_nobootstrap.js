var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var support = require('./support')

var consts = support.constants;

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
				.withOptions({
					docker: true
				})
				.on('ready', function(generator) {

				})
				.on('end', done);
		});

		describe('package.json', function() {
			it('is generated', function() {
				assert.file(support.appPath('package.json'));
			});

			it('does not load bootstrap as a dependency', function() {
				assert.noFileContent(support.appPath('package.json'), /bootstrap: \^[\d]\.[\d]\.[\d]/);
			});
		});

		describe('gulpfile.js', function() {
			it('is generated', function() {
				assert.file(support.appPath('gulpfile.js'));
			});

			it('does not contain the bootstrap task', function() {
				assert.noFileContent(support.appPath('gulpfile.js'), 'gulp\.task\(\'bootstrap\', ');
			})

			it('contains a default gulp task', function() {
				assert.fileContent(support.appPath('gulpfile.js'), /gulp\.task\('default', /);
			});
		});

		describe('the layout file', function() {

			var layoutFile = support.appPath('Views/Shared/_Layout.cshtml');

			it('is generated', function() {
				assert.file(layoutFile);
			});

			it('does not load bootstrap', function() {
				assert.noFileContent(layoutFile, 'href="\/lib\/bootstrap\/css\/bootstrap\.min\.css"');
				assert.noFileContent(layoutFile, '<script src="lib\/bootstrap\/js\/bootstrap\.min\.js"');
			});
		});

		describe('the index file', function() {

			var indexFile = support.appPath('Views/Home/Index.cshtml');

			it('is generated', function() {
				assert.file(indexFile);
			});

			it('does not contain the bootstrap styling', function() {
				assert.noFileContent(indexFile, '<div class="col-md-12">');
			});

		});
	});
});