function ModalForm( element, processFunction ) {
  this.processFunction = processFunction;
  this.item = {};
  if ( !element ) return;
  
  var dialog = $( element ).dialog({
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
  this.setFields = function() {
     
  }

  this.launch = function() {
    this.setFields();
    dialog.dialog("open");
  }

  this.process = function() {
    var result = this.processFunction;
    dialog.dialog( "close" );
  };

  var form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    process();
  });
}