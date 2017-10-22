// Mock Dashboard UI
DashboardUI = {
	notice: function(message, type) {},
	clearDialogs: function() {},
	dialog: function(message) {},
	navigate: function(location) { console.log("navigating to " + location);}
}; 