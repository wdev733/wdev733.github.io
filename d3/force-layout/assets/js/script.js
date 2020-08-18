var wrapperWidth = $("#chart_wrapper").width(),
    wrapperHeight = 800;

var margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50
};

var width = wrapperWidth - margin.left - margin.right;
var height = wrapperHeight - margin.top - margin.bottom;
var svg = d3.select("#chart_wrapper").append('svg').attr("width", wrapperWidth).attr("height", wrapperHeight).append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')')


var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(50).strength(0.1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))

d3.json("assets/js/data.json", function(error, graph) {
  if (error) throw error;

  // console.log(graph);
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.1).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

d3.json("newjson.json", function(error, data) {
  var nodes = data.filter(function(d){ return d.from == d.to});
  var links = data.filter(function(d){ return d.from != d.to});

  var graph = new Object;
  graph['nodes'] = [];
  nodes.forEach(function(node){
    var tmp = new Object;
    tmp['id'] = node['from'];    
    tmp['group'] = Math.floor((Math.random() * 100) % 4 );
    graph['nodes'].push(tmp);
  })

  console.log(graph.nodes);

  graph['links'] = [];
  links.forEach(function(link, i){    
    var tmp1 = new Object;
    tmp1['source'] = link['from'];
    tmp1['target'] = link['to'];
    tmp1['value'] = link['width'];    
    graph['links'].push(tmp1);
  });

  // console.log(graph);

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes.filter(function(d){return d.group !=1}))
    .enter().append("g")
    
  var circles = node.append("circle")
      .attr("r", 15)
      // .attr("fill", function(d) { return color(d.group); })
      .attr("fill", "steelblue")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  var lables = node.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  var rectNode = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes.filter(function(d){return d.group == 1}))
    .enter().append("g")
    
  var circles = rectNode.append("rect")
      .attr("x",-15)
      .attr("y",-15)
      .attr("width", 30)
      .attr("height", 30)
      .attr("rx", 3)
      .attr("ry", 3)
      // .attr("fill", function(d) { return color(d.group); })
      .attr("fill", "steelblue")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  var lables = rectNode.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  rectNode.append("title")
      .text(function(d) { return d.id; });

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })    

    rectNode
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }
})