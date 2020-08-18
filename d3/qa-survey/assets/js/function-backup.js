// path graph
function pathGraph(jsonData) {
    var margin = {
        top: 50,
        left: 50
    };
    var nodes = [],
        linksArray = [],
        nodeIds = [],
        links = [],
        uniqueLinks = [],
        nodesObject = new Object;

    var width = 3000,
        height = 750; // todo: set width dynamically based on content
    var svg = d3.select("#decisionpaths").append('svg').attr("width", "3000px").attr("height", "800px").append("g").attr("transform", "translate(" + margin.top + "," + margin.left + ")");

    var xLevel = 0,
        yLevel = 0;

    var x = d3.scaleBand().range([0, width]).paddingInner(0.1);
    var y = d3.scaleBand().range([0, height]).paddingInner(0.1);

    var strokeWidth = d3.scaleLinear().range([3, 50]);

    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function(array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length !== array.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            } else if (this[i] !== array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {
        enumerable: false
    });


    Object.keys(jsonData).forEach(function(key) {
        var path = jsonData[key];

        var link = [];
        path.forEach(function(p) {
            if (p.pageid !== undefined) {
                p.id = p.pageid;
                if (!nodeIds.includes(p.pageid)) {
                    nodeIds.push(p.pageid);
                    var tmp = {};
                    tmp.id = p.pageid;
                    tmp.highlight = p.highlight;
                    tmp.label = p.label;
                    tmp.type = p.type;
                    tmp.cnt = 1;
                    nodes.push(tmp);
                } else {
                    nodes.forEach(function(n) {
                        if (n.id === p.pageid) {
                            n.cnt = n.cnt + 1;
                        }
                    })
                }
                link.push(p.pageid);
            } else if (p.decisionid !== undefined) {
                p.id = p.decisionid;
                if (!nodeIds.includes(p.decisionid)) {
                    nodeIds.push(p.decisionid);
                    var tmp = {};
                    tmp.id = p.decisionid;
                    tmp.highlight = p.highlight;
                    tmp.label = p.label;
                    tmp.cnt = 1;
                    nodes.push(tmp);
                } else {
                    nodes.forEach(function(n) {
                        if (n.id === p.decisionid) {
                            n.cnt = n.cnt + 1;
                        }
                    })
                }
                link.push(p.decisionid);
            } else if (p.type === "exit") {
                link.push("exit_" + p.endstatus);
                p.id = "exit_" + p.endstatus;
            }
        });

        linksArray.push(link);
        if (!isArrayInArray(uniqueLinks, link)) {
            uniqueLinks.push(link);
        }
    });


    var newPaths = Object.values(jsonData).sort(function(a, b) {
        return b.length - a.length
    });

    var allIds = [];
    xLevel = d3.max(uniqueLinks.map(function(ul) {
        return ul.length;
    }));

    uniqueLinks.forEach(function(ul) {
        var i = 0;
        linksArray.forEach(function(l) {
            if (ul.equals(l)) {
                i++;
            }
        });
        var tmp = {};
        tmp.weight = i;
        tmp.path = ul;
        links.push(tmp);
    });

    for (var i = 0; i < xLevel; i++) {
        nodesObject[i] = [];
    }

    newPaths.forEach(function(p) {
        p.forEach(function(l, i) {
            if (!allIds.includes(l.id)) {
                allIds.push(l.id);
                if (nodesObject[i].map(function(n) {
                        return n.id
                    }).includes(l.id)) {
                    nodesObject[i].forEach(function(a) {
                        if (a.id === l.id) {
                            a.cnt = a.cnt + 1;
                        }
                    })
                } else {
                    l.cnt = 1;
                    nodesObject[i].push(l);
                }
            } else {
                if (nodesObject[i].map(function(n) {
                        return n.id
                    }).includes(l.id)) {
                    nodesObject[i].forEach(function(a) {
                        if (a.id === l.id) {
                            a.cnt = a.cnt + 1;
                        }
                    })
                }
            }
        })
    });

    var uniqueLinkArray = [];
    uniqueLinks.forEach(function(ul) {
        ul.forEach(function(u, i) {
            if (ul[i + 1] === undefined) {} else {
                var tmp = {};
                tmp['from'] = u;
                var toIds = uniqueLinkArray.filter(function(d) {
                    return d.from === u
                }).map(function(d) {
                    return d.to
                });
                tmp['to'] = ul[i + 1];
                if (!toIds.includes(tmp['to'])) {
                    uniqueLinkArray.push(tmp);
                }
            }
        })
    });
    var strokeMax = d3.max(nodes.map(function(n) {
        return n.cnt
    }));

    x.domain(Object.keys(nodesObject));
    
    var yMax = d3.max(Object.values(nodesObject).map(function(d) {
        return d.length
    }));

    var yDomain = [];
    for (var i = 0; i < yMax; i++) {
        yDomain.push(i);
    }
    y.domain(yDomain);

    strokeWidth.domain([0, strokeMax]);

    var g_links = svg.append("g").attr('class', "g_links");
    g_links.selectAll('.link').data(uniqueLinkArray).enter().append('line').attr('class', 'link')
        .attr("x1", function(d) {
            var key = findKey(nodesObject, d.from);
            return x(key[0]);
        })
        .attr("y1", function(d) {
            var key = findKey(nodesObject, d.from);
            return y(key[1]);
        }).attr('x2', function(d) {
            var key = findKey(nodesObject, d.to);
            return x(key[0]);
        }).attr('y2', function(d) {
            var key = findKey(nodesObject, d.to);
            return y(key[1]);
        })
        .attr('stroke-width', function(d) {
            var key = findKey(nodesObject, d.to);
            var tmp = nodesObject[key[0]][key[1]].cnt;
            return strokeWidth(tmp);
        });

    var g_node = svg.selectAll('.node_g').data(Object.values(nodesObject)).enter().append('g').attr('class', 'node_g').attr('transform', function(d, i) {
        return "translate(" + x(i) + ",0)"
    });
    g_node.selectAll('.node').data(function(d) {
            return d;
        }).enter().append('circle').attr('class', 'node')
        .attr('cx', function(d) {
            return 0;
        }).attr('cy', function(d, i) {
            return y(i)
        }).attr('r', 20).attr('fill', '#0268fb')
        .on("mousemove", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(function() {
                    if (d.label == undefined) {
                        return "Exit:" + d.endstatus;
                    }
                    return d.label;
                })
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    g_node.selectAll("text").data(function(d) {
        return d;
    }).enter().append("text").attr("x", function(d) {
        return x(d.id)
    }).attr("y", function(d, i) {
        return y(i)
    }).attr("text-anchor", "middle").text(function(d) {
        return d.cnt
    });

    function isArrayInArray(arr, item) {
        var item_as_string = JSON.stringify(item);

        var contains = arr.some(function(ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }

    function findKey(obj, value) {
        var key = [];

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var ids = obj[prop].map(function(d) {
                    return d.id
                });
                if (ids.includes(value)) {
                    key[0] = prop;
                    key[1] = ids.indexOf(value);
                }
            }
        }

        return key;
    }
}