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
