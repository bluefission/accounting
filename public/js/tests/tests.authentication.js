QUnit.module('Authenticated', {
	before: function() {
		// prepare something once for all tests
		this.credentials = {username:"", password: ""};
		this.credentials.username = admin_username || prompt("user");
		this.credentials.password = admin_password || prompt("pass");

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

QUnit.test( "login", function( assert ) {
  	var done = assert.async();
	SiteController.init();
	// var message = SiteViewModel.LoginAsync(this.credentials.username, this.credentials.password);
	var message = PetricsApp.LoginAsyncSafe({
        password: this.credentials.password,
        user: this.credentials.username
    });
    console.log(message);

	setTimeout(function() {
		console.log(message);
    	// assert.equal( document.activeElement, input[0], "Input was focused" );
		assert.ok( message.success, "Passed!" );
    	done();
	}, 1000);
});