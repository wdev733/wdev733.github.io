var wrapperWidth = $("#chart_wrapper").width(),
    height = 700,
    margin = {
        left: 150,
        right: 50,
        top: 50,
        bottom: 50
    };

var padding = {
    right:  50
}
var matrixWrapperWidth = 450;

var width = wrapperWidth - margin.left - margin.right - padding.right - matrixWrapperWidth;

var radius = d3.scaleLinear().rangeRound([0,50]); // Node circle radius;

var myColor = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#chart_wrapper").append('svg').attr("width", wrapperWidth).attr('height', height + margin.top + margin.bottom).append('g').attr("transform", "translate(" + margin.left + ',' + margin.top + ')');

var x = d3.scaleTime().rangeRound([0, width]);
var x_axis = d3.axisBottom(x);

var parseTime = d3.timeParse("%M/%d/%Y");
var xFormat = "%Y";

var y = d3.scaleBand().rangeRound([height * 3 / 4,0]);

var jsonData;
var yLine = d3.scaleLinear().rangeRound([height / 4,0]);

var matrixX = d3.scaleLinear().rangeRound([0,matrixWrapperWidth]);
var matrixY = d3.scaleLinear().rangeRound([height / 2,0]);

var industries = ["fund","idxa","idxb"];
var categoreis = ["fund","idxa","idxb", "dispersion", 'correlation'];
d3.json("assets/data.json").then(function(data) {
    data.forEach(function(d){      
        d['startDate'] = Date.parse(d['date']);
        var t = new Date(Date.parse(d['date']));
        t.setMonth(t.getMonth()+1); 
        d['endDate'] = Date.parse(t);
    })

    data.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
    
    jsonData = data;

    myColor.domain(categoreis);    
    x.domain(d3.extent(data, function(d) { return new Date(d.startDate); }));
    y.domain(industries);           
    
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)).tickSizeOuter(0));

    // Add the Y Axis
    svg.append("g")
        .attr('class','y axis')
        .call(d3.axisLeft(y).tickSize(-width - 6).tickSizeOuter(0).tickFormat((d)=>changeText(d)));
    
    industries.forEach(function(industry){
        var y1 = d3.scaleLinear().rangeRound([y.bandwidth(),0]);
        var iMax = d3.max(data,(d)=>Math.abs(d[industry]));
        y1.domain([-iMax, iMax]);

        var g_wrapper = svg.append('g').attr('class','g_'+industry).attr('transform','translate(0,'+y(industry)+')');

        g_wrapper.selectAll('.bar').data(data).enter().append('rect').attr('class','bar').attr('x',(d)=>x(d.startDate))
        .attr("y",(d)=>y1(Math.max(0, d[industry])))
        .attr("width",(d)=>x(d.endDate) - x(d.startDate))
        .attr("height", (d)=>Math.abs(y1(d[industry]) - y1(0)))
        .attr('fill',(d)=>myColor(industry)).attr('attr-date', (d)=>d.startDate)        
        .on('mouseover',function(d) {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).addClass('active');
            updateLegend(str);
        })
        .on('mouseout',function () {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).removeClass('active');  
            initLegend();
        });;
    });

    yLine.domain([d3.min([d3.min(data.map(function(o) { return o.dispersion; })),d3.min(data.map(function(o) { return o.correlation; }))]), d3.max([Math.max.apply(Math, data.map(function(o) { return o.dispersion; })),Math.max.apply(Math, data.map(function(o) { return o.correlation; }))])]);
    
    var dispersionLine = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return x(d.startDate); })
    .y(function(d) { return yLine(d.dispersion); });

    var correlationLine = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return x(d.startDate); })
    .y(function(d) { return yLine(d.correlation); });

    var line_wrapper = svg.append('g').attr('class','line_wrapper').attr("transform","translate(0,"+height * 3 / 4 +")");
    line_wrapper.append('path').attr('d',dispersionLine(data)).attr('stroke', myColor('dispersion')).attr('class','line_path');
    line_wrapper.append('path').attr('d',correlationLine(data)).attr('stroke', myColor('correlation')).attr('class','line_path');

    line_wrapper.selectAll('.dispersion_circle').data(data).enter().append('circle').attr('class','dispersion_circle')
    .attr('cx',(d)=>x(d.startDate)).attr('cy',(d)=>yLine(d.dispersion)).attr('fill',myColor('dispersion')).attr('r',5)
    .attr('attr-date', (d)=>d.startDate)
        .on('mouseover',function(d) {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).addClass('active');
            updateLegend(str);
        })
        .on('mouseout',function () {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).removeClass('active');  
            initLegend();
        });

    line_wrapper.append('text').attr('x',-10).attr('y',height / 8 -8).attr('text-anchor','end').text("Correlation / ");
    line_wrapper.append('text').attr('x',-10).attr('y',height / 8 + 8).attr('text-anchor','end').text("Dispersion ");
    line_wrapper.selectAll('.correlation_circle').data(data).enter().append('circle').attr('class','correlation_circle')
    .attr('cx',(d)=>x(d.startDate)).attr('cy',(d)=>yLine(d.correlation)).attr('fill',myColor('correlation')).attr('r',5)
    .attr('attr-date', (d)=>d.startDate)
        .on('mouseover',function(d) {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';
            updateLegend(str);            
            $(selector).addClass('active');
        })
        .on('mouseout',function () {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).removeClass('active');  
            initLegend();
        });

    matrixX.domain(d3.extent(data.map(function(d){return d.correlation})));
    matrixY.domain(d3.extent(data.map(function(d){return d.dispersion})));
    var matrix_wrapper = svg.append("g").attr('class','matrix_wrapper').attr('transform',"translate("+(width+padding.right)+",0)");

    matrix_wrapper.append("g")
        .attr("transform", "translate(0," + height / 4 + ")")
        .call(d3.axisBottom(matrixX).tickSize(0).tickFormat(""));

    matrix_wrapper.append('text').attr('x',0).attr("y",height/4 + 20).text("Correlation");

    matrix_wrapper.append("g")
        .attr("transform", "translate("+matrixWrapperWidth / 2 +",0)")
        .call(d3.axisLeft(matrixY).tickSize(0).tickFormat(""));
    matrix_wrapper.append('text').attr("transform", "translate("+(matrixWrapperWidth / 2 - 5) +","+  height /2 + ") rotate(-90)").text("Dispersion");

    matrix_wrapper.selectAll('.circle').data(data).enter().append('circle').attr('class','circle').attr('cx',(d)=>matrixX(d.correlation))
        .attr('cy',(d)=>matrixY(d.dispersion)).attr('r',5).attr('fill',myColor('idxb')).attr('attr-date', (d)=>d.startDate)
        .on('mouseover',function(d) {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).addClass('active');
            updateLegend(str);
        })
        .on('mouseout',function () {
            var str = $(this).attr('attr-date');
            var selector = '[attr-date=' + str + ']';            
            $(selector).removeClass('active');  
            initLegend();
        });

    var legend_wrapper = svg.append('g').attr('class','legend_wrapper').attr("transform","translate("+(width + padding.right) + ',' + (height / 2 + 50)+ ")");

    legend_wrapper.append('text').attr('x',0).attr('y',0).text('Fund').attr('fill',myColor('fund'));
    legend_wrapper.append('text').attr("class","fund_value value").attr('x',0).attr('y',20).text('-').attr('fill',myColor('fund'));

    legend_wrapper.append('text').attr('x',0).attr('y',45).text('IDX B').attr('fill',myColor('idxb'));
    legend_wrapper.append('text').attr("class","idxb_value value").attr('x',0).attr('y',65).text('-').attr('fill',myColor('idxb'));

    legend_wrapper.append('text').attr('x',0).attr('y',90).text('IDX A').attr('fill',myColor('idxa'));
    legend_wrapper.append('text').attr("class","idxa_value value").attr('x',0).attr('y',110).text('-').attr('fill',myColor('idxa'));

    legend_wrapper.append('text').attr('x',100).attr('y',0).text('Correlation').attr('fill',myColor('correlation'));
    legend_wrapper.append('text').attr("class","correlation_value value").attr('x',100).attr('y',20).text('-').attr('fill',myColor('correlation'));

    legend_wrapper.append('text').attr('x',100).attr('y',45).text('Dispersion').attr('fill',myColor('dispersion'));
    legend_wrapper.append('text').attr("class","dispersion_value value").attr('x',100).attr('y',65).text('-').attr('fill',myColor('dispersion'));

    legend_wrapper.append('text').attr('x',100).attr('y',90).text('Date').attr('fill','black');
    legend_wrapper.append('text').attr("class","date_value value").attr('x',100).attr('y',110).text('-').attr('fill','black');

    function updateLegend(date){
        var elObj;
        data.forEach(function(d){
            if(d.startDate == date){
                elObj = d;
            }
        })
        
        d3.select('.fund_value').text(elObj.fund);
        d3.select('.idxb_value').text(elObj.idxb);
        d3.select('.idxa_value').text(elObj.idxa);
        d3.select('.correlation_value').text(elObj.correlation);
        d3.select('.dispersion_value').text(elObj.dispersion);
        d3.select('.date_value').text(elObj.date);
    }

    function initLegend(){
        legend_wrapper.selectAll('.value').text("");
    }
});

function changeText(text){
    if(text == "idxa"){
        return "IDX A Alpha";       
    }else if(text == "idxb"){
        return "IDX B Alpha";
    }else if(text == "fund"){
        return "Fund Alpha";
    }else if(text == "correlation"){
        return "Correlation";
    }else if(text == "dispersion"){
        return "Dispersion";
    }
}