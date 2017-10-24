function LineItemManageController() {
	this.IDENTIFIER = "LineItemManageController"; // <LineItem>ManageController
	this.DOCUMENT = "line-item-list.html"; // <line-item>-list.html file name of view
	this.ViewModel = null;
	this.Route = {}; // set to blank object, will be the currently edited object
	var self = this;

}

LineItemManageController.prototype.onReady = function() {
	// Object below should be model of object being edited
	if (!this.Route.id) {
		this.Route = {};
	}

	this.tableList = new DashboardDatatable('#line-item-list');
	this.tableList.form = $('#line-item-edit');
	this.tableList.bindRow = this.OnObjectLoad.bind(this);
	this.tableList.bindForm = this.OnRowClick;
	this.tableList.process = this.OnObjectSave;
    this.tableList.tryDelete = this.DeleteObject;

	this.btnNew = $('#new-line-item-btn');
    this.btnDelete = $('#delete-line-item-btn');

    this.btnNew.click(function () {
        this.tableList.new();
    }.bind(this));

    this.btnDelete.click(function (e) {
        e.preventDefault();
        DashboardUI.confirm("Are you sure you want to delete these?", function (result) {
            if (result === false) {
                return false;
            }
            this.tableList.remove();
            setTimeout( (function() { 
        		console.log("Reloading");
				this.ViewModel.Start();
			}.bind(this)),1);

        }.bind(this));
    }.bind(this));

    this.ViewModel = new LineItemViewModel(this);
	this.ViewModel.Start();
};

/**
 * Handler for Elastic Search lookup from search box
 * The method referenced in the following function should be Search<LineItem>s(keyword)
 * It is used to do fast Elastic Search lookup
*/
LineItemManageController.prototype.Search = function( keyword ) {
	this.ViewModel.SearchLineItems(keyword); 
};

/**
 * Loads data called from ajax call
 * Should be invoked from the ajax callbacks
*/
LineItemManageController.prototype.BindData = function() {
	var list = this.ViewModel.LineItemData || []; // incase object member is null
	this.tableList.load(list); // sets table data as retrieved list information
	this.ReadyForm(); // Only if objects are edited on this list page in a modal
};

/**
 * Passed as a property of the DashboardDataTable in DashboardUI
 * @param row is the html data for the table row
 * @param object is the current object from the database being placed into the table
*/
LineItemManageController.prototype.OnObjectLoad = function(row, object) {
	// row.find('.item-id').val(object.object_id); // unhide and edit this if you are doing custom calls on row click
	
	row.find('.created_at').text(object.created_at);
	row.find('.amount').text(object.amount);
	row.find('.label_field').text(object.label);
	row.find('.entry_type').text(object.entry_type);
	row.find('.notes').text(object.comment);

	// Uncomment below to do row by row database calls of additional information like foreign table values	
	// AccountingApp.Get(endpoint, object.object_id, function(data) {
	// 	var item = data.responseJSON.item;
	// 	row.find('.field_name_2').text(item.name);
	// });
};

/**
 * Sets the currently active object as form data
 * This method is called from the scope context of the Dashboard Datatable
*/
LineItemManageController.prototype.OnRowClick = function() {
	SiteController.pageController.Route = this.current;

	if ( this.form == null ) { // if there is no edit form here, go to full edit screen
		this.open = function() {
			controller = new LineItemInfoController();
			controller.Route = this.current;
			SiteController.navigate(controller);
		}.bind(this);
		return;
	}

	// Set fields to object data
	this._newForm.find('.label_field').val(SiteController.pageController.Route.label);
	this._newForm.find('.amount').val(SiteController.pageController.Route.amount);
	// this._newForm.find('.created_at').val(SiteController.pageController.Route.created_at);
	this._newForm.find('.comment').val(SiteController.pageController.Route.comment);
	this._newForm.find('.entry_type').val(SiteController.pageController.Route.entry_type);
};

LineItemManageController.prototype.OnObjectSave = function () {
    var item = {};
    var result = { success: false };
    var message = "Failed";

    this.current.id = SiteController.pageController.Route.id;

    item = {};
    item.id = this.current.id;

    item.label = this._newForm.find('.label_field').val();
    item.amount = this._newForm.find('.amount').val();
    item.entry_type = this._newForm.find('.entry_type').val();
    item.comment = this._newForm.find('.comment').val();

    if (typeof this.current.id == "undefined") {
        item.id = null;
        result = AccountingApp.LineItemCreateUnSafe(item);
    } else {
        result = AccountingApp.LineItemUpdateUnSafe(item);
    }
        
    if (result.success === true) {
        message = "Saved";
    } else if (result.success === false) {
        message = result.message;
    } else {
        message = result;
    }

    SiteController.ShowToast(message);
	SiteController.pageController.ViewModel.Start();
};

LineItemManageController.prototype.DeleteObject = function ( item ) {
    result = AccountingApp.LineItemDeleteUnSafe(item.id);

    if (result.success === true) {
        message = "Deleted";
    } else if (result.success === false) {
        message = result.message;
    } else {
        message = result;
    }

    SiteController.ShowToast(message);
};


/**
 * Used to prepare editing form, specifically with asyncronous data for select lists
*/
LineItemManageController.prototype.ReadyForm = function() {
	// var field_name_1 = {};
	// var $field_name_1_field = this.tableList.form.find('.field_name_1');
	// $field_name_1_field.empty();
	// for (var i = 0; i < this.ViewModel.ForeignTableDataList1.length; i++) {
	// 	field_name_1 = this.ViewModel.ForeignTableDataList1[i];
	// 	$field_name_1_field.append('<option value="'+field_name_1.object_id+'">'+field_name_1.name+'</option>');
	// } 
	
	// var field_name_2 = {};
	// var $field_name_2_field = this.tableList.form.find('.field_name_2');
	// $field_name_2_field.empty();
	// for (var i = 0; i < this.ViewModel.ForeignTableDataList2.length; i++) {
	// 	field_name_2 = this.ViewModel.ForeignTableDataList2[i];
	// 	$field_name_2_field.append('<option value="'+field_name_2.object_id+'">'+field_name_2.name+'</option>');
	// }  
};

/**
 * Largely not used
 * turns on javascript fast datatable search.
 * mostly obsolete due to Elastic Search indexing
 */
LineItemManageController.prototype.ActivateIndexing = function() {
	if (!this.dataTable) {
		this.dataTable = $('#datatable-example');
		this.dataTable.DataTable({
            responsive: true
        });
	}
};