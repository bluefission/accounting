HUD = {
	ShowErrorWithStatus: function( message, timeout ) {
		// timeout doesn't matter here yet, it's globally automatic
		DashboardUI.notice(message, 'error');
	},
	ShowSuccessWithStatus: function( message, timeout ) {
		// timeout doesn't matter here yet, it's globally automatic
		DashboardUI.notice(message);
	}, 
	Dismiss: function() {
		DashboardUI.clearDialogs();	
	},
    Show: function(message) {
    	DashboardUI.dialog('<div class="text-center"><i class="fa fa-spin fa-spinner"></i>&nbsp;'+message+'</div>');
    },
    ShowToast: function(message, centered, timeout) {
		DashboardUI.notice(message);
    },
    ShowTopToast: function() {
    	//...
    },
    ShowModal: function() {
    	//...
    }
};