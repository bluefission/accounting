function TableNameViewModel(view) {
	this.TableNameView = view;
    this.TableNameData = {};
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

TableNameViewModel.prototype.Start = function() {
	this.GetTableNamesAsync();
};
TableNameViewModel.prototype.SearchTableNames = function( keyword ) {
	PetricsApp.TableNamesFindAsync(keyword, this.OnTableNamesRetrieved.bind(this) )
};

TableNameViewModel.prototype.LoadData = function() {
    Petrics.SDK.Models.SpeciesKind.cctor();
    
    PetricsApp.TableNameAspectCategoriesGetAsync(null, true, false, 0, 300, this.OnAspectCategoriesRetrieved.bind(this));
};

TableNameViewModel.prototype.GetTableNamesAsync = function () {
    PetricsApp.TableNamesGetAsync(null, true, false, this.Skip, this.Take, this.OnTableNamesRetrieved.bind(this));
};

TableNameViewModel.prototype.GetForeignTableDataList1Async = function () {
    PetricsApp.TableNamesGetAsync(null, true, false, this.Skip, this.Take, this.OnForeignTableDataList1Retrieved.bind(this));
};

TableNameViewModel.prototype.GetForeignTableDataList2Async = function () {
    PetricsApp.TableNamesGetAsync(null, true, false, this.Skip, this.Take, this.OnForeignTableDataList2Retrieved.bind(this));
};

// Async Callbacks
TableNameViewModel.prototype.OnForeignTableDataList1Retrieved = function(data) {
    this.ForeignTableDataList1 = data.responseJSON.items;
    this.TableNameView.BindData();
};

TableNameViewModel.prototype.OnForeignTableDataList2Retrieved = function(data) {
    this.ForeignTableDataList2 = data.responseJSON.items;
    this.TableNameView.BindData();
};

TableNameViewModel.prototype.OnTableNamesRetrieved = function(data, status) {
	try {
		data = data.responseJSON;
		
        //this.TableNames = data.items
        this.TableNameData = data;

	    this.TableNameView.BindData();
    } catch( ex ) {
    	console.log(ex);
    }
};