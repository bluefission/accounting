// Object Form
var DashboardForm = DashboardForm || {
	formClass: 'form.async',
	labelField: '[name="name"],.nameField',
	emailField: '[name="email"],.emailField',
	idField: '[name="id"],.idField',
	id: 0,
	init: function() {
		DashboardUI = DashboardUI || {};
		DashboardResponse = DashboardResponse || {};

		var form = this;

		$(this.formClass).on('submit', function( e ) {
			e.preventDefault();
			form.id = submitForm( this, form.updateID );
		});
	},
	// Form methods
	submitForm: function( element, callback ) {
		//var content = CKEDITOR.instances.['editor'+id].getData();
		var $form = $(element).closest(this.formClass);
		var data = $form.serialize();
		var url = $form.attr('action');
		var method = $form.attr('method');

		var output = null;

		//console.log($form);

	    $.ajax({
			url: url,
			data: data,
			method: method
		}).done(function( response ) {
			var reply = DashboardResponse.parse( response );

			DashboardUI.notice( reply.status )

			if ( callback )
				callback.call( $form, reply.data );
		});
	},
	updateForm: function( data ) {
		$(this).find('input[name="id"]').val( data );
	},
	validateEmpty: function( field ) {
		value = $(field).val();
		if ( value ) 
			return true;
		else
			return false;
	},
	validateEmail: function( field ) {
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var address = $(field).val();
		if(reg.test(address) == false) {
			return false;
		} else {
			return true;
		}
	},
	validateForm: function ( element, callback ) {
		//var $form = $(element).closest(this.formClass);
		var errors = $('[rel="validate"]');
		// TODO implement
	}
};

//constructor
function ObjectForm( selector ) {
	this.formClass = selector;
}

ObjectForm.prototype = DashboardForm;
ObjectForm.prototype.constructor = ObjectForm;