QUnit.module('Dashboard Storage', {
	before: function() {
		// prepare something once for all tests
		this.date = Date();
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

QUnit.test('Set and Get', function( assert ) {
	DashboardStorage.set('test', 'value');
	assert.equal(DashboardStorage.get('test'), 'value');
});

QUnit.test('Clear value', function( assert ) {
	DashboardStorage.set('test', 'value');
	DashboardStorage.clear();
	assert.equal(DashboardStorage.get('test'), null);
});

QUnit.test('Get null of no key', function( assert ) {
	DashboardStorage.set('test', 'value');
	assert.equal(DashboardStorage.get('test2'), null);
});

QUnit.test('Save Storage', function( assert ) {
	DashboardStorage.set('savetest', this.date);
	DashboardStorage.save();
	DashboardStorage.clear();
	assert.equal(DashboardStorage.get('savetest'), null);
});

QUnit.test('Load Storage', function( assert ) {
	DashboardStorage.load();
	assert.notEqual(DashboardStorage.get('savetest'), null);
});