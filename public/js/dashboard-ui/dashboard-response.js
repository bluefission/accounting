// Dashboard Response

var DashboardResponse = {
	data: "",
	status: "Hello, World",
	list: [],
	id: 0,
	query: '',
	children: [],
	parse: function( result ) {
		try	{
			var response = JSON.parse( result );

			if ( response.hasOwnProperty('data') )
				this.data = response.data;

			if ( response.hasOwnProperty('status') )
				this.status = response.status;

			if ( response.hasOwnProperty('list') )
				this.list = response.list;

			if ( response.hasOwnProperty('id') )
				this.id = response.id;

			if ( response.hasOwnProperty('query') )
				this.query = response.query;

			if ( response.hasOwnProperty('children') )
				this.children = response.children;

		} catch(e) {
			console.log( "Response cannot be parsed as JSON" );
			this.data = result;
			this.status = "Abnormal Response. Could not parse!";
		}

		return this;
	}
};