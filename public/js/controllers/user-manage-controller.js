function OrderManageController() {
	this.IDENTIFIER = "OrderManageController"; // <Order>ManageController
	this.DOCUMENT = "order-list.html"; // <order>-list.html file name of view
	this.ViewModel = null;
	this.Route = {}; // set to blank object, will be the currently edited object
	var self = this;

}

OrderManageController.prototype.onReady = function() {
	// Object below should be model of object being edited
	if (!this.Route.table_name_id) {
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
	row.find('.total').text('0');

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
	this._newForm.find('.last_name').val(SiteController.pageController.Route.last_name);
	this._newForm.find('.first_name').val(SiteController.pageController.Route.first_name);
	this._newForm.find('.phone').val(SiteController.pageController.Route.phone);
};

OrderManageController.prototype.OnObjectSave = function () {
    var item = {};
    var result = { success: false };
    var message = "Failed";

    this.current.table_name_id = SiteController.pageController.Route.table_name_id;

    item = new {};
    item.table_name_id = this.current.table_name_id;

    item.field_name_1 = this._newForm.find('.field_name_1').val();
    item.field_name_2 = this._newForm.find('.field_name_2').val();
    item.field_name_3 = this._newForm.find('.field_name_3').val();

    if (System.Guid.Empty.Equals(this.current.table_name_id) || typeof this.current.table_name_id == "undefined") {
        item.table_name_id = null;
        result = AccountingApp.OrderCreateUnSafe(item);
    } else {
        result = AccountingApp.AccountUpdateUnSafe(item);
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
	var field_name_1 = {};
	var $field_name_1_field = this.tableList.form.find('.field_name_1');
	$field_name_1_field.empty();
	for (var i = 0; i < this.ViewModel.ForeignTableDataList1.length; i++) {
		field_name_1 = this.ViewModel.ForeignTableDataList1[i];
		$field_name_1_field.append('<option value="'+field_name_1.object_id+'">'+field_name_1.name+'</option>');
	} 
	
	var field_name_2 = {};
	var $field_name_2_field = this.tableList.form.find('.field_name_2');
	$field_name_2_field.empty();
	for (var i = 0; i < this.ViewModel.ForeignTableDataList2.length; i++) {
		field_name_2 = this.ViewModel.ForeignTableDataList2[i];
		$field_name_2_field.append('<option value="'+field_name_2.object_id+'">'+field_name_2.name+'</option>');
	}  
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