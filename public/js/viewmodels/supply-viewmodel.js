function SupplyViewModel(view) {
    this.SupplyView = view;
    this.SupplyData = {};
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

SupplyViewModel.prototype.Start = function() {
    this.GetSuppliesAsync();
};
SupplyViewModel.prototype.SearchSupplies = function( keyword ) {
    AccountingApp.SuppliesFindAsync(keyword, this.OnSuppliesRetrieved.bind(this) );
};

SupplyViewModel.prototype.LoadData = function() {
    AccountingApp.SupplyAspectCategoriesGetAsync(0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

SupplyViewModel.prototype.GetSuppliesAsync = function () {
    AccountingApp.SuppliesGetAsync(this.Skip, this.Take, this.OnSuppliesRetrieved.bind(this));
};

SupplyViewModel.prototype.GetForeignTableDataList1Async = function () {
    AccountingApp.GetAsync(this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

SupplyViewModel.prototype.GetForeignTableDataList2Async = function () {
    AccountingApp.SuppliesGetAsync(this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
SupplyViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON;
    this.SupplyView.BindData();
};

SupplyViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.SupplyView.BindData();
};

SupplyViewModel.prototype.OnSuppliesRetrieved = function(data, status) {
    try {
        data = data.responseJSON;
        
        //this.Supplies = data.items
        this.SupplyData = data;

        this.SupplyView.BindData();
    } catch( ex ) {
        console.log(ex);
    }
};