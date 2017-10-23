function UserViewModel(view) {
	this.UserView = view;
    this.UserData = {};
	this.CurrentSubData = [];
    this.ForeignTableDataList1 = [];
    this.ForeignTableDataList2 = [];

    this.Skip = 0;
    this.Take = 100;

	// Object.defineProperty(this, 'Text_Sample', {
 //        get: function()
 //        {
 //            return PetricsApp.GetLocalizedText(I18NToken.NewToken_DeclareMe, "Sample");
 //        }
 //    });
}

UserViewModel.prototype.Start = function() {
	this.GetUsersAsync();
};
UserViewModel.prototype.SearchUsers = function( keyword ) {
	AccountingApp.UsersFindAsync(keyword, this.OnUsersRetrieved.bind(this) );
};

UserViewModel.prototype.LoadData = function() {
    AccountingApp.UserAspectCategoriesGetAsync(0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

UserViewModel.prototype.GetUsersAsync = function () {
    AccountingApp.UsersGetAsync(this.Skip, this.Take, this.OnUsersRetrieved.bind(this));
};

UserViewModel.prototype.GetForeignTableDataList1Async = function () {
    AccountingApp.UsersGetAsync(this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

UserViewModel.prototype.GetForeignTableDataList2Async = function () {
    AccountingApp.UsersGetAsync(this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
UserViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON.items;
    this.UserView.BindData();
};

UserViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.UserView.BindData();
};

UserViewModel.prototype.OnUsersRetrieved = function(data, status) {
	try {
		data = data.responseJSON;
		
        //this.Users = data.items
        this.UserData = data;

	    this.UserView.BindData();
    } catch( ex ) {
    	console.log(ex);
    }
};