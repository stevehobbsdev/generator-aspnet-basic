var util = require('../util');
var expect = require('chai').expect;

describe('Utility library', function() {

	describe('the module name utility', function() {

		var input = 'This is a $new$ {module} name  $!"£$%^&*()';
		var expected = 'This_is_a_new_module_name_';
		var actual;

		before(function() {
			actual = util.symbolise(input);
		});

		it('should not be empty or undefined', function() {
			expect(actual).to.exist;		
		});

		it('should be as expected', function() {
			expect(actual).to.equal(expected);
		});
	});
});
