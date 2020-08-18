var margin = {top: 40, right: 0, bottom: 0, left: 40},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let columns_cnt = 2;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .paddingOuter(0);
var y = d3.scaleBand()
          .range([0,height])
          .padding(0.1)
          .paddingOuter(0);

var link = d3.linkRadial()
    .angle(function(d) {return x(d.startX); })
    .radius(function(d) { return y(d.startY); });

var svg = d3.select(".wrapper").append("svg").attr('viewBox','0 0 960 400').attr('preserveAspectRatio',"xMinYMin meet")
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var defs = svg.append("defs")

	defs.append("marker")
			.attr("id","arrow")
			.attr("viewBox","0 -5 10 10")
			.attr("refX",5)
			.attr("refY",0)
			.attr("markerWidth",4)
			.attr("markerHeight",4)
			.attr("orient","auto")			
			.append("path")
				.attr("d", "M0,-5L10,0L0,5")
				.attr("class","arrowHead");

// get passage data
d3.json("https://dev.briancoords.com/publicdev/wp-json/wp/v2/passage/").then(function(passage_data, error) {	
  if(passage_data){  	
  	// set rows cnt	
  	let rows_cnt = Math.ceil(passage_data.length / columns_cnt);

  	var xDomains = [], yDomains = [];
  	for(var i=0;i<columns_cnt;i++){
  		xDomains.push(i);
  	}
  	x.domain(xDomains);

  	for(var i=0;i<rows_cnt;i++){
  		yDomains.push(i);
  	}
  	y.domain(yDomains);

  	// format passage data
	passage_data.forEach(function(passage, i){
		passage.x = Math.floor(i / columns_cnt);
		passage.y = i % columns_cnt;

var passagePopupHtml = '<div class="modal fade" id="passageModal'+passage.id+'" tabindex="-1" role="dialog" aria-labelledby="passageModal'+passage.id+'" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Passage: '+passage.title.rendered+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+passage.id+'</div><div class="modal-footer"><button type="button" class="btn tn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';

	$('body').append(passagePopupHtml);
	})

  	//get relationship data
	d3.json("https://dev.briancoords.com/publicdev/wp-json/wp/v2/relationship").then(function(relationship_data) {	
	// d3.json("js/relationship.json").then(function(relationship_data) {	
	  	if(relationship_data){
	  		// filter relationship data if start and end value is integer
	  		relationship_data.filter(function(relation){
	  			return Number.isInteger(relation.relationship_start) && Number.isInteger(relation.relationship_end)
	  		});	  	

	  		// remove duplicated relationships
	  		relationship_data = removeDuplicatedRelationships(relationship_data);
	  		// set position of relationship and modal content
	  		relationship_data.forEach(function(relationship, i){
	  			relationship.startX = getXValue(relationship.relationship_start, passage_data);
	  			relationship.startY = getYValue(relationship.relationship_start, passage_data);
	  			relationship.endX   = getXValue(relationship.relationship_end, passage_data);
	  			relationship.endY   = getYValue(relationship.relationship_end, passage_data);

	  			var relationshipPopupHtml = '<div class="modal fade" id="relationshipModal'+relationship.id+'" tabindex="-1" role="dialog" aria-labelledby="relationshipModal'+relationship.id+'" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Relationship: '+relationship.title.rendered+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">';
	  			
	  			relationship['items'].forEach(function(item){
	  				relationshipPopupHtml +='<span>'+item.id+'</span><span>'+item.title+'</span><br/>';
	  			})
	  			relationshipPopupHtml +='</div><div class="modal-footer"><button type="button" class="btn tn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';

				$('body').append(relationshipPopupHtml);

	  		})

	  		// draw passage rects
			var g_passage = svg.selectAll('g.passage')				
				.data(passage_data)
				.enter()
				.append('g')
				.attr('class','passage');

			var passage_rect = g_passage.append('rect')
				.attr('class','passage_rect')
				.attr('rx',5)
				.attr('ry',5)
				.attr('x', function(d){return x(d.x)})
				.attr('y', function(d){return y(d.y)})
				.attr('height', y.bandwidth())
				.attr('width', x.bandwidth())
				.on('click', function(d){
					$("#passageModal"+d.id).modal('show');
				});

			var passage_text = g_passage.append('text')
				.attr('class','passage_text')
				.attr('x', function(d){return x(d.x) + x.bandwidth()/2})
				.attr('y', function(d){return y(d.y) + y.bandwidth()/2})
				.text(function(d){return d.title.rendered});

			// draw relationship arrows
			var g_arrows = svg.selectAll('g.relationship_arrow').data(relationship_data).enter().append('g').attr('class', 'relationship_arrow');

			var relation_arrow = g_arrows.append('path')
				.attr("class","arrow relationship")
				.attr("marker-end","url(#arrow)")
		      	.attr('d', function(d){
			        var o1 = {x: x(d.startX)+x.bandwidth() - 5, y: y(d.startY) - 5 + y.bandwidth()};
			        var o2 = {x: x(d.endX)+10, y: y(d.endY)+10};
			        return diagonal(o1, o2);
		      	})
				// .attr("x1",function(d){return x(d.startX) + x.bandwidth()/2})
				// .attr("y1",function(d){return y(d.startY) + y.bandwidth()/2})
				// .attr("x2",function(d){return x(d.endX) + x.bandwidth()/2})
				// .attr("y2",function(d){return y(d.endY) + y.bandwidth()/2})
				.on('click', function(d){
					$("#relationshipModal"+d.id).modal('show');
				});
	  	}
	});
  }  
});

function diagonal(s, d) {

path = `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`

return path
}

function getXValue(id, passage_data){
	var res = "";
	if(id==parseInt(id)){
		passage_data.forEach(function(d){
			if(d.id == id){
				res = d.x;
			}
		})
	}
	return res;
}

function getYValue(id, passage_data){	
	var res = "";
	if(id==parseInt(id)){
		passage_data.forEach(function(d){
			if(d.id == id){				
				res = d.y;				
			}
		})
	}
	return res;
}

function removeDuplicatedRelationships(relationship_data){
	let res = [];
	let links = [];
	for( var i = 0; i < relationship_data.length; i++){ 
		let ele = relationship_data[i];		
		var tmp = [ele.relationship_start,ele.relationship_end];
		var indexInArray = isItemInArray(links,tmp); 		
		if(indexInArray==false){
			links.push(tmp);
			ele['items'] = [];
			let tmpItem = new Object;
			tmpItem['id'] = ele.id;
			tmpItem['title'] = ele.title.rendered;
			ele['items'].push(tmpItem);
			res.push(ele);
		}else{
			let duplicatedItem = relationship_data[indexInArray];
			let tmpItem = new Object;
			tmpItem['id'] = relationship_data[i].id;
			tmpItem['title'] = ele.title.rendered;
			duplicatedItem['items'].push(tmpItem);			
		}
	}		
	return res;
}
$(document).on('change','#show_relatioship_radio', function(){
	if($(this).prop('checked')==true){
		svg.selectAll('.relationship').classed('hide', false);
	}else{
		svg.selectAll('.relationship').classed('hide', true);
	}
})

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return i;   // Found it
        }
    }
    return false;   // Not found
}