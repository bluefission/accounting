function CalendarForm( element, processFunction ) {
	this.item = {};
	if ( !element ) return;
	// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	name = $( "#title" ),
	start = $( "#start_relative" ),
	end = $( "#end_relative" ),
	location = $( "#location" ),
	allday = $( "#allday" ),
	description = $( "#description" ),
	allFields = $( [] ).add( name ).add( start ).add( end ).add( location ).add( description ),
	tips = $( ".validateTips" );

	if ( !start.datetimepicker ) {
		start.datetimepicker();
		end.datetimepicker();
	}
 
    dialog = $( element ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Save": function() {},
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });

    this.updateTips = function( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    this.checkLength = function( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    this.checkRegexp = function( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        
        return false;
      } else {
        return true;
      }
    }

    this.setFields = function() {
    	console.log(this.item);
    	name.val(this.item.title);
		startDateFormatted = "";
		endDateFormatted = "";
		startDate = new Date();
		endDate = new Date();
		// start.val((startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear() + " " + startDate.getHours() + ":" + startDate.getMinutes() );
		// end.val((myDate.getMonth() + 1) + "/" + myDate.getDate.getDate() + "/" + startDate.getFullYear() + " " + startDate.getHours() + ":" + startDate.getMinutes() );
		if ( !System.Guid.Empty.Equals(this.item.calendar_item_id) ) {
			startDate = new Date(this.item.start_relative);
			endDate = new Date(this.item.end_relative);
			startDateFormatted = String.Format("{0:D2}/{1:D2}/{2:D4} {3:D2}:{4:D2}", [(startDate.getMonth() + 1), startDate.getDate(), startDate.getFullYear(), startDate.getHours(), startDate.getMinutes() ] );
			endDateFormatted = String.Format("{0:D2}/{1:D2}/{2:D4} {3:D2}:{4:D2}", [(endDate.getMonth() + 1), endDate.getDate(), endDate.getFullYear(), endDate.getHours(), endDate.getMinutes() ] );
		}
		start.datetimepicker({startDate:this.item.start_relative?startDate:""});
		end.datetimepicker({startDate:this.item.end_relative?endDate:""});
		start.val(startDateFormatted);
		end.val(endDateFormatted);
		location.val(this.item.location);
		description.val(this.item.description);
		allday.prop("checked", this.item.allday);
    }

    this.launch = function() {
    	this.setFields();
    	dialog.dialog("open");
    }

    this.process = function() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "title", 3, 16 );
      valid = valid && checkLength( start, "start_relative", 6, 80 );
      valid = valid && checkLength( end, "end_relative", 5, 16 );
 
      // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      // valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      // valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      this.item.start_relative = start.datetimepicker('getValue');
      this.item.end_relative = start.datetimepicker('getValue');

      if ( valid ) {
        onSuccess();
        dialog.dialog( "close" );
      }
      return valid;
    } 
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      process();
    });
}