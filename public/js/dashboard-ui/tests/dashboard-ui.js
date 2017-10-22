QUnit.module('Dashboard UI', {
	before: function() {
		// prepare something once for all tests
	},
	beforeEach: function() {
		// prepare something before each test
		DashboardUI.init();
	},
	afterEach: function() {
		// clean up after each test
	},
	after: function() {
		// clean up once after all tests are done
	}
});

// QUnit.test('base64 encode', function( assert ) {
// 	assert.equal();
// });