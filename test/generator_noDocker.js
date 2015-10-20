var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var support = require('./support')

var consts = support.constants;

describe('The generator', function() {

	describe('without docker', function() {

		before(function(done) {

			helpers.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, './tmp'))
				.withPrompts({
					appname: consts.appName,
					bootstrap: true,
					useGulp: true
				})
				.withOptions({
					docker: false
				})
				.on('end', done);
		});

		it('does not copy the docker file', function() {

			assert.noFile(support.appPath('Dockerfile'));

		});
	});
});