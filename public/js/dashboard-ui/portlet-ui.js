// Portlet UI
// Requires jQuery and BootBox

var PortletUI = {
	portletClass: '.portlet',
	portletBody: '.portlet-body',
	portletToolbar: '.portlet .tools',

	removePortlet: function( selector ) {
		$(selector).closest(portletClass).fadeOut( 500, function() {
			$(this).remove();
		});
	},
	collapsePortlet: function( selector ) {
		$(selector).closest(portletClass).find(portletBody).slideToggle( 200 );
	},
	init: function() {
		// Portlet controls
		$(portletToolbar+' .collapse').live( function( e ) {
			this.collapsePortlet( this );
		});

		$(portletToolbar+' .remove').live( function( e ) {
			var portlet = this;
			Dashboard.confirm("Are you sure you want close this window?", function(result) {
	        	if ( result ) {
					this.removePortlet( portlet );
				}
	        }); 
		});
	}
}