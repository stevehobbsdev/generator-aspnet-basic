var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);
	},

	prompting: function() {

		var done = this.async();

		this.prompt([{
				/* Prompts and options here */
				type: 'input',
				name: 'appname',
				message: 'What\'s the name of your app?',
				default: this.appname
			}, 
			{
				type: 'confirm',
				name: 'bootstrap',
				message: 'Include Twitter Bootstrap support?'
			}], function(answers) {
			
				this.appname = answers.appname;
				this.bootstrap = answers.bootstrap;

			done();

		}.bind(this));
	},

	copyFiles: function() {

		this.template('Startup.cs', 'Startup.cs');
		this.template('_package.json.tpl', 'package.json');
		this.template('_project.json', 'project.json');
		this.template('_gitignore', '.gitignore');
		
		this.template('HomeController.cs', this.destinationPath('Controllers/HomeController.cs'));
		this.template('_ViewStart.cshtml', this.destinationPath('Views/_ViewStart.cshtml'));

		this.mkdir('wwwroot');

		if(this.bootstrap) {
			this.template('_Layout_bootstrap.cshtml', this.destinationPath('Views/Shared/_Layout.cshtml'));
			this.template('Index_bootstrap.cshtml', this.destinationPath('Views/Home/Index.cshtml'));
			this.template('_gulpfile_bootstrap.js', 'gulpfile.js');
		}
		else {
			this.template('_Layout.cshtml', this.destinationPath('Views/Shared/_Layout.cshtml'));
			this.template('Index.cshtml', this.destinationPath('Views/Home/Index.cshtml'));
		}
	},

	installDependencies: function() {

		this.npmInstall();

	},

	end: function() {

		this.log('\r\n');
		this.log('Build commands:');
		this.log(chalk.green('dnu restore') + '\tto restore packages');
		this.log(chalk.green('dnu build') + '\tto build the project');
		this.log(chalk.green('dnx . web') + '\tto run the project on ' + chalk.green('http://localhost:5000'));

	}
});