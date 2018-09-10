// DEBUG CODE TO VISUALIZE DATA
// NOT IN PRODUCTION VERSION


// Helper functions

// make html table by iterating through a json array. 
$.makeTable = function (mydata) {
  
    var table = $('<table class="table table-bordered table-striped">');
    var tblHeader = "<tr>";
    $(table).append('<tbody>');
    for (var k in mydata[0]) tblHeader += "<th>" + k + "</th>";
    tblHeader += "</tr>";
    $(tblHeader).appendTo(table);
    $.each(mydata, function (index, value) {
        var TableRow = "<tr>";
        $.each(value, function (key, val) {
            TableRow += "<td>" + val + "</td>";
        });
        TableRow += "</tr>";
        $(table).append(TableRow);
    });
    $(table).append('</tbody>');
    return ($(table));
};


// Document functions

// client code to handle contributor button clicks
$(document).ready(function(){
 $('#load_rewards_summary_data').click(function(){
   // request the data from the rest endpoint 
   $.getJSON('/rewards_summary',
    function (json) {
      // TODO:
      //   - Review the response input here, could be used to call eval() on untrusted data.
      var mydata = eval(json);
		  var table = $.makeTable(mydata);
		  $('#employee_table').html(table);
    		
		});
	});
});

// client code to handle contributor button clicks
$(document).ready(function(){
 $('#load_rewards_detail_data').click(function(){
   // request the data from the rest endpoint 
   $.getJSON('/rewards_detail',
    function (json) {
      // TODO:
      //   - Review the response input here, could be used to call eval() on untrusted data.
      var mydata = eval(json);
          var table = $.makeTable(mydata);
          $('#employee_table').html(table);
            
        });
    });
});

// Contributor data field names: worker,name,address,email,ethAddr  
$(document).ready(function(){
 $('#load_contributor_data').click(function(){
    $.getJSON('/contributors',
    function (json) {     
    var mydata = eval(json);
		var table = $.makeTable(mydata);
		$('#employee_table').html(table);
    		
		});
	});
});
   
   


$(document).ready(function(){
 $('#load_invoice_data').click(function(){
  $.getJSON('/invoices',
    function (json) {     
    var mydata = eval(json);
		var table = $.makeTable(mydata);
		$('#employee_table').html(table);
    		
		});
	});
});