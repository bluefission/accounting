function ItemViewModel(view) {
	this.ItemView = view;
    this.ItemData = {};
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

ItemViewModel.prototype.Start = function() {
	this.GetItemsAsync();
};
ItemViewModel.prototype.SearchItems = function( keyword ) {
	AccountingApp.ItemsFindAsync(keyword, this.OnItemsRetrieved.bind(this) );
};

ItemViewModel.prototype.LoadData = function() {
    AccountingApp.ItemAspectCategoriesGetAsync(0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

ItemViewModel.prototype.GetItemsAsync = function () {
    AccountingApp.ItemsGetAsync(this.Skip, this.Take, this.OnItemsRetrieved.bind(this));
};

ItemViewModel.prototype.GetForeignTableDataList1Async = function () {
    AccountingApp.ItemsGetAsync(this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

ItemViewModel.prototype.GetForeignTableDataList2Async = function () {
    AccountingApp.ItemsGetAsync(this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
ItemViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON.items;
    this.ItemView.BindData();
};

ItemViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.ItemView.BindData();
};

ItemViewModel.prototype.OnItemsRetrieved = function(data, status) {
	try {
		data = data.responseJSON;
		
        //this.Items = data.items
        this.ItemData = data;

	    this.ItemView.BindData();
    } catch( ex ) {
    	console.log(ex);
    }
};