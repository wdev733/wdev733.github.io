var width = 960,
    height = 500; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "",    
    age,sub_region="All", time, measure;    
var color = ["red","blue"];

var countries = [], cancer_sites=[], genders = [], registries = [], agegroups = [], measures = [];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], agegroupOptions = [], periodOptions = [], period, legends = [], ageOptions = [], measureOptions = [];
var objData = [],jsonData = [],chartData = [],y2ChartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 960 500").attr("preserveAspectRatio", "xMidYMid meet");

var min = Math.min(width, (height - 50));
var chart_r = min / 2;
// construct default pie laoyut
var pie = d3.pie().value(function(d) {
    return d.value;
}).sort(null);
// construct arc generator
var arc = d3.arc()
    .outerRadius(chart_r * 0.8)
    .innerRadius(chart_r * 0.4);

var outerArc = d3.arc()
    .innerRadius(chart_r * 0.9)
    .outerRadius(chart_r * 0.9);
// creates the pie chart container
var g = svg.append('g')
    .attr('transform', function() {
        if (window.innerWidth >= 960) var shiftWidth = width / 2;
        if (window.innerWidth < 960) var shiftWidth = width / 3;
        return 'translate(' + shiftWidth + ',' + height / 2 + ')';
    })
g.append("g")
    .attr("class", "labels");
g.append("g")
    .attr("class", "lines");

d3.csv("assets/data/V5_1.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();    
    render();
})

function showLegend(){
  legend_wrapper.append("text").attr('y',20).text("Probability Of Dying");
  legend_wrapper.append("text").attr("y",40).text("From Cancer: ").attr('id',"from_cancer");
  legend_wrapper.append("text").attr("y",60).text("From Other Causes: ").attr('id',"from_other");
  legend_wrapper.append("text").attr("y",90).text("From Other Causes: ").attr('id',"odds_text").attr('dy','.71em').attr('class','dynamic');
  legend_wrapper.append("text").attr("y",150).text("From Other Causes: ").attr('id',"diff_growth").attr('dy','.71em').attr('class','dynamic');
}

function makeDatafromCSV() {      
  var data1 = jsonData;
  
  data1 = data1.filter(function(d){return d.country == country});
  data1 = data1.filter(function(d){return d.sub_region == sub_region});
  data1 = data1.filter(function(d){return d.sex == gender});
  data1 = data1.filter(function(d){return d.cancer_site == cancer_site});
  data1 = data1.filter(function(d){return d.age == age});
  data1 = data1.filter(function(d){return d.measure_type == measure});
  

  
  data1 = d3.nest()
  .key(function(d) { return d.measure_type;})
  .rollup(function(d) {         
   return{    
      p:d[0].p,
      life_loss:d[0].life_exp_loss_years,
   }
  }).entries(data1);

  chartData = data1;
}

function render() {    
    data = [];
    var sampleData = chartData;
    
    sampleData.forEach(function(s){      
      var tmp = new Object;
      tmp.key = s.key;
      tmp.value = s.value.p;
      data.push(tmp);

      var tmp1 = new Object;
      tmp1['key'] = "rest";
      tmp1['value'] = 1 - s.value.p;
      data.push(tmp1);
    })

    var path = g.datum(data).selectAll("path")
    .data(pie)
    .enter().append("path")    
    .attr("class", function(d){return "piechart "+ d.data.key})
    .attr("fill", function(d, i) {
        return color[i];
    })
    .attr("d", arc)
    .each(function(d) {
        this._current = d;
    })
    .on('mouseover', function(d) {      
      if(!d3.select(this).classed("rest")){
        d3.select(this).classed('highlight',true);
        pathAnim(d3.select(this), 1);
      }        
        // tooltip.transition()
        //     .duration(200)
        //     .style("opacity", .9);
        // tooltip.html(d.value.toFixed(2) + "<br/>")
        //     .style("left", (d3.event.pageX) + "px")
        //     .style("top", (d3.event.pageY - 28) + "px");
    }).on('mouseout', function() {
        d3.select(this).classed('highlight',false);
        var thisPath = d3.select(this);
        if (!thisPath.classed('clicked')) {
            pathAnim(thisPath, 0);
        }
        // tooltip.transition()
        //     .duration(500)
        //     .style("opacity", 0);
    }).on('click', function() {
        var thisPath = d3.select(this);
        var clicked = thisPath.classed('clicked');
        pathAnim(thisPath, ~~(!clicked));
    })
    
    // add transition to new path
    g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
    // add any new paths
    g.datum(data).selectAll("path")
        .data(pie)
        .enter().append("path")
        .attr("class", "piechart")
        .attr("fill", function(d, i) {
            return color[i];
        })
        .attr("d", arc)
        .each(function(d) {
            this._current = d;
        })

    // remove data not being used
    g.datum(data).selectAll("path")
        .data(pie).exit().remove();
    changeLabels(data);    

    d3.select('.toolCircle').remove();
    
    g.append('text')
                  .attr('class', 'toolCircle')
                  .attr('y',0)
                  .attr('dy', '.1em') // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                  .html("Loss in life expectancy: " + parseInt(chartData[0].value.life_loss) + " years")
                  .style('font-size', '.9em')
                  .style('text-anchor', 'middle').call(wrap, chart_r * 0.4 * 2 - 30);
}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}

function pathAnim(path, dir) {    
    switch (dir) {
        case 0:
            path.transition()
                .duration(500)              
                .attr('d', d3.arc()
                    .innerRadius(chart_r * 0.4)
                    .outerRadius(chart_r * 0.8)
                );
            break;

        case 1:
            path.transition()
                .attr('d', d3.arc()
                    .innerRadius(chart_r * 0.4)
                    .outerRadius(chart_r * 0.85)
                );
            break;
    }
}

function changeLabels(data) {      
    $('.labels').html("");
    $('.lines').html("");
    var text = svg.select(".labels").selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {                      
            return (100 * d.value).toFixed(0) + "%";
        }).attr('class',function(d){return d.data.key});

    // text.text(function(d){      
    //   return d.value.toFixed(2);
    // })
    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000)
        .attrTween("transform", function(d) {            
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = chart_r * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            };
        })
        .styleTween("text-anchor", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start" : "end";
            };
        });

    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data)).enter()
        .append("polyline").attr('class',function(d){return d.data.key});

    
    polyline
    .transition().duration(1000)
        .attrTween("points", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = chart_r * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
}

function updateControls(data){  
  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});
  var measuresData = data.map(function(d){return d.measure_type});

  var ageData = data.map(function(d){return d.age});
  genderData.forEach(function(g){
    if(!genderOptions.includes(g)){
      genderOptions.push(g);
    }
  });  

  measuresData.forEach(function(g){
    if(!measureOptions.includes(g)){
      measureOptions.push(g);
    }
  });

  ageData.forEach(function(g){
    if(!ageOptions.includes(g)){
      ageOptions.push(g);
    }
  });    
  ageOptions.sort();

  countryData.forEach(function(country){
    if(!countryOptions.includes(country)){
      countryOptions.push(country);
    }
  })  

  countryOptions.sort();
  countries = countryOptions;

  genderOptions.sort();
  cancersiteData.forEach(function(country){
    if(!cancersiteOptions.includes(country)){
      cancersiteOptions.push(country);
    }
  })  

  cancersiteOptions.sort();
  countryOptions.forEach(function(country){
    $('#country_select').append('<option value="'+country+'">'+country+'</option>');
  })    

  cancersiteOptions.forEach(function(country){
    $('#cancer_sites').append('<option value="'+country+'">'+country+'</option>');
  })   
  
  measureOptions.forEach(function(country){
    $('#measure_select').append('<option value="'+country+'">'+country+'</option>');
  })   
  
  cancer_site = $("#cancer_sites option:selected").val();  
  country = $("#country_select option:selected").val();
  measure = $("#measure_select option:selected").val();
  
  updateProvince();
  
  gender = "Males";
  
  provincesOption.forEach(function(country){
    $('#province_select').append('<option value="'+country+'">'+country+'</option>');
  });
  age = parseInt(d3.min(ageOptions));

  sub_region = $("#province_select option:selected").val();
  var agegroupSlider = $("#ageinput").slider({ handle:"square", value:age, min: parseInt(d3.min(ageOptions)), max: parseInt(d3.max(ageOptions)), step:1, focus: true,tooltip: 'always',tooltip_position:'bottom'}).on('slide',function(slideEvt){    
      age = slideEvt.value;            
      makeDatafromCSV();    
      render();        
  }).data('slider'); 
}

function updateProvince(){  
  provincesOption = [];
  var provincesData = jsonData.filter(function(d){return d.country == country;}).map(function(d){return d.sub_region});
  $.each(provincesData, function(i, el){
      if($.inArray(el, provincesOption) === -1) provincesOption.push(el);
  });

  provincesOption.sort();
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

$(document).ready(function() {
    $('#toggle-left-bar').on('click', function () {
       $('#sidebar').toggleClass('active');
       $(this).toggleClass('closed');
       if($("#sidebar").hasClass("active")){
        $("#age_wrapper .tooltip").addClass('hide');
       }else{
        $("#age_wrapper .tooltip").removeClass('hide');
       }
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-right');
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-left');       
    });  
    $("#sidebar").on("change", "select#cancer_sites", function() {
      cancer_site = $(this).val();
      makeDatafromCSV();
      render();
    });
    
    $("#sidebar").on("change", "select#measure_select", function() {
      measure = $(this).val();
      makeDatafromCSV();
      render();
    });    
    $("#sidebar").on("change", "select#province_select", function() {
      sub_region = $(this).val();
      makeDatafromCSV();
      render();
    });

    $("#sidebar").on("change", "select#country_select", function() {
      country = $(this).val();
      sub_region = "All";
      $("#province_select").html("");
      updateProvince();
      provincesOption.forEach(function(country){
        $('#province_select').append('<option value="'+country+'">'+country+'</option>');
      });

      $("#province_select").val("All");
      makeDatafromCSV();
      render();
    });

    $('input[type=radio][name=gender]').change(function() {
      gender = $(this).val();
      makeDatafromCSV();
      render();
    });     
    
    $("#ageinput").on("change", function() {
       age = $(this).val();
       makeDatafromCSV();
       render();
    });
});