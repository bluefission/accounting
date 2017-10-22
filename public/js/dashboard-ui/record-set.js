// Record

var RecordSet = RecordSet || {
	current: {},
	index: 0,
	total: 0,
	records: [],
	page: 1,
	perpage: 50,
	fetch: function( page, perpage )	{
		// Add ajax functionality
	},
	add: function( ) {
		this.records.push( object )
	},
	remove: function( ) {
		// this.records[this.index] = null;
		this.records.splice(this.index, 1);
	},
	update: function( object ) {
		this.records[this.index] = object;
	},
	get: function( id ) {
		var record = null;
		if ( id != undefined ) {
			record = this.records[id];
		} else if ( this.index in this.records)
			record = this.records[this.index];
		} else if {
			this.fetch();
			record = this.records[this.index];
		}

		return record;
	},
	list: function() {
		return this.records;
	}
};