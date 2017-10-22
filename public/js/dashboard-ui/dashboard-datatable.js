var DashboardDatatable = function(element, list) {
	this.cell = null;
	this.area = null;
	this.list = [];
	this.current = {};
	this.form = null;
	this._newForm = null;
	this._rowSelector = '.table-row';
	this._itemSelector = '.item-id';

	this.cell = $(element + ' ' + this._rowSelector).clone();
	this.area = $(element);
	this.area.empty();
	if ( list )
		this.list = list;
};
DashboardDatatable.prototype = {
	clear: function() {
		this.area.empty();
	},
	load: function( list, force ) {
		if (!force && (list && this.list == list)) {
			return;
		}

		if ( list )
			this.list = list;

		this.area.empty();
		for (var i = 0; i < this.list.length; i++ ) {
			$cell = this.cell.clone();
			$cell.find(this._itemSelector).val(i);
			this.bindRow($cell, this.list[i]);
			$cell.click(this.clicked.bind(this));
			this.area.append($cell);
		}
	},
	clicked: function(e) {
        if ($(e.target).hasClass(this._itemSelector.substring(1))) {
            return;
        }
        e.preventDefault();
        var index = $(e.currentTarget).find(this._itemSelector).val();
        
		this.current = this.list[index];
		
		if (this.form)
	    	this._newForm = this.form.clone();
	    
 		this.bindForm();
 		this.open();
    },
    new: function () {
        this._newForm = this.form.clone();

        this.current = {};
        this.open();
    },
	save: function() {
		this.process();
		this.load(null, true);
	},
	add: function(e) {
		e.preventDefault();
		$cell = this.cell.clone();
		this.area.append($cell);
    },
    getSelected: function () {
        var items = this.area.find(this._itemSelector + ":checked");
        var ids = [];
        for (var i = 0; i < items.length; i++) {
            ids.push($(items[i]).val());
        }
        return ids;
    },
    remove: function () {
        
        var items = this.getSelected();
        for (var i = 0; i < items.length; i++) {
            console.log(this.list[items[i]]);
            this.tryDelete(this.list[items[i]]);
        }
    },
	open: function() {
	    DashboardUI.clearDialogs();
	    DashboardUI.modal(this._newForm, function( result ) {
	    	
	    	if (result === false) {
	    		// DashboardUI.clearDialogs();
	    		return;
	    	}
	    	this.save();
	    }.bind(this));
	},
	bindRow: function( row, object ) {},
	bindForm: function() {},
    process: function () { },
    tryDelete: function() { }
};