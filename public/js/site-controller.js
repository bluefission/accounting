 SiteController = {
	ShortName: "Accounts Manager",
	VersionNumber: "1.0",
	pageController: null,
	timer: null,
	ViewModel: SiteViewModel,
	init: function() {
		console.log("Initiating "+this.ShortName);
	},
	ShowToast: function(message) {
		HUD.ShowToast(message);
	},
	DisplayNotification: function(title, message) {
		DashboardUI.alert(message); // Should maybe abstract this through HUD?
	},
	UnRegisterForPushNotifications: function() {},
	OnLoggedOn: function() {
		// HUD.Dismiss();
		// this.panelAccount.html("<span>Welcome Back! <a href='#' id='settings-btn'><i class='fa fa-cog'></i> Settings</a></span> | <a href='#' id='log-out'><i class='fa fa-sign-out'></i> Logout</a></span>");
		// console.log("Loading home screen");
		// controller = new HomeController();
		// DashboardUI.home = 'home.html';
		// this.navigate(controller);
	},
	OnLoggedOff: function() {
		// controller = new SplashController();
		// DashboardUI.home = 'start.html';
		// this.navigate(controller);
	},
	OnOutDated: function(reason) {},
	OnAccountRefreshed: function() {},
	NavigateToFirstScreen: function () {
		DashboardUI.goHome();
	},
	navigate: function( controller ) {
		this.pageController = null;
		if ( typeof controller === 'string' ) {
			DashboardUI.navigate( controller );
		} else {
			this.pageController = controller;
			DashboardUI.navigate( controller.DOCUMENT );
		}
	},
	PromptLogOut: function() {
		DashboardUI.confirm("Are you sure you want to log out?", function( response ) {
			if (response == true) {
				PetricsApp.LogOff(true);
			}
		});
	},
	DetectDevice: function() {
	  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	      // Windows Phone must come first because its UA also contains "Android"
	    if (/windows phone/i.test(userAgent)) {
	        return "Windows Phone";
	    }

	    if (/android/i.test(userAgent)) {
	        return "Android";
	    }

	    // iOS detection from: http://stackoverflow.com/a/9039885/177710
	    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	        return "iOS";
	    }

	    return "unknown";
	},
	DoLogin: function() {
        this.LoginEndEditing();

        if (!this.IsValid())
        {
			this.LoginStartEditing();
            return; // pre-validate before we start processing
        }

        HUD.Show("Logging In"); // TODO: I18N

        this.ViewModel.LoginAsync(this.txtName.val(), this.txtPassword.val());

    },
    HandleLogin: function( response ) {
        if(response.success)
        {
            // HUD.Dismiss();
            // PetricsAppDelegate.Current.LaunchPrimary();
            HUD.ShowSuccessWithStatus("Logged In");
            if ( PetricsApp.CurrentAccount.account_id === null ) {
            	this.timer = setInterval( (function() { 
            		console.log("Delayed login to load data");
					clearTimeout(this.timer);
					this.OnLoggedOn();
				})(this),2000);
				return;
            }
            console.log("Logging in");
	        this.OnLoggedOn();
        }
        else
        {
            HUD.Dismiss();
			this.LoginStartEditing();
            HUD.ShowErrorWithStatus(response.message, 2800);
        }
    },
    IsValid: function() {
        errorMessage = this.ViewModel.Validate(this.txtName.val(), this.txtPassword.val());
        if (!String.IsNullOrEmpty(errorMessage))
        {
            HUD.ShowErrorWithStatus(errorMessage, 2800);
            return false;
        }
        return true;
    },
};
