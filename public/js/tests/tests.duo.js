QUnit.module('Base 64');
QUnit.test('base64 encode', function( assert ) {
	assert.equal(Base64.encode('test'), 'dGVzdA==', "Passed!");
});
QUnit.test('base64 encode', function( assert ) {
	assert.equal(Base64.decode('dGVzdDI='), 'test2', "Passed!");
});

QUnit.module('Duocode Strings');
QUnit.test('String.Empty', function(assert) {
	assert.equal(String.Empty, "", "Passed!");
});

QUnit.module('SDK Bridge');
QUnit.test('md5', function(assert) {
	assert.equal(PetricsSDKBridge.generateMD5Hash("foobar"), "3858f62230ac3c915f300c664312c63f", "Passed!");
});
