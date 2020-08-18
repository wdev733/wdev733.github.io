var colorArray = {
    "mother": "#ffe3fa",
    "father": "#cfe5fb"
};

var marriedCircleWidth = 20,
    marriedTextFontSize = 12;
var fontSizeArray = [10, 10, 8, 8, 8, 5, 3, 3];
var marriedFontSizeArray = [10, 10, 10, 10, 8, 6, 3];

var width = 1000,
    height = 1000,
    radius = 50 * Math.max(width, height) / 100,
    x = d3.scaleLinear().range([0, 2 * Math.PI]),
    y = d3.scaleLinear().domain([0, 1]).range([0, radius]);
padding = 5;

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + padding * 2)
    .attr("height", height + padding * 2)
    .append("g")
    .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");

var partition = d3.partition();

var arc = d3.arc()
    .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function(d) {
        return Math.max(0, y(d.y0)) + marriedCircleWidth;
    })
    .outerRadius(function(d) {
        return Math.max(0, y(d.y1));
    });

const middleArcLine1 = d => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    var step = (y(d.y1) - y(d.y0) - marriedCircleWidth) / 5;
    const r = Math.max(0, (y(d.y0) + marriedCircleWidth + step));

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw

    if (invertDirection) {
        angles.reverse();
    }

    const path = d3.path();

    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const middleArcLine2 = d => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    var step = (y(d.y1) - y(d.y0) - marriedCircleWidth) / 5;
    const r = Math.max(0, (y(d.y0) + marriedCircleWidth + 2 * step));

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw

    if (invertDirection) {
        angles.reverse();
    }

    const path = d3.path();

    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const middleArcLine3 = d => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    var step = (y(d.y1) - y(d.y0) - marriedCircleWidth) / 5;
    const r = Math.max(0, (y(d.y0) + marriedCircleWidth + 3 * step));

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw

    if (invertDirection) {
        angles.reverse();
    }

    const path = d3.path();

    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const middleArcLine4 = d => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    var step = (y(d.y1) - y(d.y0) - marriedCircleWidth) / 5;
    const r = Math.max(0, (y(d.y0) + marriedCircleWidth + 4 * step));

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw

    if (invertDirection) {
        angles.reverse();
    }

    const path = d3.path();

    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const middleMarriedArcLine = d => {
    if (d.children) {
        const halfPi = Math.PI / 2;
        const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];

        var angle = x(d.x0 + (d.x1 - d.x0) / 2) * 180 / Math.PI - 90;

        if (angle >= 180 || angle <= 0) {
            var r = (Math.max(0, y(d.children[1].y0)) + marriedCircleWidth + Math.max(0, y(d.y1))) / 2 - marriedFontSizeArray[d.depth] / 2;
        } else {
            var r = (Math.max(0, y(d.children[1].y0)) + marriedCircleWidth + Math.max(0, y(d.y1))) / 2 + marriedFontSizeArray[d.depth] / 4;
        }

        const middleAngle = (angles[1] + angles[0]) / 2;
        const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
        if (invertDirection) {
            angles.reverse();
        }
        const path = d3.path();
        path.arc(0, 0, r, angles[0], angles[1], invertDirection);
        return path.toString();
    }
    return "";
};


var married_arc = d3.arc()
    .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function(d) {
        return Math.max(0, y(d.children[1].y0)) + marriedCircleWidth;
    })
    .outerRadius(function(d) {
        return Math.max(0, y(d.y1));
    });

var minY = 0;
var maxY = 2;

var currentdepth = 0;
var currentobject = 0;
var currentid = 0;
var rootobject = 0;

function updateGraph(path) {
    d3.json("fulldata.json", function(data) {
        var tree_data = makeTreeData(data);
        buildGraph(tree_data);
    })
}

function buildGraph(jsondata) {
    var root = d3.hierarchy(jsondata);
    root.sum(function(d) {
        return d.children ? 0 : 1;
    });

    svg.selectAll("path.married-arc")
        .data(partition(root).descendants().filter(function(d) {
            return d.depth < root.height;
        }))
        .enter()
        .append("path")
        .attr('attr-depth', (d) => d.depth)
        .attr('class', 'married-arc')
        .attr("d", married_arc)
        .style("fill", "#eee");

    var inner_arc_wrapper = svg.selectAll(".inner_arc_wrapper")
        .data(partition(root).descendants().filter(function(d) {
            return d.height > 1;
        }))
        .enter().append('g').attr('class', d => {
            return 'inner_arc_wrapper depth_' + d.depth
        });

    inner_arc_wrapper
        .append("path")
        .attr('class', 'main-arc')
        .attr("id", function(d, i) {
            if (i == 0) {
                rootobject = d;
            }
            if (d.id == currentid) {
                currentobject = d;
            }
            return "path-" + i;
        }).style("fill", function(d) {
            if (d.data.gender == "root") {
                return "white";
            }
            return colorArray[d.data.gender];
        })
        .attr("d", arc)

    inner_arc_wrapper.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc1${i}`)
        .attr('d', middleArcLine1);

    inner_arc_wrapper.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc2${i}`)
        .attr('d', middleArcLine2);

    inner_arc_wrapper.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc3${i}`)
        .attr('d', middleArcLine3);

    inner_arc_wrapper.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc4${i}`)
        .attr('d', middleArcLine4);

    inner_arc_wrapper.append('path')
        .attr('class', 'hidden-married-arc')
        .attr('id', (_, i) => `hiddenMarriedArc${i}`)
        .attr('d', middleMarriedArcLine);


    let textInfo = inner_arc_wrapper.append('text').style('font-size', d => {
        return fontSizeArray[d.depth]
    })

    textInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#hiddenArc1${i}`)
        .text(d => d.data.first);

    textInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#hiddenArc2${i}`)
        .text(d => d.data.last);

    textInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#hiddenArc3${i}`)
        .text(d => d.data.birth);

    textInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#hiddenArc4${i}`)
        .text(d => d.data.died);

    let marriedInfo = inner_arc_wrapper.append('text').attr('class', 'married-info-text').style('font-size', d => {
        return marriedFontSizeArray[d.depth]
    })

    marriedInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#hiddenMarriedArc${i}`)
        .text(d => d.data.married);


    // Outer 4 circles
    var outer_arc_wrapper = svg.selectAll(".outer_arc_wrapper")
        .data(partition(root).descendants().filter(function(d) {
            return d.height <= 1;
        }))
        .enter().append('g').attr('class', 'outer_arc_wrapper');

    outer_arc_wrapper
        .append("path")
        .attr('class', 'main-arc')
        .attr("id", function(d, i) {
            if (i == 0) {
                rootobject = d;
            }
            if (d.id == currentid) {
                currentobject = d;
            }
            return "path-" + i;
        }).style("fill", function(d) {
            if (d.data.gender == "root") {
                return "white";
            }
            return colorArray[d.data.gender];
        })
        .attr("d", arc);

    outer_arc_wrapper.append('path')
        .attr('class', 'hidden-married-arc')
        .attr('id', (_, i) => `outerhiddenMarriedArc${i}`)
        .attr('d', middleMarriedArcLine);

    outermarriedInfo = outer_arc_wrapper.append('text').attr('class', 'married-info-text').style('font-size', d => {
        return marriedFontSizeArray[d.depth]
    });

    outermarriedInfo.append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', (_, i) => `#outerhiddenMarriedArc${i}`)
        .text(d => d.data.married);

    //add text
    var text = svg.selectAll("text.out")
        .data(partition(root).descendants().filter(function(d) {
            return d.height <= 1;
        }));

    var textEnter = text
        .enter()
        .append("text")
        .attr('class', 'out')
        //starting opacity
        //hides all those but the inner ring
        .style("pointer-events", "none")
        //color fill
        //#000000 is black
        .style("font-size", d => {
            return fontSizeArray[d.depth]
        })
        .style("line-height", d => {
            return fontSizeArray[d.depth]
        })
        .style("fill", "#000000")
        .attr("text-anchor", "middle")
        //checks for multiline names
        .attr("transform", function(d) {
            var multiline = true,
                angle = x(d.x0 + (d.x1 - d.x0) / 2) * 180 / Math.PI - 90;

            if (angle < 90) {
                var rotate = angle - .5;
            } else {
                var rotate = angle + .5;
            }
            
            return "rotate(" + rotate + ")translate(" + (y(d.y0) + 2 * marriedCircleWidth) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })

    //1st row of text
    textEnter
        .append("tspan")
        .attr("x", 0)
        .text(d => d.data.first);

    //2nd row of text
    textEnter
        .append("tspan")
        .attr("x", 0)
        .attr('dy', '1em')
        .text(d => d.data.last);

    //3rd row
    textEnter
        .append("tspan")
        .attr("x", 0)
        .attr('dy', '1em')
        .text(d => d.data.birth);

    //fourth row (if necessary)
    textEnter
        .append("tspan")
        .attr("x", 0)
        .attr('dy', '1em')
        .text(d => d.data.died);

    // var g_wrapper = svg.selectAll('.g_wrapper').data(partition.nodes(root)).enter().append('g').attr('class','g_wrapper');

    d3.select('g.depth_0').append('text').attr('x', 0).attr('y', -15).attr('class', 'root').attr('font-size', (d) => fontSizeArray[d.depth]).text((d) => d.data.first);
    d3.select('g.depth_0').append('text').attr('x', 0).attr('y', 0).attr('class', 'root').attr('font-size', (d) => fontSizeArray[d.depth]).text((d) => d.data.last);
    d3.select('g.depth_0').append('text').attr('x', 0).attr('y', 15).attr('class', 'root').attr('font-size', (d) => fontSizeArray[d.depth]).text((d) => d.data.birth);
    d3.select('g.depth_0').append('text').attr('x', 0).attr('y', 30).attr('class', 'root').attr('font-size', (d) => fontSizeArray[d.depth]).text((d) => d.data.die);

}

window.onload = function() {
    updateGraph();
}

function makeTreeData(data) {
    let res = insertData(data);
    return res;
}

function insertData(data, gender = "root") {
    let res = {};
    let tmp = {};
    tmp.name = data.first + " " + data.last;
    tmp.birth = data.birth;
    tmp.first = data.first;
    tmp.last = data.last;
    tmp.died = data.died;
    tmp.gender = gender;
    if (Object.keys(data).includes('parents')) {
        tmp.children = [];
        tmp.children.push(insertData(data.parents.mother, "mother"));
        tmp.children.push(insertData(data.parents.father, "father"));
        tmp.married = data.parents.married;
    }
    res = tmp;
    return res;
}