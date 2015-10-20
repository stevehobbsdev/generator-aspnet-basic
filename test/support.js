module.exports = {
	constants: {
		appName: 'Test App',
		expectedNamespace: 'Test_App',
		expectedPackageName: 'Test_App'
	},
	
	appPath: function(path) {
		return this.constants.appName + '/' + path
	}
}