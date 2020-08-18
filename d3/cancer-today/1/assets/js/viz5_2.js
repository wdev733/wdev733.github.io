var width = 960,
    height = 500; // adjust for height of input bar div

var country = "",
    cancer_site = "",
    gender = "Males",  
    measure = "",
    year,
    groupby = "country", sub_region="",agegroup = [0,90];    

    var margin = {
  top: 20,
  right: 150,
  bottom: 30,
  left: 50
};

width = 1000 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

var agegroupSlider;
var countries = [], cancer_sites=[], genders = [], registries = [];
var countryOptions = [], cancersiteOptions = [], yearOptions = [], genderOptions = [], provincesOption = [], measuresOption = [];
var objData = [],jsonData = [],chartData = [];
var data,chart;
var svg = d3.select("#chart_container").append("svg").attr('width', '100%').attr('height', '100%')
    .attr("viewBox", "0 0 1000 400").attr("preserveAspectRatio", "xMidYMid meet");

var xScale = d3.scaleLinear()
  .range([0, width])
  .domain(agegroup).nice();

var yScale;
  var plotLine = d3.line()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
      return xScale(d.key);
    })
    .y(function(d) {
      return yScale(d.value);
    });
var xAxis, yAxis;
var color = d3.scaleOrdinal(d3.schemeCategory10);

function render(){
  var realData = makeDatafromCSV();

  var yMax = d3.max(realData.map(function(realdatum){return d3.max(realdatum['values'].map(function(v){return v.value}))}));

  yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0,yMax]).nice();

  xAxis = d3.axisBottom(xScale).ticks(12);
  yAxis = d3.axisLeft(yScale).ticks(12 * height / width);

  svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr('id', "axis--y")
    .call(yAxis);
  
  var legend_wrapper = svg.append('g').attr('class','legend_wrapper')

  realData.forEach(function(realdatum,i){
    var g = svg.append('g').attr('class','g_wrapper g_'+i);

    var line = g.append("g").append("path").attr("transform", "translate(" + margin.left + "," + margin.top + ")")    
    .datum(realData[i]['values'])
    .attr('class','path_line')
    .attr("d", plotLine)
    .style("fill", "none")
    .style("stroke", color(i));

  var legend = legend_wrapper.append('g').attr('class','legend_'+i);  
  legend.append('rect').attr('x',(width + 350)).attr('y',10 * i).attr('width',10).attr('height',5).style('fill',color(i));
  legend.append('text').attr('x',(width + 150)).attr('y',10 * i + 5).attr('text-anchor','end').text(realData[i]['key']);
  })
}

function update() {

  let realData = makeDatafromCSV();    

  var yMax = d3.max(realData.map(function(realdatum){return d3.max(realdatum['values'].map(function(v){return v.value}))}));

  xScale.domain(agegroup).nice();
  yScale.domain([0,yMax]).nice();

  svg.select('#axis--y')
        .transition()
          .call(yAxis);
  svg.select('#axis--x')
        .transition()
          .call(xAxis);

  svg.selectAll('.x.label').remove();
  svg.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", 20)
    .attr("x",0 - (height / 2))
    .text(measure);

  svg.append('text').attr("class", "x label")
    .attr("text-anchor", "middle")    
    .attr("y", height + 50)
    .attr("x",width / 2)
    .text("Age");

  d3.select('.legend_wrapper').remove();
  d3.selectAll('.g_wrapper').remove();
  var legend_wrapper = svg.append('g').attr('class','legend_wrapper');


  realData.forEach(function(realdatum,i){
    var g = svg.append('g').attr('class','g_wrapper g_'+i);

    var line = g.append("g").append("path").attr("transform", "translate(" + margin.left + "," + margin.top + ")")    
    .datum(realData[i]['values'])
    .attr('class','path_line')
    .attr("d", plotLine)
    .style("fill", "none")
    .style("stroke", color(i));   

  var legend = legend_wrapper.append('g').attr('class','legend_'+i);
  legend.append('rect').attr('x',width + 80).attr('y',10 * i).attr('width',10).attr('height',2).style('fill',color(i));
  legend.append('text').attr('x',width + 95).attr('y',10 * i + 5).attr('text-anchor','start').text(realData[i]['key']);
  })
}

d3.csv("assets/data/V5_2.csv", function(data) {
    jsonData = data;
    updateControls(jsonData);
    makeDatafromCSV();       
    render();
    update();        
})

function makeDatafromCSV() {    
  var data1 = jsonData;
    
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
  }else{
    data1 = data1.filter(function(d){return d.sub_region == "All"});
  }


  data1 = data1.filter(function(d){return d.measure_type == measure});

  if(agegroup != [0, 90]){
    data1 = data1.filter(function(d){
      return d.age >= agegroup[0] && d.age <= agegroup[1];
    })
  }
  
  console.log(data1);
  data1 = d3.nest()
  .key(function(d){return d[groupby]})
  .key(function(d) { return d.age;})  
  .rollup(function(d) { 
   return d3.sum(d, function(g) {return g.measure; });
  }).entries(data1);

  
  return data1;
}

function updateControls(data){  
  var yearData = data.map(function(d){return d.year});

  var countryData = data.map(function(d) { return d.country});
  var cancersiteData = data.map(function(d) { return d.cancer_site});
  var genderData = data.map(function(d){return d.sex});
  var ageData = data.map(function(d){return d.age});

  var measuresData = data.map(function(d){return d.measure_type});

  agegroup = d3.extent(ageData);  
  genderData.forEach(function(g){
    if(!genderOptions.includes(g)){
      genderOptions.push(g);
    }
  });  

  measuresData.forEach(function(g){
    if(!measuresOption.includes(g)){
      measuresOption.push(g);
    }
  });

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
  gender = "Males";
  yearOptions.forEach(function(country){
    $('#year_select').append('<option value="'+country+'">'+country+'</option>');
  })  

  measuresOption.sort();

  measuresOption.forEach(function(country){
    $('#measure_selects').append('<option value="'+country+'">'+country+'</option>');
  })
  measure = $("#measure_selects option:selected").val();

  $("#year_select option[value="+year+"]").attr('selected', 'selected');

  var aMin = d3.min(ageData), aMax = d3.max(ageData);
  
  agegroupSlider = $("#agegroup").slider({ handle:"square", min: parseInt(aMin), max: parseInt(aMax), step:5, value: [parseInt(aMin),parseInt(aMax)], focus: true,tooltip: 'always' }).on('slide',function(slideEvt){
      agegroup = slideEvt.value;            
      makeDatafromCSV();            
      updateAgeSelect(agegroup);
      update();
    }).data('slider');  

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

function updateAgeSelect(agegroup){
  $("#age_start").val(agegroup[0]);
  $("#age_end").val(agegroup[1]);
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
        update();            
    });
    $("#sidebar").on("change", "select#country_select", function() {
        country = $(this).val();
        makeDatafromCSV();      
        updateProvince();
        if(groupby=="sub_region"){
          updateCheckboxes(groupby);
        }      
        update();  
    });
    
    $("#sidebar").on("change", "select#measure_selects", function() {
        measure = $(this).val();
        makeDatafromCSV();            
        update();  
    });
    $('input[type=radio][name=gender]').change(function() {
        gender = $(this).val();
        makeDatafromCSV();            
        update();    
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
      update();                      
    });

    $('#age_start').on('change',function(){
      var tmpArray = [];
      if($(this).val()>= agegroup[1]){
        $(this).val(agegroup[1] - 5);
      }
      tmpArray.push(parseInt($(this).val()));
      tmpArray.push(parseInt(agegroup[1]));
      agegroupSlider.setValue(tmpArray,true);
    })
    $('#age_end').on('change',function(){
      var tmpArray = [];
      tmpArray.push(parseInt(agegroup[0]));
      if($(this).val()<= agegroup[0]){
        $(this).val(agegroup[0] + 5);
      }
      tmpArray.push(parseInt($(this).val()));      
      agegroupSlider.setValue(tmpArray,true);
    })

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
          update();

        }else{
          $("#country_wrapper").removeClass("hide");          
          $("#gender_wrapper").removeClass("hide");
          $("#cancer_site_wrapper").removeClass("hide");
        
          makeDatafromCSV();  
          update();
        }        
    });
});

