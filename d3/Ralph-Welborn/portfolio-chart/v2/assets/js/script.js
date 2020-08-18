var wrapperWidth = $("#chart_wrapper").width(),
    wrapperHeight = 800;

var margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50
};

var optionData, csvData;
var width = wrapperWidth - margin.left - margin.right;
var height = wrapperHeight - margin.top - margin.bottom;
var svg = d3.select("#chart_wrapper").append('svg')
.attr("width", wrapperWidth).attr("height", wrapperHeight).append("g")
.attr("transform", 'translate(' + margin.left + ',' + margin.top + ')'),
format = d3.format(",d");

var colorScale;

var colorOptions = [];
var treemap = d3.treemap()
    .padding(1)
    .round(true);

function sumByTime(d) {
    return d['Investment in'];
}

function sumByCost(d) {
    return d['Revenue'];
}

var x = d3.scaleLinear().range([0, width]);
var x_axis = d3.axisBottom(x);

d3.csv("assets/box2.csv").then(function(data) {
    d3.json("filter-data.json").then(function(option) {

        var maxColorCnt = d3.max(option.filters[0].children, function(d) {
            return d.children.length
        });

        colorScale = d3.scaleOrdinal(d3.schemeBlues[maxColorCnt]);

        option.filters[0].children.forEach(function(d) {
            if (d.name == $("input[name='colorby']:checked").val()) {
                colorOptions = d.children;
            }
        });

        colorScale.domain(colorOptions);
        drawLengeds();

        //initalize global variables 
        csvData = data;
        optionData = option;

        var newData = getData();        
        drawChart(newData);
    })
})

//get filtered data by sidebar options
function getData() {
    var viewby = $("input[name='viewby']:checked").val(),
        viewValue = $("#viewBySelect").val();

    csvData.forEach(function(datum) {
        colorOptions.forEach((color) => {
            if (datum[color] == "x") {
                datum['color'] = color;
            }
        })
    });

    return csvData;
}

//draw chart from new data with sidebar options
function drawChart(data) {
    var viewby = $("input[name='viewby']:checked").val(),
        sizeby = $("input[name='sizeby']:checked").val(),
        viewValue = $("#viewBySelect").val();
    var groupby = "Portfolio";

    var businessUnitData = d3.nest()
        .key(function(d) {
            return d[groupby];
        })
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return d[sizeby];
            });
        })
        .entries(data);

    x.domain([0, d3.sum(businessUnitData, function(d) {
        return d.value
    })]);

    businessUnitData.forEach(function(u, i) {
        var x = 0;
        for (var j = 0; j < i; j++) {
            x += businessUnitData[j]['value'];
        }

        u.startX = x;
    })

    svg.html('');

    var units_g = svg.selectAll('.unit_g').data(businessUnitData).enter().append('g').attr('class', (d, i) => 'unit_g unit_' + i).attr('transform', (d) => "translate(" + x(d.startX) + ",0)");
    units_g.append('rect').attr('x', 0).attr("width", (d) => x(d.value)).attr("y", -50).attr("height", 50)
        .attr('fill', 'black')
        .attr('fill-opacity', 0.7);
    units_g.append('text').attr("x", 10).attr('y', -20).text((d) => d.key).attr("fill", 'white');

    businessUnitData.forEach(function(d, i) {
        var newData = data.filter(function(datum) {
            return datum[groupby] == d.key
        });

        // var newData = data;
        var departmentData = d3.nest()
            .key(function(d) {
                return d[groupby];
            })
            .entries(newData);

        var newObj = new Object;
        newObj["name"] = d.key;
        newObj["children"] = departmentData[0].values;

        var sum;
        if (sizeby == "Revenue") {
            sum = sumByCost;
        } else if (sizeby == "Investment in") {
            sum = sumByTime;
        }
        var root = d3.hierarchy(newObj)
            .eachBefore(function(d) {
                d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
            })
            .sum(sum)
            .sort(function(a, b) {
                return b.height - a.height || b.value - a.value;
            });

        treemap.size([x(d.value), height]);
        treemap(root);

        var selectorEle = '.unit_' + i;

        var cell = d3.select(selectorEle).selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", function(d) {
                return "translate(" + d.x0 + "," + d.y0 + ")";
            });

        cell.append("rect")
            .attr("class", "tree-rect")
            .attr("id", function(d) {
                return d.data.id;
            })
            .attr("width", function(d) {
                return d.x1 - d.x0;
            })
            .attr("height", function(d) {
                return d.y1 - d.y0;
            })
            .attr('fill', function(d) {
                return colorScale(d.data.color);
            })

        cell.append("clipPath")
            .attr("id", function(d) {
                return "clip-" + d.data.id.replace(/\s+/g, '-').toLowerCase();
            })
            .append("use")
            .attr("xlink:href", function(d) {
                return "#" + d.data.id;
            });

        cell.append("text")
            .attr("clip-path", function(d) {
                return "url(#clip-" + d.data.id.replace(/\s+/g, '-').toLowerCase() + ")";
            })
            .attr("x", (d) => 5)
            .attr("y", (d) => 15)
            .attr("dy", ".1em")
            .attr('text-anchor', 'start')
            .text(function(d) {
                return d.data.Company;
            }).call(wrap, 100);
        
        cell.append("title")
            .text(function(d) {
                return d.data.Company + " - " + $("input[name='sizeby']:checked").val() + " : " + format(d.value);
            });

    })
}

//trigger events when sidebar options changed
$(document).on('change', 'input[name="colorby"]', function() {
    optionData.filters[0].children.forEach(function(d) {
        if (d.name == $("input[name='colorby']:checked").val()) {
            colorOptions = d.children;
        }
    });
    colorScale = d3.scaleOrdinal(d3.schemeBlues[colorOptions.length]);
    colorScale.domain(colorOptions);
    updateColor();
});

$(document).on('change', 'input[name="sizeby"]', function() {
    var newData = getData();
    drawChart(newData);
});


//get sub filter from "Lense, Lens, button"
function getSubFilters() {
    var selectedFilter = $("#filterbySelect").val();

    $("#filter_radio_section").html("");
    optionData.filters.forEach(function(opt) {
        if (opt.name == selectedFilter) {
            opt.children.map(function(o) {
                return o.name
            }).forEach(function(n) {
                var html = '<input type="radio" name="filter" value="' + n + '"/>' + n;
                $("#filter_radio_section").append(html);
            })
        }
    })
}

//get option values of View By Select element.
function viewBySelectUpdate() {
    var viewby = $("input[name='viewby']:checked").val();
    var viewbyOptions = [];

    csvData.map(function(d) {
        return d[viewby]
    }).forEach(function(d) {
        if (!viewbyOptions.includes(d)) {
            viewbyOptions.push(d);
        }
    })
    $("#viewBySelect").html('');
    viewbyOptions.forEach(function(opt) {
        var html = '<option value="' + opt + '">' + opt + '</option>';
        $("#viewBySelect").append(html);
    })
}

function wrap(text, width) {
    text.each(function() {
        var breakChars = ['/', '&', '-'],
            text = d3.select(this),
            textContent = text.text(),
            spanContent;

        breakChars.forEach(char => {
            // Add a space after each break char for the function to use to determine line breaks
            textContent = textContent.replace(char, char + ' ');
        });

        var words = textContent.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr('x'),
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy') || 0),
            tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                spanContent = line.join(' ');
                breakChars.forEach(char => {
                    // Remove spaces trailing breakChars that were added above
                    spanContent = spanContent.replace(char + ' ', char);
                });
                tspan.text(spanContent);
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
            }
        }
    });

}

function updateColor() {
    drawLengeds();
    d3.selectAll(".tree-rect")
        .transition().duration(500)
        .attr('fill', function(d) {
            return colorScale(d.data.color);
        })
}

function drawLengeds() {
    d3.select("#legends_wrapper").html('');
    var leg_svg = d3.select("#legends_wrapper").append('svg').attr("width", 300).attr("height", 300).append("g").attr("transform", 'translate(20,30)');
    var leg_wrapper = leg_svg.selectAll('g').data(colorOptions).enter().append('g').attr("transform", (d, i) => {
        return "translate(0," + 30 * i + ")";
    });
    leg_wrapper.append('rect').attr('x', 0).attr('y', 0).attr('width', 20).attr('height', 20).attr('fill', (d) => colorScale(d));
    leg_wrapper.append('text').attr('x', 30).attr('y', 15).text((d) => d);

}