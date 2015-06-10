var generators = require('yeoman-generator');
var chalk = require('chalk');
var util = require('../util');

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);

		this.option('docker', {
			desc: 'If specified, a Dockerfile is generated for the app, enabling the app to be used inside a Docker container',
			type: 'Boolean',
			defaults: false
		});
	},

	prompting: function() {

		var done = this.async();

		this.prompt([{
				/* Prompts and options here */
				type: 'input',
				name: 'appname',
				message: 'What\'s the name of your app?',
				default: this.appname
			}, {
				type: 'confirm',
				name: 'useGulp',
				message: 'Use the Gulp build system?'
			},
			{
				type: 'confirm',
				name: 'bootstrap',
				message: 'Include Twitter Bootstrap support?'
			}], function(answers) {
			
				this.appname = answers.appname;

				var symbol = util.symbolise(this.appname);

				this.namespace = symbol;
				this.packageName = symbol;
				this.bootstrap = answers.bootstrap;
				this.useGulp = answers.useGulp;
				
				this.log('\r\n');
				this.log('Setting the application namespace to ' + chalk.green(this.namespace));
				this.log('\r\n');

			done();

		}.bind(this));
	},

	selectDocker: function() {

		this.useDocker = this.options.docker;

	},

	copyFiles: function() {

		this.template('Startup.cs', 'Startup.cs');
		this.template('_package.json.tpl', 'package.json');
		this.template('_project.json', 'project.json');
		this.template('_gitignore', '.gitignore');
		
		this.template('HomeController.cs', this.destinationPath('Controllers/HomeController.cs'));
		this.template('_ViewStart.cshtml', this.destinationPath('Views/_ViewStart.cshtml'));

		this.mkdir('wwwroot');

		if(this.useGulp) {
			this.template('_gulpfile.js', 'gulpfile.js');
		}

		if(this.bootstrap) {
			this.template('_Layout_bootstrap.cshtml', this.destinationPath('Views/Shared/_Layout.cshtml'));
			this.template('Index_bootstrap.cshtml', this.destinationPath('Views/Home/Index.cshtml'));		
		}
		else {
			this.template('_Layout.cshtml', this.destinationPath('Views/Shared/_Layout.cshtml'));
			this.template('Index.cshtml', this.destinationPath('Views/Home/Index.cshtml'));
		}

		if(this.useDocker) {
			this.template('_Dockerfile', this.destinationPath('Dockerfile'));
		}
	},

	installDependencies: function() {

		this.npmInstall();

	},

	end: function() {

		this.log('\r\n');

		this.log('This site uses ' + chalk.blue('Asp.Net vNext') + ', which requires the build tools to be installed');
		this.log('Please read ' + chalk.yellow('https://github.com/aspnet/home') + ' for more information')

		this.log('\r\n');
		this.log('Build commands:');
		this.log(chalk.green('dnu restore') + '\tto restore packages');
		this.log(chalk.green('dnu build') + '\tto build the project');
		this.log(chalk.green('dnx . web') + '\tto run the project on ' + chalk.green('http://localhost:5000'));

		if(this.useGulp) {

			this.log('\r\n');
			this.log('Gulp commands: ' + chalk.blue('Requires global gulp to be installed'));
			this.log(chalk.green('gulp') + '\tRun default gulp task');

			if(this.bootstrap) {
				this.log(chalk.green('gulp bootstrap') + '\tCopy Twitter Bootstrap assets');
			}
		}

		if(this.useDocker) {
			this.log('\r\n');
			this.log('To build a new ' + chalk.green('docker image') + ', use:');
			this.log('sudo docker build -t ' + this.packageName + ' .\r\n');
			this.log('To run the image, use:');
			this.log('sudo docker run -t -d p 80:5001 ' + this.packageName);
		}

	}
});