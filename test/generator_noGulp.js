var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var support = require('./support')

var consts = support.constants;

describe('The generator', function() {

	describe('without grunt', function() {

		before(function(done) {

			helpers.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, './tmp'))
				.withPrompts({
					appname: consts.appName,
					bootstrap: true,
					useGulp: false
				})
				.withOptions({
					docker: true
				})
				.on('end', done);
		});

		describe('gulpfile.js', function() {
			it('is not generated', function() {
				assert.noFile(support.appPath('gulpfile.js'));
			});
		});

		describe('package.json', function() {
			it('is generated', function() {
				assert.file(support.appPath('package.json'));
			});

			it('does not load bootstrap as a dependency', function() {
				assert.noFileContent(support.appPath('package.json'), /bootstrap: \^[\d]\.[\d]\.[\d]/);
			});
		});

		describe('the layout file', function() {

			var layoutFile = support.appPath('Views/Shared/_Layout.cshtml');

			it('is generated', function() {
				assert.file(layoutFile);
			});

			it('loads Bootstrap from the CDN', function() {
				assert.fileContent(layoutFile, /href="https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/[\d]\.[\d]\.[\d]\/css\/bootstrap\.min\.css"/);
				assert.fileContent(layoutFile, /src="https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/[\d]\.[\d]\.[\d]\/js\/bootstrap\.min\.js"/);
			});
		});

		describe('the docker file', function() {

			var dockerFile = support.appPath('Dockerfile')

			it('does not install node', function() {
				assert.noFileContent(dockerFile, 'RUN apt-get install -y nodejs')
			});

			it('does not run gulp', function() {
				assert.noFileContent(dockerFile, 'RUN gulp');
			});

		});
	});
});