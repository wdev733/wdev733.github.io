/* global d3 */
var nodes1 = makeNodes(data);

var links1 = data.filter(function(d) {
    return d.from != d.to
});

var graph = new Object;
graph['nodes'] = [];
nodes1.forEach(function(node) {
    var tmp = new Object;
    tmp['id'] = node['from'];
    tmp['group'] = Math.floor((Math.random() * 100) % 4);
    tmp['color'] = node['color'];
    tmp['shape'] = node['shape'];
    tmp['size'] = node['size'];
    tmp['uuid'] = node['uuid'];
    graph['nodes'].push(tmp);

})


graph['links'] = [];
links1.forEach(function(link, i) {
    var tmp1 = new Object;
    tmp1['source'] = link['from'];
    tmp1['target'] = link['to'];
    tmp1['value'] = link['width'];
    graph['links'].push(tmp1);
});

const nodes = graph.nodes;
const links = graph.links;

const width = $("#chart_wrapper").width();
const height = 800;

// separation between same-color circles
const padding = 90; // 1.5

// separation between different-color circles
const clusterPadding = 160; // 6

const maxRadius = 12;

const z = d3.scaleOrdinal(d3.schemeCategory20);

// total number of nodes
const n = nodes.length;

// detect communities with jsLouvain
var nodeData = nodes.map(function(d) {
    return d.id
});
var linkData = links.map(function(d) {
    return {
        source: d.source,
        target: d.target,
        weight: d.weight
    };
});

var community = jLouvain()
    .nodes(nodeData)
    .edges(linkData);

var result = community();

const defaultRadius = 15;
nodes.forEach(function(node) {
    node.r = node.size * 5;
    node.cluster = result[node.id]
});

// collect clusters from nodes
const clusters = {};
nodes.forEach((node) => {
    const radius = node.r;
    const clusterID = node.cluster;
    if (!clusters[clusterID] || (radius > clusters[clusterID].r)) {
        clusters[clusterID] = node;
    }
});

const svg = d3.select('#chart_wrapper')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'hide')
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 +')');

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("viewBox", '-0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('xoverflow', 'visible')
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke', 'none');

let link = svg.selectAll('line')
    .data(graph.links)
    .enter().append('line');

link
    .attr('attr-from', (d) => d.source)
    .attr('attr-to', (d) => d.target)
    .attr('class', 'link')
    .style('stroke', 'darkgray')
    .style('stroke-width', '2px')
    .attr("marker-end", "url(#triangle)");

const node_g = svg.selectAll('.node_g').data(nodes).enter().append('g').attr('class', (d) => 'node_g ' + d.shape)
    .on('mousedown', function(d) {
        $("#empty-menuitem").html(d.id);
        $("#container-menu").toggle(100)
            .css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });

        $("#empty-menuitem").on('click', function() {
            $("#container-menu").hide(100);
            showDiv(d, event.pageY, event.pageX);
        })
    })
    .on('mouseover', function(d) {
        d3.selectAll('.link').classed('inactive', true);
        d3.selectAll('.link').classed('active', false);
        d3.selectAll('g.node_g').classed('inactive', true);
        d3.selectAll('g.node_g').classed('active', false);
        d3.select(this).classed('active', true);
        $("[attr-from='" + d.id + "']").each(function() {
            $(this).addClass('active');
            var toId = $(this).attr('attr-to');
            $('[attr-id="' + toId + '"]').parent().addClass('active');
        })
        $("[attr-to='" + d.id + "']").each(function() {
            $(this).addClass('active');
            var fromId = $(this).attr('attr-from');
            $('[attr-id="' + fromId + '"]').parent().addClass('active');
        })
    })
    .on('mouseout', function(d) {
        d3.selectAll('.link').classed('inactive', false);
        d3.selectAll('.link').classed('active', true);
        d3.selectAll('g.node_g').classed('inactive', false);
        d3.selectAll('g.node_g').classed('active', true);
    })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );;

const circles = d3.selectAll('.circle').append('circle')
    .attr('attr-id', d => d.id)
    .attr('r', d => d.size * 5)
    .attr('fill', d => d.color)

const rounds = d3.selectAll('.round').append('rect')
    .attr("x", d => -d.size * 5)
    .attr("y", d => -d.size * 5)
    .attr('width', d => d.size * 10)
    .attr('height', d => d.size * 10)
    .attr('attr-id', d => d.id)
    .attr('rx', 5)
    .attr('ry', 5)
    // .attr('fill', d => z(d.cluster))      
    .attr('fill', d => d.color)

const square = d3.selectAll('.square').append('rect')
    .attr("x", d => -d.size * 2)
    .attr("y", d => -d.size * 2)
    .attr('width', d => d.size * 10)
    .attr('height', d => d.size * 10)
    .attr('attr-id', d => d.id)
    // .attr('fill', d => z(d.cluster))      
    .attr('fill', d => d.color);

const diamond = d3.selectAll('.diamond').append('polygon')
    .attr("points", d => [
        [-d.size * 5, 0],
        [0, -d.size * 5],
        [d.size * 5, 0],
        [0, d.size * 5]
    ])
    .attr('attr-id', d => d.id)
    .attr('fill', d => d.color);

const triangle = d3.selectAll('.triangle').append('polygon')
    .attr("points", d => [
        [-d.size * 5, d.size * 5],
        [0, -d.size * 5],
        [d.size * 5, d.size * 5]
    ])
    .attr('attr-id', d => d.id)
    .attr('fill', d => d.color);

const pentagon = d3.selectAll('.pentagon').append('polygon')
    .attr("points", d => [
        [-d.size * 4, d.size * 5],
        [-d.size * 5, 0],
        [0, -d.size * 4],
        [d.size * 5, 0],
        [d.size * 4, d.size * 5]
    ])
    .attr('attr-id', d => d.id)
    .attr('fill', d => d.color);

node_g.append('text').attr('x', -10).attr("y", 5)
    .text(d => d.id.substr(0, 2) + '..')
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

node_g.append("title").text(function(d) {
    return d.id;
});
const simulation = d3.forceSimulation()
    .nodes(nodes)
    .force('link', d3.forceLink().id(d => d.id))
    .velocityDecay(0.1)
    .force('x', d3.forceX().strength(0.05))
    .force('y', d3.forceY().strength(0.05))
    .force('collide', collide)
    .force('cluster', clustering)
    .force("center", d3.forceCenter(0, 0))
    .on('tick', ticked)
    .on('end', function() {
        d3.select('svg').classed("hide", false);
        d3.select('#loading').classed("hide", true);
    })

simulation.force('link')
    .links(graph.links)

function ticked() {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node_g
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
}

function dragstarted(d) {
    // if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    // if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// These are implementations of the custom forces
function clustering(alpha) {
    nodes.forEach((d) => {
        const cluster = clusters[d.cluster];
        if (cluster === d) return;
        let x = d.x - cluster.x;
        let y = d.y - cluster.y;
        let l = Math.sqrt((x * x) + (y * y));
        const r = d.r + cluster.r;
        if (l !== r) {
            l = ((l - r) / l) * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            cluster.x += x;
            cluster.y += y;
        }
    });
}

function collide(alpha) {
    const quadtree = d3.quadtree()
        .x(d => d.x)
        .y(d => d.y)
        .addAll(nodes);

    nodes.forEach((d) => {
        const r = d.r + maxRadius + Math.max(padding, clusterPadding);
        const nx1 = d.x - r;
        const nx2 = d.x + r;
        const ny1 = d.y - r;
        const ny2 = d.y + r;
        quadtree.visit((quad, x1, y1, x2, y2) => {
            if (quad.data && (quad.data !== d)) {
                let x = d.x - quad.data.x;
                let y = d.y - quad.data.y;
                let l = Math.sqrt((x * x) + (y * y));
                const r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding : clusterPadding);
                if (l < r) {
                    l = ((l - r) / l) * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.data.x += x;
                    quad.data.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    });
}

function makeNodes(data) {
    var res = [];
    var nodeNames = [];

    data.forEach(function(d) {
        var name = d.from;
        if (!nodeNames.includes(name)) {
            nodeNames.push(name);
            var tmp1 = new Object;
            tmp1['from'] = d.from;
            tmp1['shape'] = d['shape'];
            tmp1['color'] = d.color;
            tmp1['size'] = d.size;
            tmp1['uuid'] = d.id;
            res.push(tmp1);
        }
        name = d.to;
        if (!nodeNames.includes(name)) {
            nodeNames.push(name);
            var tmp1 = new Object;
            tmp1['from'] = d.to;
            tmp1['shape'] = d['shape'];
            tmp1['color'] = d.color;
            tmp1['size'] = d.size;
            tmp1['uuid'] = d.id;
            res.push(tmp1);
        }
    })
    return res;
}


function showDiv(d, top, left) {
    $("#modal-body").html('<h3>' + d.uuid + '</h3>');
    $("#node-detail-modal").css({
        top: (top - 100) + "px",
        left: (left - 100) + "px"
    }).show();
}

$('.close').on('click', function() {
    $("#node-detail-modal").hide();
})