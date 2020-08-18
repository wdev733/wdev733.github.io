var wrapperWidth = $("#chart_wrapper").width(),
    height = 500,
    margin = {
        left: 50,
        right: 300,
        top: 100,
        bottom: 50
    };

var width = wrapperWidth - margin.left - margin.right;
var radius = d3.scaleLinear().rangeRound([0,50]); // Node circle radius;

var myColor = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#chart_wrapper").append('svg').attr("width", width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

var x = d3.scaleTime().rangeRound([0, width]);
var x_axis = d3.axisBottom(x);

var parseTime = d3.timeParse("%d-%b-%Y");
var xFormat = "%d-%b-%Y";

var y = d3.scaleLinear().rangeRound([height,0]);
var y_axis = d3.axisLeft(y);

var yOption = 'revenue';
var rOption = 'finance';
var jsonData;
d3.csv("assets/bubble2.csv").then(function(data) {
    var industries = [];

    data.forEach(function(d){
        if(!industries.includes(d['Industry Focus'])){
            industries.push(d['Industry Focus']);
        }
        d['group'] = d['Industry Focus'];
        d['finance'] = parseFloat(d['Last Financing Size (in mm)']);
        d['revenue'] = parseFloat(d['Revenue (in mm)']);
        d['name'] = d['Company Name'];
        d['date'] = d['Year Founded'];
        d['description'] = d['Description'];
    })

    jsonData = data;

    myColor.domain(industries);
    
    x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));
    y.domain([0, d3.max(data.map(function(d){return parseFloat(d[yOption])}))]);       
    radius.domain([0, d3.max(data.map(function(d){return parseFloat(d[rOption])}))]);

    // console.log(d3.max(data.map(function(d){return parseFloat(d[rOption])})));
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)));

    // Add the Y Axis
    svg.append("g")
        .attr('class','y axis')
        .call(d3.axisLeft(y));

    svg
        .append("text").attr('class','y_label_text')
        .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
        .text(changeText(yOption));

    var wrapper = svg.selectAll('.circle_wrapper').data(data).enter().append('g').attr('class','circle_wrapper');

    wrapper.append('circle')
        .attr('class','node_circle')
        .attr('cx',(d)=>x(parseTime(d.date)))
        .attr('cy',(d)=>y(d[yOption]))
        .attr('r',(d)=>radius(d[rOption]))
        .attr('fill',(d)=>myColor(d['group']))
        .on('mouseover',function(d) {
            d3.select(this.parentNode).select('text').classed('hide',false);
            d3.select('.description').html(d.description);
        })
        .on('mouseout',function () {
            d3.select(this.parentNode).select('text').classed('hide',true);
            d3.select('.description').html('');
        });

    wrapper.append('text').attr('class','node_text hide').attr("x",(d)=>x(parseTime(d.date))).attr('y',(d)=>y(parseFloat(d[yOption])) - radius(d[rOption]) - 5).text((d)=>d.name).attr('text-anchor','middle');

    var legend_wrapper = svg.append('g').attr('class','legend_wrapper').attr("transform","translate("+(wrapperWidth - 300) + ',0)');
    legend_wrapper.append('text').attr('x',0).attr('y', 0).text('X axis : Time');
    legend_wrapper.append('text').attr('class','y_axis_legend').attr('x',0).attr('y', 20).text('Y axis : ' + changeText(yOption));
    legend_wrapper.append('text').attr('class','radius_legend').attr('x',0).attr('y', 40).text('Radius : ' + changeText(rOption));
    var legend = legend_wrapper.selectAll('.legend').data(industries).enter().append('g').attr('class','legend').attr('transform',function(d,i){
        return "translate(0," + ((i+2) * 30) + ")";
    });
    legend.append('circle').attr('cx', 0).attr('cy',10).attr('r', 10).attr("fill",(d)=>myColor(d));
    legend.append('text').attr('x', 15).attr('y',15).text((d)=>d);
});

$("#swap_btn").click(function(){
    if(yOption == "revenue"){
        yOption = 'finance';
    }else{
        yOption = 'revenue';
    }

    if(rOption == 'finance'){
        rOption = 'revenue';
    }else{
        rOption = 'finance';
    }

    // if(yOption == 'finance'){
    //     $('.yoption_span').html("Last Financing Size (in mm)");        
    // }else{
    //     $('.yoption_span').html("Revenue (in mm)");        
    // }
    
    // if(rOption == 'finance'){
    //     $('.roption_span').html("Last Financing Size (in mm)");        
    // }else{
    //     $('.roption_span').html("Revenue (in mm)");        
    // }

    updateChart(yOption, rOption);
});

function updateChart(yOption, rOption){
    y.domain([0, d3.max(jsonData.map(function(d){return parseFloat(d[yOption])}))]);

    svg.select(".y.axis")
        .transition()
        .duration(500)
        .call(y_axis);

    radius.domain([0, d3.max(jsonData.map(function(d){return parseFloat(d[rOption])}))]);


    svg.selectAll('.node_circle').transition().duration(500).attr('r',(d)=>radius(d[rOption])).attr('cy',(d)=>y(parseFloat(d[yOption])));
    svg.selectAll('.node_text').transition().duration(500).attr('y',(d)=>y(parseFloat(d[yOption])) - radius(parseFloat(d[rOption])) - 5);

    svg.select('.y_label_text').text(changeText(yOption));

    svg.select('.y_axis_legend').text('Y axis : ' + changeText(yOption));
    svg.select('.radius_legend').text('Radius : ' + changeText(rOption));
}


function changeText(text){
    if(text == "revenue"){
        return "Revenue (in mm)";       
    }else if(text == "finance"){
        return "Last Financing Size (in mm)";
    }
}