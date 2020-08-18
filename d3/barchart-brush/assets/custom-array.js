d3.json("data/sampledata.json", function(error, jsondata) {
    var dataFilters = {
        brushRange: [],
        programId:[],
        eventLength:[]
    };
    var brushRange;
    var margin = {
            top: 10,
            right: 40,
            bottom: 100,
            left: 40
        },
        margin2 = {
            top: 430,
            right: 40,
            bottom: 20,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;

    var parseDate = d3.time.format("%b %Y").parse;
    var x = d3.time.scale().range([0, width]),
        x2 = d3.time.scale().range([0, width]),        
        y2 = d3.scale.linear().range([height2, 0]);
    
    var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");        

    var brush = d3.svg.brush()
        .x(x2)
        .on("brush", brushed);

    var totalheight = height + height2;
    var svg = d3.select("#totalrev_chart_wrapper").append("svg")
        .attr('viewBox', '0 0 960 100');

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin.top + ")");

    var zoom = d3.behavior.zoom()
        .on("zoom", draw);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Totalrev:</strong> <span style='color:red'>" + d.totalrev + "</span>";
      });

    var rectTransform2 = function(d) {
        return "translate(" + x2(d.date) + "," + y2(d.totalrev) + ")";
    };
    
    data = dataByDate(jsondata);
    data = reformatData(data);

    data1 = reformatData(jsondata);
    var endDate = d3.max(data.map(function(d) {
        return getNextDay(d.date)
    }));
    var startDate = d3.min(data.map(function(d) {
        return d.date
    }));

    x2.domain(d3.extent(data.map(function(d) {
        return d.date;
    })));
    y2.domain([0, d3.max(data.map(function(d) {
        return d.totalrev;
    }))]);

    var g_containers1 = context.selectAll(".chart")
        .data(data).enter()
        .append('g')
        .attr('class', 'g_containers1')
        .attr("transform", rectTransform2);

    g_containers1.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', function(d) {
            var tmr = new Date(d.date);
            tmr.setDate(d.date.getDate() + 1);
            return x2(tmr) - x2(d.date);
        })
        .attr('height', function(d) {
            return height2 - y2(d.totalrev);
        })   

    context.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);

    //Custom brush 
    var brush_content = svg.selectAll('g.resize.e');

        brush_content.append('circle')
            .attr("transform", function(d) { return "translate(0,20 )"; })
            .attr("fill","black")
            .attr("r", 12);

        brush_content.append('circle')
            .attr("transform", function(d) { return "translate(0,20 )"; })
            .attr("fill","white")
            .attr("r", 3.5);

        brush_content = svg.selectAll('g.resize.w');
        
        brush_content.append('circle')
            .attr("transform", function(d) { return "translate(0,20 )"; })
            .attr("fill","black")
            .attr("r", 12);        
        brush_content.append('circle')
            .attr("transform", function(d) { return "translate(0,20 )"; })
            .attr("fill","white")
            .attr("r", 3.5);

    //Draw Event Length Chart 
    var data2 = dataByEventLength(jsondata);
    data2 = reformatData(data2);
    drawEventLengthChart(data2);

    var data3 = dataByProgramId(jsondata);
    data3 = reformatData(data3);
    programIdChart(data3);

    var data4 = getTotalDate(jsondata);
    drawTotalRevChart(data4);

    initBrush();
    function initBrush(){
        brush.extent(x2.domain());
        brushRange = x2.domain();        
        dataFilters.brushRange = brushRange;
        svg.select('.brush').call(brush);        
    }
    function brushed() {        
        x.domain(brush.empty() ? x2.domain() : brush.extent());   
        brushRange = x.domain();        
        
        dataFilters.brushRange = brushRange;
        // Refresh Sub Charts          
        // refreshSubCharts(x.domain());
        updateChartData();        
    }

    function refreshSubCharts(dateRange) {
        beDate = new Date(dateRange[0]).getTime();
        enDate = new Date(dateRange[1]).getTime();

        // Update 3 Charts based on brush range
        var updatedData = dataByProgramId(jsondata, beDate, enDate);
        updateprogramIdChart(updatedData);

        updatedData = dataByEventLength(jsondata, beDate, enDate);
        updateEventLengthChart(updatedData);

        updatedData = getTotalDate(jsondata, beDate, enDate);
        updateTotalRevchart(updatedData);
    }

    //get all data by date
    function getTotalDate(jsondata, beDate, enDate) {
        var expensesByName = d3.nest().key(function(d) {
            return d.daysold;
        }).rollup(function(v) {
            return d3.sum(v, function(d) {
                cuDate = new Date(d.date).getTime();
                if ((cuDate >= beDate) && (cuDate <= enDate))
                    return d.totalrev;
                if (beDate == undefined && enDate == undefined)
                    return d.totalrev;
            }).toFixed(2);
        }).entries(jsondata).map(function(group) {
            return {
                daysold: group.key,
                totalrev: group.values
            }
        });;
        return expensesByName;
    }

    // draw total rev by date chart
    function drawTotalRevChart(data){
        data = reformatData(data);
        //sort bars based on value

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 120,
            bottom: 30,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#total_rev_by_date_chart_wrapper").append("svg")
            .attr('viewBox', '0 0 960 500')
            .append("g")
            .attr('class','chart_wrapper')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.call(tip);  

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {                
                return d.totalrev;
            })]);
            
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)
            .domain(data.map(function(d) {
                return d.daysold;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var xAxis = d3.svg.axis().scale(x).tickSize(6).orient('bottom').tickFormat(function(d){return 'Day'+d;});

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var gx = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            // .transition()
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.totalrev);
            })
            .attr("height",function(d){
                return height - y(d.totalrev)
            })
            .attr("x", function(d){
                return x(d.daysold);
            })
            .attr("width",function(d){                
                return x.rangeBand();
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);
    }
    function updateTotalRevchart(data) {
        data = reformatData(data);        
        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 120,
            bottom: 30,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#total_rev_by_date_chart_wrapper svg g.chart_wrapper");

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) {                
                return d.totalrev;
            })]);            

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)
            .domain(data.map(function(d) {
                return d.daysold;
            }));
        //make y axis to show bar names
        var xAxis = d3.svg.axis().scale(x).tickSize(6).orient('bottom').tickFormat(function(d){return 'Day'+d;});

        var gx = svg.select("g.x.axis").attr("transform", "translate(0," + height + ")").call(xAxis);

        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");        

        var gy = svg.select("g.y.axis").call(yAxis);

        var bars = svg.selectAll(".bar").data(data);

        //append rects
        bars.enter().append('rect')
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.totalrev);
            })
            .attr("height",function(d){
                return height - y(d.totalrev)
            })
            .attr("x", function(d){
                return x(d.daysold);
            })
            .attr("width",function(d){                
                return x.rangeBand();
            });

        bars.exit().transition().remove();    
        bars.transition()
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.totalrev);
            })
            .attr("height",function(d){
                return height - y(d.totalrev)
            })
            .attr("x", function(d){
                return x(d.daysold);
            })
            .attr("width",function(d){                
                return x.rangeBand();
            });
    }

    function drawChart(data) {
        g_containers.select('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', function(d) {
                var tmr = new Date(d.date);
                tmr.setDate(d.date.getDate() + 1);
                return x(tmr) - x(d.date);
            })
            .attr('height', function(d) {
                return height - y(d.totalrev);
            });
    }

    function dataByDate(data) {
        var expensesByName = d3.nest().key(function(d) {
            return d.date;
        }).rollup(function(v) {
            return d3.sum(v, function(d) {
                return d.totalrev
            }).toFixed(2);
        }).entries(data).map(function(group) {
            return {
                date: group.key,
                totalrev: group.values
            }
        });
        return expensesByName;
    }

    function dataByProgramId(data, beDate, enDate) {
        var expensesByName = d3.nest().key(function(d) {
            return d.program_id;
        }).rollup(function(v) {
            return d3.sum(v, function(d) {
                cuDate = new Date(d.date).getTime();
                if ((cuDate >= beDate) && (cuDate <= enDate))
                    return d.totalrev;
                if (beDate == undefined && enDate == undefined)
                    return d.totalrev;
            }).toFixed(2);
        }).entries(data).map(function(group) {
            return {
                program_id: group.key,
                totalrev: group.values
            }
        });
        return expensesByName;
    }

    function dataByEventLength(data, beDate, enDate) {
        var expensesByName = d3.nest().key(function(d) {
            return d.totaldaysold;
        }).rollup(function(v) {
            return d3.sum(v, function(d) {
                cuDate = new Date(d.date).getTime();
                if ((cuDate >= beDate) && (cuDate <= enDate))
                    return d.totalrev;
                if (beDate == undefined && enDate == undefined)
                    return d.totalrev;
            }).toFixed(2);
        }).entries(data).map(function(group) {
            return {
                totaldaysold: group.key,
                totalrev: group.values
            }
        });
        return expensesByName;
    }

    function draw() {
        // redraw function  
        focus.select(".x.axis").call(xAxis);
        // Force changing brush range
        brush.extent(x.domain());

        svg.select(".brush").call(brush);
        drawChart(data);
        refreshSubCharts(x.domain());
    }

    function reformatData(d) {
        d.forEach(function(tmp_data) {
            tmp_data.date = new Date(tmp_data.date * 1000);
            tmp_data.totalrev = parseFloat(tmp_data.totalrev);
            tmp_data.totaldaysold = parseInt(tmp_data.totaldaysold);
        });
        return d;
    }

    function getNextDay(day) {
        var tmr = new Date(day);
        tmr.setDate(day.getDate() + 1);
        return tmr;
    }

    function drawEventLengthChart(data) {
        //sort bars based on value
        data = data.sort(function(a, b) {
            return d3.ascending(a.totalrev, b.totalrev);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 120,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#eventlength_chart_wrapper").append("svg")
            .attr('viewBox', '0 0 960 500')
            .append("g")
            .attr('class','g_wrapper')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function(d) {
                return d.totalrev;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function(d) {
                return d.totaldaysold;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data);

        bars.enter()
            .append("g");

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.totaldaysold);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function(d) {
                return x(d.totalrev);
            }).on('mousemove',tip.show).on('mouseout',tip.hide).on('mousedown', function(d){                
                if(d3.select(this).classed('clicked')){
                    d3.select(this).classed('clicked',false);     
                    elementRemove(dataFilters.eventLength,d.totaldaysold);
                }else{
                    d3.select(this).classed('clicked',true);                     
                    dataFilters.eventLength.push(d.totaldaysold);                         
                }                
                updateChartData();
            });;
    }

    function updateEventLengthChart(data) {
        data = reformatData(data);
        //sort bars based on value
        data = data.sort(function(a, b) {
            return d3.ascending(a.totalrev, b.totalrev);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 120,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#eventlength_chart_wrapper svg");
        var g_wrapper = svg.select('g.g_wrapper');
        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function(d) {
                return d.totalrev;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function(d) {
                return d.totaldaysold;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)            
            .tickSize(0)
            .orient("left");

        var gy = svg.select("#eventlength_chart_wrapper g.y.axis")
            .call(yAxis)

        var bars = g_wrapper.selectAll(".bar")
            .data(data);

        // bars.transition();
        bars.enter().append('rect').attr('class','bar').attr("y", function(d) {
                return y(d.totaldaysold);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function(d) {
                return x(d.totalrev);
            });  
        
        bars.exit().transition().remove();        
        //append rects
        bars
            .attr("y", function(d) {
                return y(d.totaldaysold);
            }).transition()
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function(d) {
                return x(d.totalrev);
            });        
    }

    function programIdChart(data) {
        //sort bars based on value
        data = data.sort(function(a, b) {
            return d3.ascending(a.totalrev, b.totalrev);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 100,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#projectid_chart_wrapper").append("svg")
            .attr('viewBox', '0 0 960 500')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function(d) {
                return d.totalrev;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function(d) {
                return d.program_id;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.program_id);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function(d) {
                return x(d.totalrev);
            }).on('mousemove',tip.show).on('mouseout',tip.hide).on('mousedown', function(d){                
                if(d3.select(this).classed('clicked')){
                    d3.select(this).classed('clicked',false);     
                    elementRemove(dataFilters.programId,d.program_id);
                }else{
                    d3.select(this).classed('clicked',true);                     
                    dataFilters.programId.push(d.program_id);                         
                }                
                updateChartData();
            });
    }

    function updateprogramIdChart(data) {        
        var margin = {
            top: 15,
            right: 100,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#projectid_chart_wrapper svg");
        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function(d) {
                return d.totalrev;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function(d) {
                return d.program_id;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.select("#projectid_chart_wrapper g.y.axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)

        //append rects
        bars.transition()
            .attr("y", function(d) {
                return y(d.program_id);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function(d) {
                return x(d.totalrev);
            });        
    }

    function updateChartData(){                   
        beDate = dataFilters.brushRange[0];

        enDate = dataFilters.brushRange[1];

        var filteredData = jsondata;
        console.log(jsondata);
        if(dataFilters.programId.length > 0 ){            
            filteredData = jsondata.filter(function(d){
                cuDate = new Date(d.date).getTime();
                if ((cuDate >= beDate) && (cuDate <= enDate))
                {                    
                    for(var tmp_id in dataFilters.programId){
                        return d['program_id'] == tmp_id;
                    }                    
                }    
            })
        }                
        if(dataFilters.eventLength.length > 0 ){               
            filteredData = filteredData.filter(function(d){
                cuDate = new Date(d.date).getTime();
                if ((cuDate >= beDate) && (cuDate <= enDate))
                {                    
                    for(var j in dataFilters.eventLength){                                         
                        return d.totaldaysold == dataFilters.eventLength[j];
                    }                    
                }    
            })
        }         
        var newdata = jsondata;
        var updatedData = dataByProgramId(newdata, beDate, enDate);
        updateprogramIdChart(updatedData);

        updatedData = dataByEventLength(newdata, beDate, enDate);
        updateEventLengthChart(updatedData);

        updatedData = getTotalDate(filteredData, beDate, enDate);
        updateTotalRevchart(updatedData);
    }

    //Array manipulation functions
    function elementRemove(array,element){
        const index = array.indexOf(element);
        array.splice(index,1);
    }
});