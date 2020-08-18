var margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 10
    },
    width = 1620 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var y = d3.scale.linear()
    .range([height, 0]);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);


var xAxisScale = d3.scale.linear()
    .domain([1987, 2015])
    .range([ 0, width]);

var xAxis = d3.svg.axis()
    .scale(xAxisScale)
    .orient("bottom")
    .tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", type, function(error, data) {
    x.domain(data.map(function(d) {
        return d.Date;
    }));
    y.domain(d3.extent(data, function(d) {
        return d.Percent;
    })).nice();

    var ele_g = svg.selectAll(".bar")
        .data(data)
        .enter().append('g');
        
        ele_g.append("rect")
        .attr("class", function(d) {
            if (d.Percent < 0){
                return "bar negative";
            } else {
                return "bar positive";
            }

        })
        .attr("data-yr", function(d){
            return d.Date;
        })
        .attr("data-c", function(d){
            return d.Percent;
        })
        .attr("title", function(d){
            return (d.Date + ": " + d.Percent + "%")
        })
        .attr("y", function(d) {
            if (d.Percent > 0){
                return y(d.Percent);
            } else {
                return y(0);
            }

        })
        .attr("x", function(d) {
            return x(d.Date);
        })
        .attr("rx",5)
        .attr("ry",5)
        .attr("width", x.rangeBand())
        .attr("height", function(d) {
            return Math.abs(y(d.Percent) - y(0));
        })
            
    ele_g.append('text')
        .attr("text-anchor","middle")
        .attr("x",function(d){return x(d.Date)+x.rangeBand()/2})
        .attr("y",function(d){
            if(d.Percent>0) {
                return y(d.Percent);
            }else{
                return y(0);
            }
        })
        .text((d)=>d.Percent+" %")
        .style("color","white");
    svg.append("g")
        .attr("class", "X axis")
        .attr("transform", "translate(" + (margin.left - 6.5) + "," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "x axis")
        .append("line")
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("x2", width);

    svg.append("g")
        .attr("class", "infowin")
        .attr("transform", "translate(50, 5)")
        .append("text")
        .attr("id", "_yr");

    svg.append("g")
        .attr("class", "infowin")
        .attr("transform", "translate(110, 5)")
        .append("text")
        .attr("id","degrree");

});


function type(d) {
    d.Percent = +d.Percent;
    return d;
}
