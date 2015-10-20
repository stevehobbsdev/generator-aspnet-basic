var path = require('path');

module.exports = {
	constants: {
		appName: 'Test App',
		expectedNamespace: 'Test_App',
		expectedPackageName: 'Test_App'
	},
	
	appPath: function(p) {
		return path.join(__dirname, 'tmp', this.constants.appName, p);
	}
}