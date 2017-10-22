// Dashboard Module
// Requires JQuery, DashboardRecordSet

/*
	functions: 
	
 */
var DashboardModule = DashboardModule || {
	title: 'New Module',
	name: 'module',
	parent: null,
	color: '#c0c0c0',
	type: 1,
	location: '',
	form: '',
	recordSet: {},
	index: 0,
	current: {},
	init: function() {
		DashboardUI = DashboardUI || {};

		var module = this;
		$('#new').click( function() {
			module.new();
		});
		$('#save').click( function() {
			module.save();
		});
		$('#delete').click( function() {
			var deletebutton = this;
			DashboardUI.confirm("Are you sure you want to delete this item?", function(result) {
	        	if ( result ) {
					$form = $(deletebutton).closest('form');
					$form.find('input[name="action"]').val('delete');
			
					var id = $form.find('input[name="id"]').val();
					submitForm( $form );
					
					// If tabbed
					tab = $(deletebutton).closest('.tab-pane').attr('id');
					if ( tab )
						DashboardUI.removeTab(tab);
				}
	        });
			module.view( module.current );
		});
		$('#list a').live('click', function( e ) {
			e.preventDefault();
		
			module.current = $('[name="id"]').val();

			if ( module.current != $(this).attr('href') ) {
				module.current = $(this).attr('href');
				module.view();
			}
		});
	},
	new: function() {
		DashboardUI.prompt("New Item", function(result) {
			if (result === null) {
				//alert("Canceled");
			} else {
				if ( result ) {
					
				}
			}
		});
	},
	save: function() {
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
	delete: function() {
		 
	},
	view: function() {
		DashboardU.updateID( this.current );
	},
	autoSave: function () {
		DashboardUI.notice( 'Beginning Autosave' );
		if ( $(form).find('input[name="title"]').val() && activeCategory ) {
			var form = '.tab-pane.active form';
			var id = $(form).find('textarea').attr('id');

			var editor = CKEDITOR.instances[id];
			if (editor) { 
				$('#'+id).val( CKEDITOR.instances[id].getData( ) );
			}
			if ( !activeCategory ) {
				activeCategory = 'Personal';
				//addMenuItem( '#note-categories', activeCategory, activeCategory );
			}
		    var id = DashboardForm.submitForm( form, function( data ) {
				console.log('Autosave complete');
				DashboardUI.notice( 'Autosave Complete' );
			});
		}
	}
};