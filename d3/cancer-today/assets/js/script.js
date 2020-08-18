var nCount = 5;
var width = 960,
    height = 500; // adjust for height of input bar div
var color = d3.scale.category20();
// draw and append the container
var svg = d3.select("#chart_container").append("svg").attr('width','100%').attr('height','100%')
  .attr("viewBox","0 0 960 500").attr("preserveAspectRatio","xMidYMid meet");

var charts = d3.select("#chart_container");
// set the thickness of the inner and outer radii
var min = Math.min(width, (height-50));
var chart_r = min / 2;
// construct default pie laoyut
var pie = d3.layout.pie().value(function(d){ return d; }).sort(null);
// construct arc generator
var arc = d3.svg.arc()
  .outerRadius(chart_r * 0.8)
  .innerRadius(chart_r * 0.4);

var outerArc = d3.svg.arc()
  .innerRadius(chart_r * 0.9)
  .outerRadius(chart_r * 0.9);
// creates the pie chart container
var g = svg.append('g')
  .attr('transform', function(){
    if ( window.innerWidth >= 960 ) var shiftWidth = width / 2;
    if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
    return 'translate(' + shiftWidth + ',' + height / 2 + ')';
  })
    g.append("g")
  .attr("class", "labels");
g.append("g")
  .attr("class", "lines");
var tooltip = d3.select('body')
    .append('div')
    .attr('class','tooltip')
// generate random data
var data = makeData(+nCount);
// enter data and draw pie chart
var path = g.datum(data).selectAll("path")
  .data(pie)
  .enter().append("path")
    .attr("class","piechart")
    .attr("fill", function(d,i){ return color(i); })
    .attr("d", arc)
    .each(function(d){ this._current = d; })
    .on('mouseover',function(d){      
      pathAnim(d3.select(this), 1);
          tooltip.transition()    
              .duration(200)    
              .style("opacity", .9);    
          tooltip.html(d.data.toFixed(2) + "<br/>")  
              .style("left", (d3.event.pageX) + "px")   
              .style("top", (d3.event.pageY - 28) + "px");
    }).on('mouseout',function(){
      var thisPath = d3.select(this);
      if (!thisPath.classed('clicked')) {
          pathAnim(thisPath, 0);
      }
      tooltip.transition()    
        .duration(500)    
        .style("opacity", 0); 
    }).on('click',function(){        
        var thisPath = d3.select(this);
        var clicked = thisPath.classed('clicked');
        pathAnim(thisPath, ~~(!clicked));   
    })
function render(){  
  // generate new random data
  data = makeData(+nCount);
  // add transition to new path
  g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
  // add any new paths
  g.datum(data).selectAll("path")
    .data(pie)
  .enter().append("path")
    .attr("class","piechart")
    .attr("fill", function(d,i){ return color(i); })
    .attr("d", arc)
    .each(function(d){ this._current = d; })

  // remove data not being used
  g.datum(data).selectAll("path")
    .data(pie).exit().remove();    
  changeLabels(data);
}
render();

function makeData(size){
  return d3.range(size).map(function(item){
   return Math.random()*100;
  });
};
// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

function pathAnim(path, dir) {
    switch(dir) {
      case 0:
        path.transition()
          .duration(500)
          .ease('bounce')
          .attr('d', d3.svg.arc()
              .innerRadius(chart_r * 0.4)
              .outerRadius(chart_r * 0.8)
          );
      break;

      case 1:
        path.transition()
          .attr('d', d3.svg.arc()
              .innerRadius(chart_r * 0.4)
              .outerRadius(chart_r * 0.8)
          );
        break;
    }
}

function changeLabels(data){
  var text = svg.select(".labels").selectAll("text")
    .data(pie(data));

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data.toFixed(2);
    });
  
  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = chart_r * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

  text.exit()
    .remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data));
  
  polyline.enter()
    .append("polyline");

  polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = chart_r * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2)];
      };      
    });
  
  polyline.exit()
    .remove();
}
$(document).ready(function () {

  $('#updateData').on('click',function(){
    render();
  })
});

