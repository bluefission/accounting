QUnit.module('Account SDK', {
	before: function() {
		// prepare something once for all tests
		System.Guid.cctor();
		this.account = {
			account_id: null
			// account_id: System.Guid.NewGuid()
		};

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

QUnit.test("Get Account", function( assert) {
  	var done = assert.async();

	results = PetricsApp.AccountsGetAsync(null, true, false, 0, 200, function(data, status) {
		try {
			data = data.responseJSON;
			console.log(data);
	    } catch( ex ) {
	    	console.log(ex);
	    }

		this.account = data.items[0];
		assert.notEqual(data.items.length, 0, "Passed!");
    	done();
	    return data;
    });
});

QUnit.module('Account SDK Details', {
	before: function() {
		// prepare something once for all tests
		System.Guid.cctor();
		this.account = {
			account_id: '0ab9f424-df92-4678-8ab7-68f186e1c497'
		};
	},
	beforeEach: function() {
		// prepare something before each test
		if ( this.account.account_id !== null ) return;
		PetricsApp.AccountsGetAsync(null, true, false, 0, 1, function(data, status) {
			try {
				data = data.responseJSON;
				console.log(data);
		    } catch( ex ) {
		    	console.log(ex);
		    }

			this.account = data.items[5];
		}.bind(this));
	},
	afterEach: function() {
		// clean up after each test
	},
	after: function() {
		// clean up once after all tests are done
	}
});

QUnit.test("Get Families", function( assert ) {
  	var done = assert.async();
  	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.account.account_id) || this.account.account_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.FamilyGetByAccountAsync(this.account.account_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Families found");
    		done();
	    });

	}.bind(this), 300);
});

QUnit.test("Get Account Roles", function( assert) {
  	var done = assert.async();
	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.account.account_id) || this.account.account_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.AccountRoleGetByAccountAsync(this.account.account_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Roles found");
    		done();
	    });

	}.bind(this), 1000);
});