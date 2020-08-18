$(document).ready(function(){
	$('.settings-block h2').click(function(){
		$(this).parent().toggleClass('open');
	})

	$("#visualisation-tabs button").click(function(){
		$("#visualisation-tabs button").removeClass('active');
		$(this).addClass('active');
		$('.tab-pane').removeClass('active');
		if($(this).val()=="preview"){
			$('.tab-pane.tab-preview').addClass('active');
		}else if($(this).val()=="data"){
			$('.tab-pane.tab-data').addClass('active');
		}
	});

	$('.import-data').click(function(){
		$("#theDataFile").click();		
	});

	var container = document.getElementById('spreadsheet');
    var hot = new Handsontable(container, {
        // data: [],
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        licenseKey: 'non-commercial-and-evaluation',
      	afterChange: (changes, source) => {
      		if(source !="loadData"){
      			console.log(hot.getData());
      		}
		},
		afterRemoveRow: (changes, source)=>{
			console.log(hot.getData());
		},
		afterRemoveCol: (changes, source)=>{
			console.log(hot.getData());
		},
    });

	$('#theDataFile').change(function(){
		var form = $('#csvform')[0];
		var formData = new FormData(form);
		$.ajax({
		  	url: "parsecsv.php",	
		  	type: 'POST',
		  	data: formData,
		   	contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
			processData: false,	  
		}).done(function(response) {
			console.log(response);
			// $("#spreadsheet").html('');
			// d3.csv("assets/data/richest_people.csv").then(function(data) {
    			// draw(data)    
			// });
			// draw(JSON.parse(response));
		  	var csvData = JSON.parse(response);	       
		  	hot.loadData(csvData);		
		  	console.log(hot.getColHeader());
		});
		
	});
})