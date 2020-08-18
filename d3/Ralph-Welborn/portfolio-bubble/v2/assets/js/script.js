var wrapperWidth = $("#chart_wrapper").width(),
    height = 500,
    margin = {
        left: 50,
        right: 350,
        top: 100,
        bottom: 70
    };

var xOption = "Fungibility (.1 - 1.0)";
var yOption = 'Pure Play (1-6) (1 = low)';
var rOption = 'Revenue Contribution (+ to 100%)';
var detailLevel = 1;

var width = wrapperWidth - margin.left - margin.right;
var radius = d3.scaleLinear().rangeRound([0, 50]); // Node circle radius;

var myColor = d3.scaleOrdinal();

var svg = d3.select("#chart_wrapper").append('svg').attr("width", width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

var x = d3.scaleLinear().rangeRound([0, width]);
var x_axis = d3.axisBottom(x);

var y = d3.scaleLinear().rangeRound([height, 0]);
var y_axis = d3.axisLeft(y);
var jsonData;

var indicator_g, xLine, yLine, xRect, xText, yRect, yText;
const div = d3
    .select('#chart_wrapper')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

var circlesWrapper;

function setToolTip(d){
    if(d[rOption] == parseInt(d[rOption])){
        return d['name'] + " : " + d[rOption];
    }else{
        return d['name'] + " : " + parseFloat(d[rOption]).toFixed(1);
    }
}
d3.csv("assets/bubble-data.csv").then(function(data) {
    var colorGroup = [];

    data.forEach(function(d) {

        var tmpC = d["Industry"];
        if (!colorGroup.includes(tmpC)) {
            colorGroup.push(tmpC);
        }

        if (detailLevel == 1) {
            d['name'] = d['Industry'] + d['Assets'];
        } else if (detailLevel == 2) {            
            d['name'] = d['Industry'] + d['Assets'] + d['Capabilities'];
        }

        d['x'] = d[xOption];
        d['y'] = d[yOption];
        d['r'] = d[rOption];
    })

    jsonData = data;

    graphData = updateData(detailLevel);
    var industryCnt = colorGroup.length;
    myColor = d3.scaleOrdinal(d3.schemeBrBG[industryCnt]).domain(colorGroup);    
    // x.domain(d3.extent(data, function(d) { return parseFloat(d.x); }));
    x.domain([0.1, 1.0]);
    // y.domain([0, d3.max(data.map(function(d){return parseFloat(d[yOption])}))]);
    y.domain([0, 6]);
    radius.domain([0, d3.max(graphData.map(function(d) {
        return parseFloat(d[rOption])
    }))]);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));

    svg
        .append("text").attr('class', 'y_label_text')
        .attr("transform", "translate(-35," + (height + margin.bottom) / 2 + ") rotate(-90)")
        .text(yOption);

    svg
        .append("text").attr('class', 'x_label_text')
        .attr("transform", "translate(" + ((margin.left + width) / 2) + "," + (height + 50) + ")")
        .attr('text-anchor', 'middle')
        .text(xOption);

    indicator_g = svg.append('g').attr('class', 'indicator_g hide');
    xLine = indicator_g.append("line").attr("class", "xLine").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 0);
    yLine = indicator_g.append("line").attr("class", "yLine").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 0);
    xRect = indicator_g.append("rect").attr("class", "xRect").attr('x', 0).attr('y', 0).attr('width', 50).attr('height', 20);
    yRect = indicator_g.append("rect").attr("class", "yRect").attr('x', 0).attr('y', 0).attr('width', 50).attr('height', 20);
    xText = indicator_g.append("text").attr("class", "xText").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").text("");
    yText = indicator_g.append("text").attr("class", "yText").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").text("");

    circlesWrapper = svg.append('g');
    var wrapper = svg.selectAll('circle').data(graphData).enter()
    .append('circle')
    .attr('attr-industry', d=>d.Industry)
        .attr('class', 'node_circle')
        .attr('cx', (d) => x(d[xOption]))
        .attr('cy', (d) => y(d[yOption]))
        .attr('r', (d) => radius(d[rOption]))
        .attr('fill', (d) => myColor(d.Industry))
        .on('mouseover', d => {            
            indicator_g.classed('hide', false);
            xLine.attr('x2', x(d[xOption])).attr('y1', y(d[yOption])).attr('y2', y(d[yOption]));
            yLine.attr('y2', y(d[yOption])).attr('x1', x(d[xOption])).attr('x2', x(d[xOption])).attr("y1", height);
            xRect.attr('x', x(d[xOption]) - 25).attr("y", height).attr('stroke', myColor(d.Industry));
            yRect.attr('x', -50).attr("y", y(d[yOption]) - 10).attr("stroke", myColor(d.Industry));
            xText.attr('x', x(d[xOption])).attr("y", height + 15).text(parseFloat(d[xOption]).toFixed(2));
            yText.attr('x', -25).attr("y", y(d[yOption]) + 5).text(parseFloat(d[yOption]).toFixed(2));
            div
                .transition()
                .duration(200)
                .style('opacity', 0.9);
            div
                .html(function(){
    if(d[rOption] == parseInt(d[rOption])){
        return d['name'] + " : " + d[rOption];
    }else{
        return d['name'] + " : " + parseFloat(d[rOption]).toFixed(1);
    }
})
                .style('left', (d3.event.layerX) + 'px')
                .style('top', (d3.event.layerY - 28) + 'px');
        })
        .on('mouseout', () => {
            indicator_g.classed('hide', true);
            div
                .transition()
                .duration(500)
                .style('opacity', 0);
        });

    var legend_wrapper = svg.append('g').attr('class','legend_wrapper').attr("transform","translate("+(wrapperWidth - 300) + ',0)').on("mouseout",function(){$('.inactive').removeClass('inactive')});
    
    var legend = legend_wrapper.selectAll('.legend').data(colorGroup).enter().append('g').attr('class','legend').attr('transform',function(d,i){
        return "translate(0," + ((i+2) * 30) + ")";
    }).on('mouseover',function(d){
        $(".node_circle").addClass('inactive');
        $("[attr-industry='"+d+"']").removeClass('inactive');
        $("[attr-industry='"+d+"']").addClass('active');
    }).on("mouseout",function(d){
        $(".node_circle").addClass('inactive');
        $(".node_circle").removeClass('active');
    }).on("mousedown",function(d){
        $(this).toggleClass('clicked');
        $("[attr-industry='"+d+"']").toggleClass('deactive');
    });
    legend.append('circle').attr('cx', 0).attr('cy',10).attr('r', 10).attr("fill",(d)=>myColor(d));
    legend.append('text').attr('x', 15).attr('y',15).text((d)=>d);
});

function updateChart(newData) {
    var circle = svg.selectAll(".node_circle")
        .data(newData);

    circle.exit().remove(); //remove unneeded circles
    circle.enter().append("circle").attr("attr-industry", d=>d.Industry).on('mouseover', d => {
            indicator_g.classed('hide', false);
            xLine.attr('x2', x(d[xOption])).attr('y1', y(d[yOption])).attr('y2', y(d[yOption]));
            yLine.attr('y2', y(d[yOption])).attr('x1', x(d[xOption])).attr('x2', x(d[xOption])).attr("y1", height);
            xRect.attr('x', x(d[xOption]) - 25).attr("y", height).attr('stroke', myColor(d.Industry));
            yRect.attr('x', -50).attr("y", y(d[yOption]) - 10).attr("stroke", myColor(d.Industry));
            xText.attr('x', x(d[xOption])).attr("y", height + 15).text(parseFloat(d[xOption]).toFixed(2));
            yText.attr('x', -25).attr("y", y(d[yOption]) + 5).text(parseFloat(d[yOption]).toFixed(2));

            div
                .transition()
                .duration(200)
                .style('opacity', 0.9);
            div
                .html(function(){

    if(d[rOption] == parseInt(d[rOption])){
        return d['name'] + " : " + d[rOption];
    }else{
        return d['name'] + " : " + parseFloat(d[rOption]).toFixed(1);
    }
                })
                .style('left', (d3.event.layerX) + 'px')
                .style('top', (d3.event.layerY - 28) + 'px');
        })
        .on('mouseout', () => {
            indicator_g.classed('hide', true);
            div
                .transition()
                .duration(500)
                .style('opacity', 0);
        })
        .transition()
        .duration(500)
        .attr("r", 0).attr('class', 'node_circle')
        .attr('cx', (d) => x(d[xOption]))
        .attr('cy', (d) => y(d[yOption]))
        .attr('r', (d) => radius(d[rOption]))
        .attr('fill', d=>myColor(d.Industry));

    //update all circles to new positions
    circle.transition()
        .duration(500)
        .attr('class', 'node_circle')
        .attr('cx', (d) => x(d[xOption]))
        .attr('cy', (d) => y(d[yOption]))
        // .attr('r', (d) => radius(d[rOption]))
        // .attr('fill', d=>myColor(d.Industry));
}

function updateLevel(value) {
    detailLevel = value;
}

$('.detaillevel input[type=radio]').on('change', function() {
    updateLevel(this.value);
    updateChart(updateData(this.value));
});

function updateData(level) {
    var result = [];
    if (level == 1) {
        var level1Data = d3.nest()
            .key(function(d) {
                return d['Industry'];
            })
            .key(function(d) {
                return d['Assets'];
            })
            .rollup(function(v) {
                return {
                    x: d3.sum(v, function(d) {
                        return d[xOption]
                    }) / v.length,
                    y: d3.sum(v, function(d) {
                        return d[yOption]
                    }) / v.length,
                    r: d3.sum(v, function(d) {
                        return d[rOption]
                    }) / v.length,
                    name: v[0]['Industry'] + ' / ' + v[0]['Assets'],
                }
            })
            .entries(jsonData);

        var idArrays = [];
        level1Data.forEach(function(lvl) {
            lvl.values.forEach(function(val) {
                var tmp1 = new Object;
                tmp1['Industry'] = lvl.key;
                tmp1['Assets'] = val.key;
                tmp1[xOption] = val.value.x;
                tmp1[yOption] = val.value.y;
                tmp1[rOption] = val.value.r;
                tmp1['name'] = val.value.name;
                var str = val.value.name.toLowerCase();
                tmp1['id'] = str.replace(/\s/g, '');
                result.push(tmp1);
            })
        })
        return result;
    } else if (level == 2) {
        return jsonData;
    }
}