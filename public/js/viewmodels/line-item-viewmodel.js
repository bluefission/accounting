function LineItemViewModel(view) {
	this.LineItemView = view;
    this.LineItemData = {};
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

LineItemViewModel.prototype.Start = function() {
	this.GetLineItemsAsync();
};
LineItemViewModel.prototype.SearchLineItems = function( keyword ) {
	AccountingApp.LineItemsFindAsync(keyword, this.OnLineItemsRetrieved.bind(this) );
};

LineItemViewModel.prototype.LoadData = function() {
    AccountingApp.LineItemAspectCategoriesGetAsync(0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

LineItemViewModel.prototype.GetLineItemsAsync = function () {
    AccountingApp.LineItemsGetAsync(this.Skip, this.Take, this.OnLineItemsRetrieved.bind(this));
};

LineItemViewModel.prototype.GetForeignTableDataList1Async = function () {
    AccountingApp.LineItemsGetAsync(this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

LineItemViewModel.prototype.GetForeignTableDataList2Async = function () {
    AccountingApp.LineItemsGetAsync(this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
LineItemViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON.items;
    this.LineItemView.BindData();
};

LineItemViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.LineItemView.BindData();
};

LineItemViewModel.prototype.OnLineItemsRetrieved = function(data, status) {
	try {
		data = data.responseJSON;
		
        //this.LineItems = data.items
        this.LineItemData = data;

	    this.LineItemView.BindData();
    } catch( ex ) {
    	console.log(ex);
    }
};