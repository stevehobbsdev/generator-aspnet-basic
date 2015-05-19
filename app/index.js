var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);
	},

	prompting: function() {

		var done = this.async();

		this.prompt([
				/* Prompts and options here */
			], function(answers) {
			
			done();

		}.bind(this));
	},

	copyFiles: function() {
	}
});