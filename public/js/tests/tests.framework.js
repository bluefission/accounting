QUnit.module('Site View Model', {
	before: function() {
		SiteController.init();
	},
	beforeEach: function() {
		// prepare something before each test
	},
	afterEach: function() {
		// clean up after each test
	},
	after: function() {
		// clean up once after all tests are done
	}
});
QUnit.test('login validation user and pass', function( assert ) {
	assert.equal(SiteViewModel.Validate("user", "pass"), String.Empty, "Passed!");
});
QUnit.test('login validation no user', function( assert ) {
	assert.notEqual(SiteViewModel.Validate("", "pass"), String.Empty, "Passed!");
});
QUnit.test('login validation no pass', function( assert ) {
	assert.notEqual(SiteViewModel.Validate("user", ""), String.Empty, "Passed!");
});
QUnit.test('login validation no user or pass', function( assert ) {
	assert.notEqual(SiteViewModel.Validate("", ""), String.Empty, "Passed!");
});
