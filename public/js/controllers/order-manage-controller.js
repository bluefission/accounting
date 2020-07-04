function OrderManageController() {
	this.IDENTIFIER = "OrderManageController"; // <Order>ManageController
	this.DOCUMENT = "order-list.html"; // <order>-list.html file name of view
	this.ViewModel = null;
	this.Route = {}; // set to blank object, will be the currently edited object
	var self = this;

}

OrderManageController.prototype.onReady = function() {
	// Object below should be model of object being edited
	if (!this.Route.id) {
		this.Route = {};
	}

	this.tableList = new DashboardDatatable('#order-list');
	this.tableList.form = $('#order-edit');
	this.tableList.bindRow = this.OnObjectLoad.bind(this);
	this.tableList.bindForm = this.OnRowClick;
	this.tableList.process = this.OnObjectSave;
    this.tableList.tryDelete = this.DeleteObject;

	this.btnNew = $('#new-order-btn');
    this.btnDelete = $('#delete-order-btn');

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

    this.ViewModel = new OrderViewModel(this);
	this.ViewModel.Start();
};

/**
 * Handler for Elastic Search lookup from search box
 * The method referenced in the following function should be Search<Order>s(keyword)
 * It is used to do fast Elastic Search lookup
*/
OrderManageController.prototype.Search = function( keyword ) {
	this.ViewModel.SearchOrders(keyword); 
};

/**
 * Loads data called from ajax call
 * Should be invoked from the ajax callbacks
*/
OrderManageController.prototype.BindData = function() {
	var list = this.ViewModel.OrderData || []; // incase object member is null
	this.tableList.load(list); // sets table data as retrieved list information
	this.ReadyForm(); // Only if objects are edited on this list page in a modal
};

/**
 * Passed as a property of the DashboardDataTable in DashboardUI
 * @param row is the html data for the table row
 * @param object is the current object from the database being placed into the table
*/
OrderManageController.prototype.OnObjectLoad = function(row, object) {
	// row.find('.item-id').val(object.object_id); // unhide and edit this if you are doing custom calls on row click
	
	row.find('.created_at').text(object.created_at);
	row.find('.total').text(object.total);
	row.find('.status').text(object.status);
	// row.find('.notes').text(object.notes);

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
OrderManageController.prototype.OnRowClick = function() {
	SiteController.pageController.Route = this.current;

	if ( this.form == null ) { // if there is no edit form here, go to full edit screen
		this.open = function() {
			controller = new OrderInfoController();
			controller.Route = this.current;
			SiteController.navigate(controller);
		}.bind(this);
		return;
	}

	// Set fields to object data
	this._newForm.find('.status').val(SiteController.pageController.Route.status);
	this._newForm.find('.total').val(SiteController.pageController.Route.total);
	this._newForm.find('.notes').val(SiteController.pageController.Route.notes);
	this._newForm.find('.quanity').val(SiteController.pageController.Route.quanity);
	// this._newForm.find('.created_at').val(SiteController.pageController.Route.created_at);
	// this._newForm.find('.created_at').val(SiteController.pageController.Route.created_at);
};

OrderManageController.prototype.OnObjectSave = function () {
    var item = {};
    var result = { success: false };
    var message = "Failed";

    this.current.id = SiteController.pageController.Route.id;

    item = {};
    item.id = this.current.id;

    item.status = this._newForm.find('.status').val();
    item.item = this._newForm.find('.item').val();
    item.notes = this._newForm.find('.notes').val();
    item.quantity = this._newForm.find('.quantity').val();
    // item.created_at = this._newForm.find('.created_at').val();

    if (typeof this.current.id == "undefined") {
        item.id = null;
        result = AccountingApp.OrderAdd(item);
    } else {
        result = AccountingApp.OrderEdit(item);
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

OrderManageController.prototype.DeleteObject = function ( item ) {
    result = AccountingApp.OrderDeleteUnSafe(item.id);

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
OrderManageController.prototype.ReadyForm = function() {
	var item = {};
	var $item_field = this.tableList.form.find('.item');
	$item_field.empty();
	for (var i = 0; i < this.ViewModel.ForeignTableDataList1.length; i++) {
		item = this.ViewModel.ForeignTableDataList1[i];
		$item_field.append('<option value="'+item.id+'">'+item.name+'</option>');
	} 
	
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
OrderManageController.prototype.ActivateIndexing = function() {
	if (!this.dataTable) {
		this.dataTable = $('#datatable-example');
		this.dataTable.DataTable({
            responsive: true
        });
	}
};