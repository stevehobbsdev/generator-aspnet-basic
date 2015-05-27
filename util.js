
module.exports = {

	/**
	 * Strips non-symbol characters from the input string
	 * @param input The input string
	 */
	symbolise: function(input) {
		return input.replace(/[^a-zA-Z0-9_ \t]/g, '')
			.replace(/[ \t]+/g, '_');
	}

};