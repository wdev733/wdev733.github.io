var width = 960,
    height = 500; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "",    
    year,
    groupby = "country", sub_region="";    
var countries = [], cancer_sites=[], genders = [], registries = [];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], nameKeys=["Incidence (ASR)","Mortality (ASR)"];
var objData = [],jsonData = [],chartData = [],y2ChartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 1000 500").attr("preserveAspectRatio", "xMidYMid meet");

function createChart (svg, data) {

  const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']

  svg = d3.select(svg)
  const margin = {top: 20, right: 20, bottom: 30, left: 60}
  const width = 960 - margin.left - margin.right - 140;
  const height = 500 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .range([0, width * 2 / 3])
    .paddingInner(0.1)

  var x1 = d3.scaleBand()
    .padding(0.05)

  var x2 = d3.scaleBand().range([0, width / 3]).paddingInner(0.1);

  var y = d3.scaleLinear().rangeRound([height, 0])

  var y1 = d3.scaleLinear().rangeRound([height,0]);

  var z = d3.scaleOrdinal()
    .range(colors)

  // check each subset of data for possible sections, since not all subsets have every possible section.

  x0.domain(nameKeys)

  x2.domain(["Net Survival"]);

  const barContainer = g.append('g').attr('class','g_bar1');
  const barContainer2 = g.append('g').attr('class','g_bar2');

  const xAxis = g.append('g')
      .attr('class', 'x0 axis')
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

  const x2Axis = g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate('+(width*2 / 3)+',' + height + ')')
      .call(d3.axisBottom(x2).tickSizeOuter(0))

  const yAxis = g.append('g')
      .attr('class', 'axis')
  const yAxis2 = g.append('g')
      .attr('class', 'y2 axis')

  // updates both the year + the chart type (group or stacked)
  function updateChart (data) {     
        d3.select('.nodatatext').remove();
    if(data.length >1){

    d3.select('.legend_wrapper').remove();
  let valueKeys;
  if(groupby=="country"){    
    valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  }else if(groupby=="cancer_site"){
    valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  }else if(groupby=="sex"){
    valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  }else if(groupby=="sub_region"){
    valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  }

  var legend = g.append('g').attr('class','legend_wrapper')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text(function(){
    if(groupby=="cancer_site"){
      return "Cancer Site"
    }else if(groupby=="sub_region"){
      return "Registries"
    }
    return groupby;
  })
  .attr('x', width + 70)
  .style('font-weight', 'bold')
  .style('text-transform','capitalize')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g')
    .data(valueKeys)
    .enter().append('g')
      .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' })

  legendEnter.append('rect')
      .attr('x', width + 50)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

  legendEnter.append('text')
      .attr('x', width + 75)
      .attr('y', 9.5)
      .attr('text-anchor','start')
      .attr('dy', '0.32em')
      .text(d => d)

      x1.domain(valueKeys).rangeRound([0, x0.bandwidth()])
      //find max value of a section
      const maxValue = d3.max(data.map((d) => Object.values(d.values)).reduce((a, b) => a.concat(b), []))

      const y2maxValue = d3.max(y2ChartData.map((d)=>Object.values(d.values)).reduce((a,b)=>a.concat(b),[]));

      y.domain([0, maxValue]).nice()
      y1.domain([0, y2maxValue]).nice()
      
      yAxis.transition()
      .call(d3.axisLeft(y))

      yAxis2
      .attr('transform', 'translate('+width+',0)')
      .transition()      
      .call(d3.axisRight(y1))

      barContainer.html("");
      barContainer2.html("");

      const barsWithData = barContainer
      .selectAll('g.bar1')
      .data(data)    

      const bars = barsWithData
      .enter()
      .append('g')
      .attr('class','bar1')
      .attr('transform', function (d) { return 'translate(' + x0(d.name) + ',0)' })
      .merge(barsWithData)
      .selectAll('rect')
      .data(function (d) {
        return Object.keys(d.values).map(k => ({ key: k, value: d.values[k] }))
      })
      

      bars
      .enter()
      .append('rect')
      .attr('fill', function (d) {
        return z(d.key)
      })
      .merge(bars)
      .attr('width', x1.bandwidth())
      .attr('x', function (d) { return x1(d.key) })
      .attr('y', d => y(d.value))
      .attr('height', function(d){        
       return height - y(d.value);
      })

      const barsWithData2 = barContainer2
      .selectAll('g.bar2')
      .data(y2ChartData)
      
      const bars2 = barsWithData2
      .enter()
      .append('g')
      .attr('class','bar2')
      .attr('transform', function (d) { return 'translate(' + (width * 2 / 3 + x2(d.name)) + ',0)' })
      .merge(barsWithData2)
      .selectAll('rect')
      .data(function (d) {
        return Object.keys(d.values).map(k => ({ key: k, value: d.values[k] }))
      })

      bars2
      .enter()
      .append('rect')
      .attr('fill', function (d) {
        return z(d.key)
      })
      .merge(bars)      
      .attr('width', x1.bandwidth())
      .attr('x', function (d) { return x1(d.key) })
      .attr('y', d => y1(d.value))
      .attr('height', function(d){        
        return height - y1(d.value);        
      })
      }else{
        svg.append("text").attr("x", width/2).attr('y',300).text("No Data").attr('class','nodatatext');
      }
  }


  return {
    updateChart
  }
}

d3.csv("assets/data/V1.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();       
    chart = createChart(document.querySelector('svg'), objData) 
    chart.updateChart(chartData);
})

function makeDatafromCSV() {  
  console.log(year, country,cancer_site,gender);
  console.log(countries,cancer_sites,genders,registries);

  y2ChartData = [];
  var data1 = jsonData;

  data1 = data1.filter(function(d){return d.year == year});
  
  if(groupby!="country"){
    data1 = data1.filter(function(d){return d.country == country});  
  }else{
    data1 = data1.filter(function(d){return countries.includes(d.country)});
  }

  if(groupby !="cancer_site"){
    data1 = data1.filter(function(d){return d.cancer_site == cancer_site })
  }else{
    data1 = data1.filter(function(d){return cancer_sites.includes(d.cancer_site)})
  }

  if(groupby!="sex"){
    data1 = data1.filter(function(d){return d.sex == gender });
  }else{
    data1 = data1.filter(function(d){return genders.includes(d.sex)});
  }
  if(groupby=="sub_region"){
    data1 = data1.filter(function(d){return registries.includes(d.sub_region)});
  }


  data1 = d3.nest()
  .key(function(d) { return d.measure_type;})
  .key(function(d){return d[groupby];})
  .rollup(function(d) { 
   return d3.sum(d, function(g) {return g.measure; });
  }).entries(data1);
  
  objData = [];
  var tmpObj2Data = [];
  data1.forEach(function(datum){    
    if(datum.key!="Net Survival"){
      var tmp = new Object;
      tmp['name'] = datum.key;
      tmp['values'] = datum.values;
      objData.push(tmp);
    }else{
      var tmp = new Object;
      tmp['name'] = datum.key;
      tmp['values'] = datum.values;
      tmpObj2Data.push(tmp);
    }
  })

  chartData = [];  


  objData.forEach(function(d){
    var tmp = new Object;
    tmp['name'] = d.name;
    tmp['values'] = new Object;
    d.values.forEach(function(v){      
      tmp['values'][v['key']] = v['value'];      
    })
    chartData.push(tmp);
  }) 

  tmpObj2Data.forEach(function(d){
    var tmp = new Object;
    tmp['name'] = d.name;
    tmp['values'] = new Object;
    d.values.forEach(function(v){      
      tmp['values'][v['key']] = v['value'];      
    })
    y2ChartData.push(tmp);
  })
  return data1;
}

function updateControls(data){  
  var yearData = data.map(function(d){return d.year});

  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});

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
  year = d3.max(yearOptions);  
  cancer_site = $("#cancer_sites option:selected").val();
  gender = "All";
  yearOptions.forEach(function(country){
    $('#year_select').append('<option value="'+country+'">'+country+'</option>');
  })

  $("#year_select option[value="+year+"]").attr('selected', 'selected');

  updateCheckboxes(groupby);
}

function updateProvince(){  
  provincesOption = [];
  var provincesData = jsonData.filter(function(d){return d.country == country;}).map(function(d){return d.sub_region});
  $.each(provincesData, function(i, el){
      if($.inArray(el, provincesOption) === -1) provincesOption.push(el);
  });

  provincesOption.sort();
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
        updateProvince();
        if(groupby=="sub_region"){
          updateCheckboxes(groupby);
        }
        chart.updateChart(chartData);
    });

    $("#sidebar").on("change", "select#year_select", function() {
        year = $(this).val();        
        makeDatafromCSV();      
        chart.updateChart(chartData);  
    });
    $('input[type=radio][name=gender]').change(function() {
        gender = $(this).val();
        makeDatafromCSV();        
        chart.updateChart(chartData);
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
});

