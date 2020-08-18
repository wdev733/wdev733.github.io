var width = 960,
    height = 500; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "",    
    agegroup,
    groupby = "country", sub_region="", time;    
var countries = [], cancer_sites=[], genders = [], registries = [], agegroups = [];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], agegroupOptions = [], periodOptions = [], period, legends = [], timeOptions = [];
var objData = [],jsonData = [],chartData = [],y2ChartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 1000 500").attr("preserveAspectRatio", "xMidYMid meet");

function createChart (svg, data) {

  const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']

  svg = d3.select(svg)
  const margin = {top: 20, right: 20, bottom: 50, left: 60}
  const width = 960 - margin.left - margin.right - 140;
  const height = 500 - margin.top - margin.bottom
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x0 = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.1)

  if(groupby=="country"){
    x0.domain(countries);
  }

  var y = d3.scaleLinear().rangeRound([height, 0])

  var z = d3.scaleOrdinal()
    .range(colors)

  // check each subset of data for possible sections, since not all subsets have every possible section.


  g.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", (0 - margin.left + 10))
    .attr("x",0 - (height / 2))
    .text("Crude % of Death");
  
  g.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")    
    .attr("y", height + 40)
    .attr("x",width / 2)
    .text(function(){
      var ts = "Comparison by ";
      var s = "";
      if(groupby=="sex"){
        s = "Gender";
      }else if(groupby=="cancer_site"){
        s = "Cancer Site";
      }else if(groupby == "agegrp"){
        s = "Age Group";
      }else if(groupby == "sub_region"){
        s = "Registry";
      }else{
        s = groupby;
      }
      return ts + s;
    });

  const yAxis = g.append('g')
      .attr('class', 'axis')

  const xAxis = g.append('g')
      .attr('class', 'x0 axis');

      var lines_wrapper = g.append('g').attr('class','lines_wrapper');

  // updates both the year + the chart type (group or stacked)
  function updateChart (data) {     
    lines_wrapper.html("");
    x0.domain(data.map(function(d){return d.key}));

      xAxis
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0).tickSizeOuter(0))

    d3.select('.nodatatext').remove();
    if(data.length >=1){

    d3.select('.legend_wrapper').remove();
  // let valueKeys;
  // if(groupby=="country"){    
  //   valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  // }else if(groupby=="cancer_site"){
  //   valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  // }else if(groupby=="sex"){
  //   valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  // }else if(groupby=="sub_region"){
  //   valueKeys = Object.keys(data.map(function(d){return d.values})[0]);
  // }

legends = Object.keys(data[0].value);

  var legend = g.append('g').attr('class','legend_wrapper')
  .attr('font-size', 10)
  .attr('text-anchor', 'end')

  legend.append('text')
  .text("Probability of Dying")
  .attr('x', width + 70)
  .style('font-weight', 'bold')
  .attr('text-anchor', 'middle')
  .style('text-transform','capitalize')
  .attr('dy', -10)
  .attr('dx', 20)

  var legendEnter = legend
    .selectAll('g')
    .data(legends)
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
      .text(function(d){
        if(d == "people_cancer"){
          return "Due to Cancer";
        }else if(d == "people_other"){
          return "Due to Other";
        }
      })

  z.domain(legends);

  y.domain([0,d3.max(data.map(function(d){return d.value.people_cancer + d.value.people_other;}))]).nice();

      var g_con = lines_wrapper.selectAll('g.container').data(data).enter().append("g").attr("class","container").attr("transform",function(d){return "translate("+x0(d.key) + ",0)"});      

      g_con.append('line').attr('x1',function(d){return x0.bandwidth()/2}).attr('x2',function(d){return x0.bandwidth()/2}).attr('y1',function(d){return y(d.value.people_cancer)}).attr('y2',function(d){ return y(d.value.people_cancer + d.value.people_other)}).attr("stroke",function(d){return z("people_other")});
      g_con.append('line').attr('x1',function(d){return x0.bandwidth()/2}).attr('x2',function(d){return x0.bandwidth()/2}).attr('y1',function(d){return height}).attr('y2',function(d){ return y(d.value.people_cancer)}).attr("stroke",function(d){return z("people_cancer")});
      g_con.append('circle').attr('cx',function(d){return x0.bandwidth()/2}).attr('cy',function(d){return y(d.value.people_cancer)}).attr('r',5).attr("fill",function(d){return z("people_cancer")});
      g_con.append('circle').attr('cx',function(d){return x0.bandwidth()/2}).attr('cy',function(d){return y(d.value.people_cancer + d.value.people_other)}).attr('r',5).attr("fill",function(d){return z("people_other")});;
      //find max value of a section        
          
      yAxis.transition()
      .call(d3.axisLeft(y))        
      
      }else{
        svg.append("text").attr("x", width/2).attr('y',300).text("No Data").attr('class','nodatatext');
      }
  }


  return {
    updateChart
  }
}

d3.csv("assets/data/V4.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();       
    chart = createChart(document.querySelector('svg'), objData) 
    chart.updateChart(chartData);
})

function makeDatafromCSV() {  
  // console.log(agegroup, country,cancer_site,gender, period,time);
  // console.log(countries,cancer_sites,genders,registries,agegroups);
  
  var data1 = jsonData;
  
  if(groupby=="country"){
    data1 = data1.filter(function(d){return countries.includes(d.country)});
  }else{
    data1 = data1.filter(function(d){ return d.country == country});
  }



  if(groupby=="agegrp"){
    data1 = data1.filter(function(d){return agegroups.includes(d.agegrp)});  
  }else{
    data1 = data1.filter(function(d){return d.agegrp == agegroup});  
  }
  
  
  if(groupby=="cancer_site"){
    data1 = data1.filter(function(d){return cancer_sites.includes(d.cancer_site)});
  }else{
    data1 = data1.filter(function(d){return d.cancer_site == cancer_site});  
  }
  
  console.log(data1);
  if(groupby =="sex"){
    data1 = data1.filter(function(d){return genders.includes(d.sex)});
  }else{
    if(gender !="All"){
      data1 = data1.filter(function(d){return d.sex == gender});
    }  
  }  

  if(groupby == "sub_region"){
    data1 = data1.filter(function(d){return registries.includes(d.sub_region)});
  }else{
    data1 = data1.filter(function(d){return d.sub_region == "All"})
  }

  data1 = data1.filter(function(d){return d.time == time});

  data1 = data1.filter(function(d){return d.cal_period == period});

  console.log(data1);
  data1 = d3.nest()
  .key(function(d){return d[groupby];})
  .rollup(function(d) { 
   return {
    people_cancer:  d3.sum(d, function(v){return v.people_cancer}),
    people_other:  d3.sum(d, function(v){return v.people_other})    
   }
  }).entries(data1);

  chartData = data1;
}

function updateControls(data){  
  var agegroupsData = data.map(function(d){return d.agegrp});

  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});
  var periodData = data.map(function(d){return d.cal_period});
  var timeData = data.map(function(d){return d.time});


  genderData.forEach(function(g){
    if(!genderOptions.includes(g)){
      genderOptions.push(g);
    }
  });

  timeData.forEach(function(g){
    if(!timeOptions.includes(g)){
      timeOptions.push(g);
    }
  });    

  timeOptions.sort();

  periodData.forEach(function(g){
    if(!periodOptions.includes(g)){
      periodOptions.push(g);
    }
  });  

  periodOptions.sort();

  agegroupsData.forEach(function(g){
    if(!agegroupOptions.includes(g)){
      agegroupOptions.push(g);
    }
  });

  agegroupOptions.sort();
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

  timeOptions.forEach(function(country){
    $('#time_select').append('<option value="'+country+'">'+country+'</option>');
  })   

  agegroupOptions.forEach(function(country){
    $('#agegroup_select').append('<option value="'+country+'">'+country+'</option>');
  }) 
  cancersiteOptions.forEach(function(country){
    $('#cancer_sites').append('<option value="'+country+'">'+country+'</option>');
  })   
  periodOptions.forEach(function(country){
    $('#period_select').append('<option value="'+country+'">'+country+'</option>');
  })  
  
  $("#agegroup_select").prop('selectedIndex',0);          
  $("#period_select").prop('selectedIndex',0);          

  cancer_site = $("#cancer_sites option:selected").val();
  agegroup = $("#agegroup_select option:selected").val();  
  country = $("#country_select option:selected").val();
  period = $("#period_select option:selected").val();
  time = $("#time_select option:selected").val();
  gender = "Males";
  
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
  }else if(groupby == "agegrp"){
    $("#checkboxes_wrapper h3").html("Age Group");
    agegroupOptions.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"'checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    }) 
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
    
    $("#sidebar").on("change", "select#agegroup_select", function() {
        agegroup = $(this).val();
        makeDatafromCSV();      
        chart.updateChart(chartData);
    });

    $("#sidebar").on("change", "select#country_select", function() {
        country = $(this).val();
        
        updateProvince();
        if(groupby=="sub_region"){
          updateCheckboxes(groupby);
        }
        makeDatafromCSV();      
        chart.updateChart(chartData);
    });

    $("#sidebar").on("change", "select#year_select", function() {
        year = $(this).val();        
        makeDatafromCSV();      
        chart.updateChart(chartData);  
    });

    $("#sidebar").on("change", "select#time_select", function() {
        time = $(this).val();        
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
      }else if(groupby =="agegrp"){
        agegroups = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
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
            $("#agegroup_wrapper").removeClass("hide");
          }else if(groupby=="country"){
            $("#cancer_sites").prop('selectedIndex',0);          
            cancer_site = $("#cancer_sites option:selected").val();            
            $("#country_wrapper").addClass('hide');
            $("#gender_wrapper").removeClass("hide");
            $("#cancer_site_wrapper").removeClass('hide');
            $("#agegroup_wrapper").removeClass("hide");
          }else if(groupby=="sex"){
            $("#country_select").prop('selectedIndex',0);   
            country = $("#country_select option:selected").val();                 
            genders = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 
            $("#country_wrapper").removeClass('hide');
            $("#gender_wrapper").addClass("hide");
            $("#cancer_site_wrapper").removeClass('hide');
            $("#agegroup_wrapper").removeClass("hide");
          }else if(groupby == "agegrp"){
            agegroups = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 

            $("#agegroup_wrapper").addClass("hide");
            $("#cancer_site_wrapper").removeClass('hide');
            $("#country_wrapper").removeClass('hide');
            $("#gender_wrapper").removeClass("hide");
          }
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData) 
          chart.updateChart(chartData);
        }else{
          $("#country_wrapper").removeClass("hide");          
          $("#gender_wrapper").removeClass("hide");
          $("#cancer_site_wrapper").removeClass("hide");
          $("#agegroup_wrapper").removeClass("hide");
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData) 
          chart.updateChart(chartData);
        }                
    });
});

