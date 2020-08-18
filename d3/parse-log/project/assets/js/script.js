jQuery.ajax({
    url : "assets/data.log",
    dataType: "text",
    success : function (data) {
        parseLog(data);
    }
});    

function parseLog(data){
	
}