var wrapperWidth = $("#chart_wrapper").width(),
    height = 800,
    margin = {
        left: 50,
        right: 50,
        top: 50,
        bottom: 20
    };

var width = wrapperWidth - margin.left - margin.right;
var radius = 30; // Node circle radius;

var colors = ['#F2F2F2', '#D3D3D3', '#BDBDBD', '#E4E4E4', '#C5C5C5C5'];

// Do not include a domain
var myColor = d3.scaleOrdinal().range(colors);

var svg = d3.select("#chart_wrapper").append('svg').attr("width", width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

d3.json("assets/data.json").then(function(data) {
    console.log(data);
    
	  var zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([
      [-100, -100],
      [width + 90, height + 100]
    ])
    .on("zoom", zoomed);

      svg.call(zoom);
 
  function zoomed() {
    svg.attr("transform", d3.event.transform);
  }

    var nodes = data.nodes;
    var links = data.links;
    var places = [];
    nodes.map(function(n) {
        return n.place;
    }).forEach(function(d) {
        if (!places.includes(d)) {
            places.push(d);
        }
    })

    places.sort();

    var x = d3.scaleBand()
        .rangeRound([0, width]);

    x.domain(places);

    myColor.domain(d3.extent(places));
    var place_wrapper = svg.selectAll('.place_wrapper').data(places).enter().append('g').attr("class", (d) => 'place_wrapper place_' + d).attr("transform", function(d) {
        return "translate(" + (x(d)) + ',0)';
    });

    place_wrapper.append('rect').attr('x', 0).attr("y", 0).attr("width", x.bandwidth()).attr('height', height).attr("fill", (d)=>myColor(d)).attr('stroke','white');
    // place_wrapper.append('rect').attr('x', 0).attr("y", 0).attr("width", x.bandwidth()).attr('height', 50).attr("fill", 'black').attr('fill-opacity', '0.3');
    // place_wrapper.append('text').attr('x', x.bandwidth() / 2).attr("y", 30).text((d) => '"place":' + d).attr('text-anchor', 'middle').attr('class', 'place_title').attr('fill', 'white');

    var nodesByPlace = d3.nest()
        .key(function(d) {
            return d.place;
        })
        .entries(nodes);

    nodesByPlace.map((d) => d.values).forEach(function(d) {
        d.forEach(function(node, i) {
            if (nodes.includes(node)) {
                var index = nodes.indexOf(node);
                nodes[index]['nth'] = i;
            }
        });
    })

    console.log(nodes);

    var yMax = d3.max(nodesByPlace.map(function(d) {
        return d.values.length
    }));

    var y = d3.scaleBand().rangeRound([0, height]);

    var yDomain = [];
    for (var i = 0; i < yMax; i++) {
        yDomain.push(i);
    }

    y.domain(yDomain);

var link_wrapper = svg.selectAll('g.link_wrapper').data(links).enter().append('g').attr('class',(d)=>'link_wrapper link');
    link_wrapper.append('path').attr('class','link')
    .attr('link_from',(d)=>d.source)
    .attr('link_to',(d)=>d.target)
    .attr('d',function(d){
        var source = getNodeById(nodes,d.source);
        var target = getNodeById(nodes,d.target);

        var path = "M "+(x(source.place)+x.bandwidth()/2) + ' ' + (y(source.nth)+y.bandwidth()/2) + ' L '+ (x(source.place)+x.bandwidth()/2 + x(target.place)+x.bandwidth()/2) / 2 + ' '+(y(source.nth)+y.bandwidth()/2 + y(target.nth)+y.bandwidth()/2) / 2 + ' L ' + (x(target.place) + x.bandwidth()/2) + ' ' + (y(target.nth)+y.bandwidth()/2);

        return path;        
    })    
    .attr('startX',function(d){
        var source = getNodeById(nodes,d.source);
        var target = getNodeById(nodes,d.target);
        return (x(source.place)+x.bandwidth()/2);
    })
    .attr('startY',function(d){
        var source = getNodeById(nodes,d.source);
        var target = getNodeById(nodes,d.target);        
        return (y(source.nth)+y.bandwidth()/2);
    })
    .attr('endX',function(d){
        var source = getNodeById(nodes,d.source);
        var target = getNodeById(nodes,d.target);        
        return x(target.place) + x.bandwidth()/2;
    })
    .attr('endY',function(d){
        var source = getNodeById(nodes,d.source);
        var target = getNodeById(nodes,d.target);        
        return (y(target.nth) + y.bandwidth()/2);
    })
    // .attr('x1',function(d){
    // 	var source = getNodeById(nodes,d.source);
    // 	var target = getNodeById(nodes,d.target);

    // 	var direction = checkLtR(x(source.place), x(target.place));

    // 	// if(direction == 0)
    // 	// 	return x(source.place) + x.bandwidth()/2;
    // 	// else if(direction == 1)
    // 	// 	return x(source.place) + x.bandwidth()/2 + radius;
    // 	// else if(direction == -1)
    // 	// 	return x(source.place) + x.bandwidth()/2 - radius;
    // 	return x(source.place) + x.bandwidth()/2;
    // }).attr('y1',function(d){
    // 	var source = getNodeById(nodes,d.source);
    // 	var target = getNodeById(nodes,d.target);

    // 	var direction = checkBtT(y(source.nth), y(target.nth));

    // 	// if(direction == 0)
    // 	// 	return y(source.nth) + y.bandwidth()/2;
    // 	// else if(direction == 1)
    // 	// 	return y(source.nth) + y.bandwidth()/2 + radius;
    // 	// else if(direction == -1)
    // 	// 	return y(source.nth) + y.bandwidth()/2 - radius;

    // 	return y(source.nth) + y.bandwidth()/2;
    // }).attr('x2',function(d){
    // 	var source = getNodeById(nodes,d.source);
    // 	var target = getNodeById(nodes,d.target);

    // 	var direction = checkLtR(x(source.place), x(target.place));

    // 	// if(direction == 0)
    // 	// 	return x(target.place) + x.bandwidth()/2;
    // 	// else if(direction == 1)
    // 	// 	return x(target.place) + x.bandwidth()/2 - radius;
    // 	// else if(direction == -1)
    // 	// 	return x(target.place) + x.bandwidth()/2 + radius;
    // 	return x(target.place) + x.bandwidth()/2;
    // }).attr('y2',function(d){
    // 	var source = getNodeById(nodes,d.source);
    // 	var target = getNodeById(nodes,d.target);

    // 	var direction = checkBtT(y(source.nth), y(target.nth));

    // 	// if(direction == 0)
    // 	// 	return y(target.nth) + y.bandwidth()/2;
    // 	// else if(direction == 1)
    // 	// 	return y(target.nth) + y.bandwidth()/2 - radius;
    // 	// else if(direction == -1)
    // 	// 	return y(target.nth) + y.bandwidth()/2 + radius;
    // 	return y(target.nth) + y.bandwidth()/2;
    // })
    .attr('stroke','#f4b185')
    .attr('stroke-width','2px')
    .attr("marker-mid", "url(#triangle)");

    var node_wrapper = svg.selectAll('g.node_wrapper').data(nodes).enter().append('g').attr('class', (d) => 'node_wrapper node_' + d.id);

    node_wrapper.append('circle').attr('cx',(d)=>x(d.place)+x.bandwidth()/2).attr('cy',(d)=>y(d.nth)+y.bandwidth()/2).attr('r',radius).attr('fill','white').attr('node-id',(d)=>d.id)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    node_wrapper.append('text').attr('x',(d)=>x(d.place)+x.bandwidth()/2).attr('y',(d)=>y(d.nth)+y.bandwidth()/2).text((d)=>d.name).attr('text-anchor','middle');

    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "#f4b185");

    function dragstarted(d) {
	  d3.select(this).raise().classed("active", true);
	  d3.select(this.parentNode).select('text').raise();
	}

	function dragged(d) {		
		var xPos;
		// if((d3.event.x + radius) > x(d.place) + x.bandwidth()){
		// 	xPos = x(d.place) + x.bandwidth() - radius;
		// }else if((d3.event.x - radius)< x(d.place)){
		// 	xPos = x(d.place) + radius;
		// }else{
			xPos = d3.event.x;
		// }

		var yPos;

		// if((d3.event.y - radius) < 50){
		// 	yPos = 50 + radius;
		// }else if(d3.event.y + radius > height){
		// 	yPos = height - radius;
		// }else{
			yPos = d3.event.y;
		// }

	  	d3.select(this).attr("cx", d.x = xPos).attr("cy", d.y = yPos);	  
	  	d3.select(this.parentNode).select('text').attr('x',d.x = xPos).attr('y',d.y=yPos);

	  	$('[link_from='+d.id+']').each(function(e){
	  		// d3.select(this).attr('x1',xPos).attr('y1',yPos);
            d3.select(this).attr('startX',xPos);
            d3.select(this).attr("startY",yPos);

            var endX = d3.select(this).attr('endX');
            var endY = d3.select(this).attr('endY');
            var path = "M "+xPos + ' ' + yPos + ' L '+ (Number(xPos) + Number(endX)) / 2 + ' '+(Number(yPos) + Number(endY)) / 2 + ' L ' + endX + ' ' + endY;
            d3.select(this).attr('d',path);	  	
	  	});

	  	$('[link_to='+d.id+']').each(function(e){
	  		// d3.select(this).attr('x2',xPos).attr('y2',yPos);
            d3.select(this).attr('endX',xPos);
            d3.select(this).attr("endY",yPos);
            
            var startX = d3.select(this).attr('startX');
            var startY = d3.select(this).attr('startY');
            var path = "M "+startX + ' ' + startY + ' L '+ (Number(xPos) + Number(startX)) / 2 + ' '+(Number(yPos) + Number(startY)) / 2 + ' L ' + xPos + ' ' + yPos;
            d3.select(this).attr('d',path);	  		
	  	});
	}

	function dragended(d) {
	  d3.select(this).classed("active", false);
	  d3.select(this).raise().classed("active", true);
  	  d3.select(this.parentNode).select('text').raise();
	}

});

function getNodeById(nodes,id){
	var res;
	nodes.forEach(function(n){		
		if(n.id == id){		
			res = n;
		}
	})

	return res;
}


//get the direction of link (left to right)
function checkLtR(x1,x2){
	if(x1==x2){
		return 0;
	}else if(x2>x1){
		return 1;
	}else if(x2<x1){
		return -1;
	}
}

//get the direction of link (bottom to top)
function checkBtT(y1,y2){
	if(y1==y2){
		return 0;
	}else if(y1>y2){
		return -1;
	}else if(y1<y2){
		return 1;
	}
}