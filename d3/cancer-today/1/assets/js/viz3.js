var width = 960,
    height = 700; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "",    
    year,
    groupby = "country", sub_region="", agegroup = "",measure="";    
var countries = [], cancer_sites=[], genders = [], registries = [], years = [], agegroups = [], defaultMeasures = ["Incidence (ASR)", "Mortality (ASR)"];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], agegroupOptions = [];
var objData = [],jsonData = [],chartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg");
var lollipopHeight = 60;
function createChart (svg, data) {

  svg = d3.select('svg');

  svg
    .attr("width","100%")
    .attr("height","800px")

  var length = data.length;

    height = length * (lollipopHeight + 40);
  d3.select('svg').html("");  
  

  var x = d3.scaleLinear()
    .range([100, width]);
  
  var y = d3.scaleBand().range([0,lollipopHeight]).paddingInner(0.1);
  var y1 = d3.scaleBand().range([0,length * (lollipopHeight + 40)]).paddingInner(0.2);

  y1.domain(data.map(function(d){return d.key}));

  x.domain([0,Math.ceil(d3.max(data.map(function(d){return d.values.map(function(p){return p.value})}).reduce((a, b) => a.concat(b), [])))]);

  var g_wrapper = d3.select('svg').append('g').attr('transform',"translate(30,50)");

  var g = g_wrapper.selectAll('g').data(data).enter().append('g').attr('transform',function(d){return "translate(0," + y1(d.key) + ")"});

  y.domain(data[0].values.map(function(d){return d.key}));

  g.append('text').text(function(d){return d.key}).attr("y","-5px");
  g.selectAll('line').data(function(d){return d.values;}).enter().append('line')
  .attr('x1',function(d){
    if(d.conditional != "true"){ 
      return 100; 
    }else {
      var tmp = d3.select(this.parentNode).datum();
      tmp = tmp.values.filter(function(p){return p.conditional == undefined});
      tmp = tmp.filter(function(p){return p.key == d.key});
      return x(tmp[0].value);
    }})
  .attr('y1',function(d,i){return y(d.key) + y.bandwidth()/2})
  .attr('x2',function(d){ return x(d.value)})
  .attr('y2',function(d,i){return y(d.key) + y.bandwidth()/2})
  .attr('stroke',function(d){if(d.conditional=="true"){
    return "green";
  }
  return "blue"});

  g.selectAll('circle').data(function(d){return d.values;}).enter().append('circle')
  .attr('cx',function(d){return x(d.value)})
  .attr('cy',function(d,i){return y(d.key) + y.bandwidth()/2})
  .attr('r',5)  
  .attr('fill',function(d){if(d.conditional=="true"){
    return "green";
  }return "blue"});

  // g.selectAll('text.label').data(function(d){return d.values;}).enter().append('text')
  // .attr('x',function(d){return x(d.value)})
  // .attr('y',function(d,i){return y(d.key) + y.bandwidth()/2 - 5})
  // .attr('class','label')
  // .attr('text-anchor',"middle")
  // .text(function(d){return parseFloat(d.value).toFixed(2) + "%";})

    const yAxis = g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(100, 0)')
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(function(d){if(d=="NA"){return ""} return d;}));
  // updates both the year + the chart type (group or stacked)

      const xAxis = g_wrapper.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,'+height+')')
      .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(function(d){return d+"%"}));
}

d3.csv("assets/data/V3.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();       
    chart = createChart(document.querySelector('svg'), objData)     
})

function makeDatafromCSV() {    
  console.log(countries,cancer_sites,genders,registries,years,agegroups);
  
  var data1 = jsonData;

  if(groupby!="year"){    
    data1 = data1.filter(function(d){return d.year == year});
  }else{    
    data1 = data1.filter(function(d){return years.includes(d.year)});
  }  
  
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

  if(groupby!="agegrp"){
    data1 = data1.filter(function(d){return d.agegrp == agegroup });
  }else{
    data1 = data1.filter(function(d){return agegroups.includes(d.agegrp)});
  }

  if(groupby!="year"){
    data1 = data1.filter(function(d){return d.year == year });
  }else{
    data1 = data1.filter(function(d){return years.includes(d.year)});
  }

  if(groupby=="sub_region"){
    data1 = data1.filter(function(d){return registries.includes(d.sub_region)});
  }else{
    data1 = data1.filter(function(d){return d.sub_region == "All"});
  }

  if(defaultMeasures.includes(measure)){
    data1 = data1.filter(function(d){return d.measure_type == measure});
  }else{
    data1 = data1.filter(function(d){return !defaultMeasures.includes(d.measure_type)});
  }


  data1 = d3.nest()
  .key(function(d) { return d[groupby]})
  .key(function(d){return d.time})
  .rollup(function(d) { 
    return d[0].measure;
  }).entries(data1);

  data1.forEach(function(d){
    d.values.forEach(function(p){            
      if(p.key == "5-year conditional on 1-year"){
        p.key = "5-year";
        p.value = p.value * 100;
        p.conditional = "true";
      }else if(p.key == "3-year conditional on 1-year"){
        p.key = "3-year";
        p.value = p.value * 100;
        p.conditional = "true";
      }else{
        p.value = p.value * 100;
      }
    })
  })

console.log(data1);
  objData = data1;
}

function updateControls(data){  
  var yearData = data.map(function(d){return d.year});

  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});
  var agegroupData = data.map(function(d){return d.agegrp});

  agegroupData.forEach(function(g){
    if(!agegroupOptions.includes(g)){
      agegroupOptions.push(g);
    }
  });

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
  agegroupOptions.forEach(function(country){
    $('#age_group_select').append('<option value="'+country+'">'+country+'</option>');
  })  
  year = d3.max(yearOptions);  
  cancer_site = $("#cancer_sites option:selected").val();
  agegroup = $("#age_group_select option:selected").val();
  measure = $("#measure_select option:selected").val();
  country = $("#country_select option:selected").val();
  gender = "All";
  yearOptions.forEach(function(country){
    $('#period_select').append('<option value="'+country+'">'+country+'</option>');
  })

  $("#period_select option[value="+year+"]").attr('selected', 'selected');


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
    console.log(registries);
  }else if(groupby=="year"){
    $("#checkboxes_wrapper h3").html("Calculation Period");
    yearOptions.forEach(function(country){
      var container = $("#checkboxes_wrapper .input_wrapper");      
      $(container).append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+country+"' name='countries[]' id='"+country+"'checked='checked'><label class='form-check-label' for='"+country+"'>"+country+"</label>");
    })
  }else if(groupby=="agegrp"){
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
        chart = createChart(document.querySelector('svg'), objData) 
    });    

    $("#sidebar").on("change", "select#age_group_select", function() {
        agegroup = $(this).val();
        makeDatafromCSV();      
        chart = createChart(document.querySelector('svg'), objData) 
    });
    $("#sidebar").on("change", "select#country_select", function() {
        country = $(this).val();
         
        updateProvince();
        if(groupby=="sub_region"){
          updateCheckboxes(groupby);          
        }
        makeDatafromCSV();     
      chart = createChart(document.querySelector('svg'), objData) 
    });

    $("#sidebar").on("change", "select#year_select", function() {
        year = $(this).val();        
        makeDatafromCSV();      
    chart = createChart(document.querySelector('svg'), objData)  
    });

    $("#sidebar").on("change", "select#measure_select", function() {
        measure = $(this).val();        
        makeDatafromCSV();      
chart = createChart(document.querySelector('svg'), objData) 
    });    

    $("#sidebar").on("change", "select#period_select", function() {
        year = $(this).val();        
        makeDatafromCSV();      
chart = createChart(document.querySelector('svg'), objData) 
    });

    $('input[type=radio][name=gender]').change(function() {
        gender = $(this).val();
        makeDatafromCSV();        
chart = createChart(document.querySelector('svg'), objData) 
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
      }else if(groupby == "agegrp"){
        agegroups = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
        }).get(); 
      }else if(groupby == "year"){
        years = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
            return $(this).val();
        }).get(); 
      }
          makeDatafromCSV();                    
chart = createChart(document.querySelector('svg'), objData) 
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
          }else if(groupby=="agegrp"){
            $("#country_select").prop('selectedIndex',0);                           
            agegroups = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 
            $(".control_container").removeClass('hide');
            $("#agegroup_wrapper").addClass("hide");
          }else if(groupby=="year"){
            $("#country_select").prop('selectedIndex',0);               
            years = $("#checkboxes_wrapper input:checkbox:checked").map(function(){
              return $(this).val();
            }).get(); 
            $(".control_container").removeClass('hide');
            $("#year_wrapper").addClass("hide");            
          }
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData)           
        }else{
          $("#country_wrapper").removeClass("hide");          
          $("#gender_wrapper").removeClass("hide");
          $("#cancer_site_wrapper").removeClass("hide");
        
          makeDatafromCSV();  

          $("svg").html("");
          chart = createChart(document.querySelector('svg'), objData)           
        }        
    });
});

