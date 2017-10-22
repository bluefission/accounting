// Mock Dashboard UI
DashboardUI = {
	notice: function(message, type) {},
	clearDialogs: function() {},
	dialog: function(message) {},
	navigate: function(location) { console.log("navigating to " + location);}
}; 

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
// var message = SiteViewModel.LoginAsync('foo', 'bar');
// console.log(message);

/*
QUnit.test( "assert.async() test", function( assert ) {
  var done = assert.async();
  var input = $( "#test-input" ).focus();
  setTimeout(function() {
    assert.equal( document.activeElement, input[0], "Input was focused" );
    done();
  });
});
*/

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

QUnit.module('Product SDK', {
	before: function() {
		// prepare something once for all tests
		System.Guid.cctor();
		this.product = {
			product_id: null
			// product_id: System.Guid.NewGuid()
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

QUnit.test("Get Products", function( assert) {
  	var done = assert.async();

	results = PetricsApp.ProductsGetAsync(null, true, false, 0, 200, function(data, status) {
		try {
			data = data.responseJSON;
			console.log(data);
	    } catch( ex ) {
	    	console.log(ex);
	    }

		this.product = data.items[0];
		assert.notEqual(data.items.length, 0, "Passed!");
    	done();
	    return data;
    });
});

QUnit.module('Product SDK Details', {
	before: function() {
		// prepare something once for all tests
		System.Guid.cctor();
		this.product = {
			product_id: null
		};
	},
	beforeEach: function() {
		// prepare something before each test
		if ( this.product.product_id !== null ) return;
		PetricsApp.ProductsGetAsync(null, true, false, 0, 1, function(data, status) {
			try {
				data = data.responseJSON;
				console.log(data);
		    } catch( ex ) {
		    	console.log(ex);
		    }

			this.product = data.items[0];
		}.bind(this));
	},
	afterEach: function() {
		// clean up after each test
	},
	after: function() {
		// clean up once after all tests are done
	}
});

QUnit.test("Get Ingredients", function( assert ) {
  	var done = assert.async();
  	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.product.product_id) || this.product.product_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.ProductIngredientsGetAsync(this.product.product_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Ingredients found");
    		done();
	    });

	}.bind(this), 300);
});

QUnit.test("Get Nutrition Facts", function( assert) {
  	var done = assert.async();
	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.product.product_id) || this.product.product_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.ProductNutritionFactsGetAsync(this.product.product_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Nutrition Facts found");
    		done();
	    });

	}.bind(this), 1000);
});
QUnit.test("Get Serving Sizes", function( assert) {
  	var done = assert.async();
	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.product.product_id) || this.product.product_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.ProductServingSizesGetAsync(this.product.product_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Serving Sizes found");
    		done();
	    });

	}.bind(this), 300);
});
QUnit.test("Get Calories", function( assert) {
  	var done = assert.async();
	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.product.product_id) || this.product.product_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.ProductCaloriesGetAsync(this.product.product_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Calorie entries found");
    		done();
	    });

	}.bind(this), 300);
});
QUnit.test("Get Product Directions", function( assert) {
  	var done = assert.async();
	setTimeout(function() {
	  	if ( System.Guid.Empty.Equals(this.product.product_id) || this.product.product_id == null) {
	  		console.log('oops, not ready');
	  	}
		PetricsApp.ProductDirectionsGetAsync(this.product.product_id, function(data) {
			try {
				data = data.responseJSON;
		    } catch( ex ) {
		    	console.log(ex);
		    }
		    assert.notEqual(data.items.length, 0, data.items.length+" Directions found");
    		done();
	    });

	}.bind(this), 300);
});
QUnit.test("Get Product Types", function( assert) {
  	var done = assert.async();
	PetricsApp.ProductTypesGetAsync(null, true, false, 0, 200, function(data, status) {
		try {
			data = data.responseJSON;
			console.log(data);
	    } catch( ex ) {
	    	console.log(ex);
	    }
		assert.notEqual(data.items.length, 0, data.items.length+" Types found");
    	done();
    });
});

QUnit.test("Get Flavors", function( assert) {
  	var done = assert.async();
	PetricsApp.FlavorsGetAsync(null, true, false, 0, 200, function(data, status) {
		try {
			data = data.responseJSON;
			console.log(data);
	    } catch( ex ) {
	    	console.log(ex);
	    }
		assert.notEqual(data.items.length, 0, data.items.length+" Flavors found");
    	done();
    });
});

// QUnit.test( "Commands inaccessible while logged out", function(assert) {
// 	assert.notOk(false, "Passed!");
// });

/*
QUnit.assert.mod2 = function( value, expected, message ) {
    var actual = value % 2;
    this.pushResult( {
        result: actual === expected,
        actual: actual,
        expected: expected,
        message: message
    } );
};

QUnit.test( "mod2", function( assert ) {
    assert.expect( 2 );

    assert.mod2( 2, 0, "2 % 2 == 0" );
    assert.mod2( 3, 1, "3 % 2 == 1" );
});
*/