function OrderViewModel(view) {
	this.OrderView = view;
    this.OrderData = {};
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

OrderViewModel.prototype.Start = function() {
	this.GetOrdersAsync();
};
OrderViewModel.prototype.SearchOrders = function( keyword ) {
	AccountingApp.OrdersFindAsync(keyword, this.OnOrdersRetrieved.bind(this) );
};

OrderViewModel.prototype.LoadData = function() {
    AccountingApp.OrderAspectCategoriesGetAsync(0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

OrderViewModel.prototype.GetOrdersAsync = function () {
    AccountingApp.OrdersGetAsync(this.Skip, this.Take, this.OnOrdersRetrieved.bind(this));
};

OrderViewModel.prototype.GetForeignTableDataList1Async = function () {
    AccountingApp.OrdersGetAsync(this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

OrderViewModel.prototype.GetForeignTableDataList2Async = function () {
    AccountingApp.OrdersGetAsync(this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
OrderViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON.items;
    this.OrderView.BindData();
};

OrderViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.OrderView.BindData();
};

OrderViewModel.prototype.OnOrdersRetrieved = function(data, status) {
	try {
		data = data.responseJSON;
		
        //this.Orders = data.items
        this.OrderData = data;

	    this.OrderView.BindData();
    } catch( ex ) {
    	console.log(ex);
    }
};