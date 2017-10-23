SiteViewModel = {
	get Text_ResetPassword() {
		return this.PetricsApp.GetLocalizedText(I18NToken.Login_ResetPassword, "Reset Password");
	},
	get Text_Title() {
		return this.PetricsApp.GetLocalizedText(I18NToken.Login_Title, "Welcome Back");
	},
	get Text_ForgotPassword() {
		return this.PetricsApp.GetLocalizedText(I18NToken.Login_ForgotPassword, "Forgot Your Password?");
	},
	get Text_SignIn() {
		return this.PetricsApp.GetLocalizedText(I18NToken.Login_SignIn, "Sign In");
	},
	get Text_MissingUserName() {
		return PetricsApp.GetLocalizedText(I18NToken.Login_MissingUser, "You must provide your email");
	},
	get Text_LoggingIn() {
		return PetricsApp.GetLocalizedText(I18NToken.Login_LoggingIn, "Logging In..");
	},
	get Text_MissingUserPassword() {
        return PetricsApp.GetLocalizedText(I18NToken.Login_MissingPassword, "You must provide a password");
	},
	Validate: function(userName, password)
    {
        if (String.IsNullOrEmpty(userName))
        {
            return this.Text_MissingUserName;
        }
        if (String.IsNullOrEmpty(password))
        {
            return this.Text_MissingUserPassword;
        }
        return String.Empty;
    },
    LoginAsync: function(userName, password)
    {
        validationMessage = this.Validate(userName, password);
        if(!String.IsNullOrEmpty(validationMessage))
        {
            return {
                success: false,
                message: validationMessage
            };
        }
        else
        {
            try
            {
                response = PetricsApp.LoginAsyncSafe({
                    password: password,
                    user: userName
                });
                return response;
            } catch(ex) {
                return {
                    success: false,
                    message: ex
                };
            }
        }
    },
    Timezones: ["Dateline Standard Time","Hawaiian Standard Time","Alaskan Standard Time","Pacific Standard Time","Pacific Standard Time (Mexico)","Mountain Standard Time","Mountain Standard Time (Mexico)","US Mountain Standard Time","Canada Central Standard Time","Central America Standard Time","Central Standard Time","Central Standard Time (Mexico)","Eastern Standard Time","SA Pacific Standard Time","US Eastern Standard Time","Venezuela Standard Time","Atlantic Standard Time","Central Brazilian Standard Time","Pacific SA Standard Time","SA Western Standard Time","Paraguay Standard Time","Newfoundland Standard Time","E. South America Standard Time","Greenland Standard Time","Montevideo Standard Time","SA Eastern Standard Time","Argentina Standard Time","Mid-Atlantic Standard Time","Azores Standard Time","Cabo Verde Standard Time","GMT Standard Time","Greenwich Standard Time","Morocco Standard Time","Central Europe Standard Time","Central European Standard Time","Romance Standard Time","W. Central Africa Standard Time","W. Europe Standard Time","Namibia Standard Time","E. Europe Standard Time","Egypt Standard Time","FLE Standard Time","GTB Standard Time","Israel Standard Time","Jordan Standard Time","Middle East Standard Time","South Africa Standard Time","Syria Standard Time","Turkey Standard Time","Arab Standard Time","Arabic Standard Time","E. Africa Standard Time","Kaliningrad Standard Time","Iran Standard Time","Russian Standard Time","Arabian Standard Time","Azerbaijan Standard Time","Caucasus Standard Time","Georgian Standard Time","Mauritius Standard Time","Afghanistan Standard Time","West Asia Standard Time","Pakistan Standard Time","India Standard Time","Sri Lanka Standard Time","Nepal Standard Time","Ekaterinburg Standard Time","Central Asia Standard Time","Bangladesh Standard Time","Myanmar Standard Time","N. Central Asia Standard Time","SE Asia Standard Time","North Asia Standard Time","China Standard Time","Singapore Standard Time","Taipei Standard Time","W. Australia Standard Time","Ulaanbaatar Standard Time","North Asia East Standard Time","Korea Standard Time","Tokyo Standard Time","AUS Central Standard Time","Cen. Australia Standard Time","Yakutsk Standard Time","AUS Eastern Standard Time","E. Australia Standard Time","Tasmania Standard Time","West Pacific Standard Time","Vladivostok Standard Time","Central Pacific Standard Time","Magadan Standard Time","Fiji Standard Time","New Zealand Standard Time","Tonga Standard Time","Samoa Standard Time"]
};