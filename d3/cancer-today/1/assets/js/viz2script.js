var width = 960,
    height = 500; // adjust for height of input bar div

var country = "all",
    cancer_site = "all",
    gender = "All",
    interval = "1Y",
    agegroup = "All",
    year,
    groupby = "country";

var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], countries = [], genders = [], cancer_sites = [];
var objData = [],jsonData = [],chartData = [],y2ChartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 1000 500").attr("preserveAspectRatio", "xMidYMid meet");

var color = d3.scaleOrdinal(d3.schemeCategory10);

function createChart (svg, data) {

  const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']

  svg = d3.select(svg)
  const margin = {top: 20, right: 20, bottom: 30, left: 60}
  const width = 960 - margin.left - margin.right - 140;
  const height = 500 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.1)
  
  var y = d3.scaleLinear().rangeRound([height, 0])

  var y1 = d3.scaleLinear().rangeRound([height,0]);

  var z = d3.scaleOrdinal()
    .range(colors)

  var line = d3.line()  
    .x(function(d) { return x0(d.key) + x0.bandwidth()/2; })
    .y(function(d) { return y(d.value); });

  var y2line = d3.line()  
    .x(function(d) { return x0(d.key) + x0.bandwidth()/2; })
    .y(function(d) { return y1(d.value); });

  // check each subset of data for possible sections, since not all subsets have every possible section.
  let nameKeys = data[0]['values'].map(function(d){return d.key});
  x0.domain(nameKeys)
  
  const xAxis = g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0).tickSizeOuter(0))

  g.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", (0 - margin.left + 10))
    .attr("x",0 - (height / 2))
    .text("Incidence (ASR) / Mortality (ASR)");

  g.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", (width + 40))
    .attr("x",0 - (height / 2))
    .text("Net Survival %");

  const yAxis = g.append('g')
      .attr('class', 'axis')
  const yAxis2 = g.append('g')
      .attr('class', 'y2 axis')

  // updates both the year + the chart type (group or stacked)
  function updateChart (data) {        

  d3.select('.legend_wrapper').remove();

  
  var legend = g.append('g').attr('class','legend_wrapper')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text("Measure Type")
  .attr('x', width + 90)
  .style('font-weight', 'bold')
  .style('text-transform','capitalize')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' })

  legendEnter.append('line')
      .attr('x1', width + 50)
      .attr('x2', width + 69)
      .attr('y1', 10)
      .attr('y2', 10)
      .attr('stroke',function(d,i){return color(i)})
      .attr('stroke-width', '2px')
      .style("stroke-dasharray", function(d,i){
        if(d.key=="Incidence (ASR)"){
          return;
        }else if(d.key == "Mortality (ASR)"){                
          return "3, 3";
        }
      })
            
  legendEnter.append('text')
      .attr('x', width + 75)
      .attr('y', 9.5)
      .attr('text-anchor','start')
      .attr('dy', '0.32em')
      .text(d => d.key)

  var legendEnter2 = legend
    .selectAll('g.leg2')
    .data(y2ChartData)
    .enter().append('g')
    .attr('class',"leg2")
    .attr('transform', function (d, i) { return 'translate(0,' + data.length * 20 + ')' })

  legendEnter2.append('line')
      .attr('x1', width + 50)
      .attr('x2', width + 69)
      .attr('y1', 10)
      .attr('y2', 10)
      .attr('stroke',function(d,i){return color(2)})
      .attr('stroke-width', '2px')
      .style("stroke-dasharray","10 5")

  legendEnter2.append('text')
      .attr('x', width + 75)
      .attr('y', 9.5)
      .attr('text-anchor','start')
      .attr('dy', '0.32em')
      .text(d => d.key + " %")      
      
      //find max value of a section
      const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []).map(function(d){return d.value}));

      const y2maxValue = d3.max(y2ChartData.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []).map(function(d){return d.value}));

      y.domain([0, maxValue]).nice()
      y1.domain([0, y2maxValue]).nice()
      
      yAxis.transition()
      .call(d3.axisLeft(y))

      yAxis2
      .attr('transform', 'translate('+width+',0)')
      .transition()      
      .call(d3.axisRight(y1))

      svg.selectAll('.g_line').remove();
      svg.selectAll('.g_line2').remove();
      var g_wrapper = g.selectAll('.g_line').data(data).enter().append('g').attr('class', function(d,i){return 'g_line line_'+i; });

      g_wrapper.selectAll('.path_line').data(function(d,i){return [d]}).enter().append('path').attr('class','path_line')            
            .attr('stroke',function(d,i){
              var index = d3.select(this.parentNode).attr('class');
              index = index.substr(12);              
              return color(index);
            })            
            .style("stroke-dasharray", function(d,i){
              if(d.key=="Incidence (ASR)"){
                return;
              }else if(d.key == "Mortality (ASR)"){                
                return "3, 3";
              }
            })
            .attr("d", function(d){return line(d.values)});

      g_wrapper.selectAll('.circle').data(function(d,i){return d.values}).enter()
      .append('circle').attr('class','circle')
      .attr('cx',function(d){return x0(d.key) + x0.bandwidth()/2})
      .attr('cy',function(d){return y(d.value)})
      .attr('r',4)
      .attr('fill',function(d,i){
              var index = d3.select(this.parentNode).attr('class');
              index = index.substr(12);              
              return color(index);            
      })

      var g_wrapper2 = g.selectAll('.g_line2').data(y2ChartData).enter().append('g').attr('class','g_line2');

      g_wrapper2.selectAll('.path_line2').data(function(d,i){return [d]}).enter().append('path').attr('class','path_line2')            
            .attr('stroke',function(d,i){
              return color(2);
            })            
            .style("stroke-dasharray", function(d,i){              
                return "10 5";              
            })
            .attr("d", function(d){ return y2line(d.values)});

      g_wrapper2.selectAll('.circle').data(function(d,i){return d.values}).enter()
      .append('circle').attr('class','circle')
      .attr('cx',function(d){return x0(d.key) + x0.bandwidth()/2})
      .attr('cy',function(d){return y1(d.value)})
      .attr('fill',color(2))
      .attr('r',4);
  }


  return {
    updateChart
  }
}

function makeDatafromCSV() {  
  var data = jsonData;
  chartData = [];
  y2ChartData = [];

  if(groupby!="country"){
    data = data.filter(function(d){return d.country == country});  
  }else{
    data = data.filter(function(d){return countries.includes(d.country)});
  }

  if(groupby !="cancer_site"){
    data = data.filter(function(d){return d.cancer_site == cancer_site })
  }else{
    data = data.filter(function(d){return cancer_sites.includes(d.cancer_site );})
  }

  if(groupby !="sex"){
    data = data.filter(function(d){return d.sex == gender }) 
  }else {        
    data = data.filter(function(d){return genders.includes(d.sex)});
  }

  if(groupby=="sub_region"){
    data = data.filter(function(d){return registries.includes(d.sub_region)});
  }else{
    data = data.filter(function(d){return d.sub_region == "All"});
  }

  data = data.filter(function(d){return d.agegrp == agegroup});
  data = data.filter(function(d){return d.interval == interval});

  console.log(data);

  var data1 = d3.nest()    
    .key(function(d){return d.measure_type})
    .key(function(d){return d.year;})    
    .rollup(function(d) { 
     return d3.sum(d, function(g) {return g.measure; });
    }).entries(data);

    chartData = data1.filter(function(d){ return d.key !== "Net Survival"});

    y2ChartData = data1.filter(function(d){return d.key == "Net Survival"});
}

function updateControls(data){  
  var yearData = data.map(function(d){return d.year});

  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});
  var agegroupData = data.map(function(d){return d.agegrp});

  genderData.forEach(function(g){
    if(!genderOptions.includes(g)){
      genderOptions.push(g);
    }
  });

  yearData.forEach(function(country){
    if(!yearOptions.includes(country)){
      yearOptions.push(country);
    }
  })  
  countryData.forEach(function(country){
    if(!countryOptions.includes(country)){
      countryOptions.push(country);
    }
  })  
  countries = countryOptions;
  cancersiteData.forEach(function(country){
    if(!cancersiteOptions.includes(country)){
      cancersiteOptions.push(country);
    }
  })

  cancer_sites = cancersiteOptions;
  var agegroupOptions = [];
  agegroupData.forEach(function(country){
    if(!agegroupOptions.includes(country)){
      agegroupOptions.push(country);
    }
  })  

  countryOptions.forEach(function(country){
    $('#country_select').append('<option value="'+country+'">'+country+'</option>');
  }) 
  cancersiteOptions.forEach(function(country){
    $('#cancer_sites').append('<option value="'+country+'">'+country+'</option>');
  })  
  cancer_site = $("#cancer_sites option:selected").val();
  year = d3.max(yearOptions);  
  console.log(year);
  yearOptions.forEach(function(country){
    $('#year_select').append('<option value="'+country+'">'+country+'</option>');
  })

  $("#year_select option[value="+year+"]").attr('selected', 'selected');

  agegroupOptions.forEach(function(country){
    $('#age_group_select').append('<option value="'+country+'">'+country+'</option>');
  })

  updateCheckboxes(groupby);
}

$(document).ready(function() {
    $('#toggle-left-bar').on('click', function () {
       $('#sidebar').toggleClass('active');
       $(this).toggleClass('closed');
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-right');
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-left');
    });  
    $("#sidebar").on("change", "select#cancer_sites", function() {
        cancer_site = $(this).val();
        makeDatafromCSV();      
        chart.updateChart(chartData);
    });
    $("#sidebar").on("change", "select#country_select", function() {
        country = $(this).val();
        makeDatafromCSV();      
        chart.updateChart(chartData);
    });

    $("#sidebar").on("change", "select#year_select", function() {
        year = $(this).val();        
        makeDatafromCSV();      
        chart.updateChart(chartData);  
    });

    $("#sidebar").on("change", "select#age_group_select", function() {
        agegroup = $(this).val();        
        makeDatafromCSV();      
        chart.updateChart(chartData);  
    });

    $('input[type=radio][name=gender]').change(function() {
        gender = $(this).val();
        makeDatafromCSV();        
        chart.updateChart(chartData);
    });

    $("#sidebar").on("change", "select#interval_select", function() {
        interval = $(this).val();        
        makeDatafromCSV();  

        $("svg").html("");
        chart = createChart(document.querySelector('svg'), chartData) 
        chart.updateChart(chartData);
        if($(this).val()=="5Y"){
          $(".age_control").removeClass('hide');
        }else{
          $(".age_control").addClass('hide');
        }
    });
    $("#sidebar").on("change", "select#groupbyselect", function() {
        groupby = $(this).val();   
        updateCheckboxes(groupby);
        if(groupby!="sub_region"){
          if(groupby=="cancer_site"){
            $("#country_select").prop('selectedIndex',0);          
            country = $("#country_select option:selected").val();
            cancer_sites = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 
            $("#country_wrapper").removeClass('hide');
            $("#gender_wrapper").removeClass("hide");
            $("#cancer_site_wrapper").addClass('hide');
          }else if(groupby=="country"){
            $("#cancer_sites").prop('selectedIndex',0);          
            cancer_site = $("#cancer_sites option:selected").val();            
            $("#country_wrapper").addClass('hide');
            $("#gender_wrapper").removeClass("hide");
            $("#cancer_site_wrapper").removeClass('hide');
          }else if(groupby=="sex"){
            $("#country_select").prop('selectedIndex',0);   
            country = $("#country_select option:selected").val();                 
            genders = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 
            $("#country_wrapper").removeClass('hide');
            $("#gender_wrapper").addClass("hide");
            $("#cancer_site_wrapper").removeClass('hide');
          }
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData) 
          chart.updateChart(chartData);
        }else{
          $("#country_wrapper").removeClass("hide");          
          $("#gender_wrapper").removeClass("hide");
          $("#cancer_site_wrapper").removeClass("hide");
        
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData) 
          chart.updateChart(chartData);
        }        
    });
    $("#sidebar").on("change", "#checkboxes_wrapper input[type='checkbox']", function() {
      if(groupby=="country"){
        countries = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
          }).get(); 
      }else if(groupby=="cancer_site"){
        cancer_sites = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
          }).get(); 
      }else if(groupby=="sex"){        
        genders = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
        }).get(); 
      }else if(groupby == 'sub_region'){
        registries = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
        }).get(); 
      }
          makeDatafromCSV();                    
          chart.updateChart(chartData);
    });
});

d3.csv("assets/data/V2.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV(jsonData);       
    chart = createChart(document.querySelector('svg'), chartData) 
    chart.updateChart(chartData);

    calcAge(data);
})

function calcAge(data){
  data = data.filter(function(d){return d.interval == "5Y" });
  var ageOptions = [];
  data.map(function(d){return d.agegrp}).forEach(function(d){
    if(!ageOptions.includes(d)){
      ageOptions.push(d);
    }
  });
  console.log(ageOptions);
}

function updateCheckboxes(groupby){
  $("#checkboxes_wrapper .input_wrapper").html("");
  if(groupby=="country"){
    $("#checkboxes_wrapper h3").html(groupby);
    countryOptions.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"' checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    })      
  }else if(groupby == "cancer_site"){
    $("#checkboxes_wrapper h3").html("Cancer Site");
    cancersiteOptions.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"'checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    }) 
  }else if(groupby == "sex"){
    $("#checkboxes_wrapper h3").html("Gender");
    genderOptions.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"'checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    }) 
  }else if(groupby == "sub_region"){
    $("#checkboxes_wrapper h3").html("Registries");
    country = $("#country_select option:selected").val();
    updateProvince();
    provincesOption.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"'checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    }) 

    registries = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
      return $(this).val();
    }).get(); 
  }
}

function updateProvince(){  
  provincesOption = [];
  var provincesData = jsonData.filter(function(d){return d.country == country;}).map(function(d){return d.sub_region});
  $.each(provincesData, function(i, el){
      if($.inArray(el, provincesOption) === -1) provincesOption.push(el);
  });

  provincesOption.sort();
}