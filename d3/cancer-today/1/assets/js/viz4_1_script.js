var width = 960,
    height = 500; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "",    
    agegroup,sub_region="All", time;    

var countries = [], cancer_sites=[], genders = [], registries = [], agegroups = [];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], agegroupOptions = [], periodOptions = [], period, legends = [], timeOptions = [];
var objData = [],jsonData = [],chartData = [],y2ChartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 800 600").attr("preserveAspectRatio", "xMidYMid meet");
var g_wrapper = svg.append('g').attr('class','g_wrapper');
var chart_wrapper = g_wrapper.append('g').attr('class','chart_wrapper').attr('transform','translate(100,0)');
var legend_wrapper = g_wrapper.append('g').attr('class','legend_wrapper').attr('transform',"translate(435,0)");

var humanD = "M5.35,47.6c0,1.4,0.6833,2.1,2.05,2.1s2.05-0.7,2.05-2.1V28.7h2.1v18.9c0,1.4,0.6834,2.1,2.05,2.1 c1.3667,0,2.05-0.7,2.05-2.1V15.4h1.0v11.6c0,0.7334,0.25,1.2667,0.75,1.6s1.0167,0.3333,1.55,0s0.8-0.8667,0.8-1.6V14.5c0-1.3334-0.45-2.3667-1.35-3.1 s-2.15-1.1-3.75-1.1h-8.2c-1.5333,0-2.7833,0.3333-3.75,1.0s-1.45,1.7-1.45,3.1v13.3c0,0.6,0.2667,1.0333,0.8,1.3s1.05,0.2667,1.55,0s0.75-0.7,0.75-1.3 V15.4h1.0V47.6 M6.15,4.25c0,1.1667,0.4167,2.1667,1.25,3.0S9.2333,8.5,10.4,8.5s2.1667-0.4167,3-1.25S14.65,5.4,14.65,4.2 c0-1.1335-0.4167-2.1168-1.25-2.95C12.5667,0.4167,11.5667,0,10.4,0S8.2333,0.4167,7.4,1.25S6.15,3.0833,6.15,4.25z";
for(var i=9;i>-1;i--){
  var g = chart_wrapper.append("g").attr('transform',function(){return "translate(0,"+ i * 60 + ")"})
  for(var j=0;j<10;j++){
    var g_viz = g.append('g').attr('transform',function(){
      return "translate(" + j * 30 +",0)";
    }).attr('class','human');
    g_viz.append('path').attr('d',humanD);
  }
}

d3.csv("assets/data/V4.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();    
    updateChart();     
    showLegend();
    updateLegend();
})
function showLegend(){
  legend_wrapper.append("text").attr('y',20).text("Probability Of Dying");
  legend_wrapper.append("text").attr("y",40).text("From Cancer: ").attr('id',"from_cancer");
  legend_wrapper.append("text").attr("y",60).text("From Other Causes: ").attr('id',"from_other");
  legend_wrapper.append("text").attr("y",90).text("From Other Causes: ").attr('id',"odds_text").attr('dy','.71em').attr('class','dynamic');
  legend_wrapper.append("text").attr("y",150).text("From Other Causes: ").attr('id',"diff_growth").attr('dy','.71em').attr('class','dynamic');
}
function updateChart(){
  var data = chartData[0];
  $(".changed").attr('class',"human");
  var i = Math.round(data.people_cancer)||1;
  $(".human").slice(0,i).attr("class","red changed");

  i = Math.round(data.people_other)||1;
  $(".human").slice(0,i).attr("class","black changed");
}

function updateLegend(){
  var data = chartData[0];  
  d3.select("#from_cancer").text("From Cancer: " + parseFloat(data.people_cancer).toFixed(2) + "%");
  d3.select("#from_other").text("From Other Causes: " + parseFloat(data.people_other).toFixed(2) + "%");
  d3.select("#odds_text").text("Odds of dying from cancer compared to other causes: " + parseFloat(data.diff_odds).toFixed(1) + ":1");  
  
  var s = "";
  if(parseFloat(data.diff_growth) > 0){
    s = "Death from cancer " + parseFloat(data.diff_growth).toFixed(1) + " times " + "more likely than death from other causes";
  }else{
    s = "Death from cancer " + parseFloat(data.diff_growth).toFixed(1) + " times " + "less likely than death from other causes";
  }

  d3.select("#diff_growth").text(s);

  legend_wrapper.selectAll("text.dynamic").call(wrap,210);
}

function makeDatafromCSV() {    
  var data1 = jsonData;
  
  data1 = data1.filter(function(d){return d.country == country});
  data1 = data1.filter(function(d){return d.agegrp == agegroup});  
  data1 = data1.filter(function(d){return d.cancer_site == cancer_site});    
  data1 = data1.filter(function(d){return d.sex == gender});
  data1 = data1.filter(function(d){return d.sub_region == "All"})
  data1 = data1.filter(function(d){return d.time == time});
  data1 = data1.filter(function(d){return d.cal_period == period});
  
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
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-right');
       $('#toggle-left-bar i').toggleClass('fa-arrow-circle-o-left');
    });  
    $("#sidebar").on("change", "select#cancer_sites", function() {
      cancer_site = $(this).val();
      makeDatafromCSV();
      updateChart();     
      updateLegend();
    });
    
    $("#sidebar").on("change", "select#agegroup_select", function() {
      agegroup = $(this).val();
      makeDatafromCSV();
      updateChart();     
      updateLegend();
    });

    $("#sidebar").on("change", "select#country_select", function() {
      country = $(this).val();
      makeDatafromCSV();
      updateChart();     
      updateLegend();
    });

    $("#sidebar").on("change", "select#year_select", function() {
      year = $(this).val();        
      makeDatafromCSV();
      updateChart();     
      updateLegend(); 
    });

    $("#sidebar").on("change", "select#time_select", function() {
      time = $(this).val();        
      makeDatafromCSV();
      updateChart();     
      updateLegend();
    });
    $('input[type=radio][name=gender]').change(function() {
      gender = $(this).val();
      makeDatafromCSV();
      updateChart();     
      updateLegend();
    });    
});

