//define column names;
let field_redundancy = "RedundancyMultiple";
let field_rowcnt = "RowCounts";
let field_sensitivity = "SensitivtyScore";

let clicked_data = "";
let data_full, data_filtered;
var selected_length="", selected_color="";

let breadcrumbColors = {
    "DataStoreName":"#9cc4b2",
    "TableName":"#c98ca7",
    "DataElementName":"#e76d83"
}
let tree_depth;

// Filter by Sensitivity checkbox changes
$("[name='sensitivity[]']").change(function(d){
    filter_data();       
    console.log(data_filtered);
    let root = createTreeData(data_filtered);
    render_chart(root);              
});

// Filter rings checkbox changes
$("[name='rings[]']").change(function(d){
    if($("input[name='rings[]']:checked").length == 0){
        $('.ring-error-msg').removeClass('hide');
        setTimeout(function() {
            $('.ring-error-msg').addClass('hide');
        },2000);
        $(this).prop('checked', true);
    }
    let root = createTreeData(data_filtered);
    render_chart(root);            
});

// Data selection checkbox changes
$('[name="selection[]"]').change(function(){
    let checked = [];
    if($("input[name='selection[]']:checked").length > 2){
        $('.error-msg').removeClass('hide');
        setTimeout(function() {
            $('.error-msg').addClass('hide');
        },2000);
        $(this).prop('checked', false);
    }
    $("input[name='selection[]']:checked").each (function ()
    {
        checked.push($(this).val());
    });            

    if(checked.includes('Sensitivity')){
        $("#data-selection-widget select").children('option[value="color"]').hide();
        $("#data-selection-widget select").val('length');
    }else{
        if($(this).attr('id')=="checkbox-redundancy"){
            // $("#select-redundancy").show();
            if(checked.includes("RowCount")){
                if($("#select-rowcount").val()=="length"){                            
                    $("#select-redundancy").val("color");
                }else{
                    $("#select-redundancy").val("length");
                }
            }
        }else if($(this).attr('id')=="checkbox-rowcount"){
            // $("#select-rowcount").show();
            if(checked.includes("Redundancy")){
                if($("#select-redundancy").val()=="length"){
                    $("#select-rowcount").val("color");
                }else{
                    $("#select-rowcount").val("length");
                }
            }
        }
        $("#data-selection-widget select").children('option').show();
    }

    getSelectionValues();
    let root = createTreeData(data_filtered);
    render_chart(root);  
});

// Row count dropdown changes (select length or color)
$("#select-rowcount").change(function(d){
    if($(this).val()=="color"){
        $("#select-redundancy").val("length");
    }else{
        $("#select-redundancy").val("color");
    }
    getSelectionValues();
    let root = createTreeData(data_filtered);
    render_chart(root);  
});

// Redundancy dropdown changes (select length or color)
$("#select-redundancy").change(function(d){
    if($(this).val()=="color"){
        $("#select-rowcount").val("length");
    }else{
        $("#select-rowcount").val("color");
    }
    getSelectionValues();
    let root = createTreeData(data_filtered);
    render_chart(root);  
});


$("[name='include-zero-rowcount']").change(function(d){
    filter_data();
    let root = createTreeData(data_filtered);
    render_chart(root);
});

$("#aggregate-select").change(function(){
    filter_data();
    let root = createTreeData(data_filtered);
    render_chart(root);
});

$("#checkbox-redundancy").change(function(){
    if($(this).prop('checked')==true){
        // $("#select-redundancy").removeClass('hide');
    }else{
        $("#select-redundancy").addClass('hide');
    }
});

$("#checkbox-rowcount").change(function(){
    if($(this).prop('checked')==true){
        // $("#select-rowcount").removeClass('hide');
    }else{
        $("#select-rowcount").addClass('hide');
    }
});

// const width = window.innerWidth,
//     height = window.innerHeight,
let b = {
    w: 250, h: 30, s: 3, t: 10
};

let width = 900;
let height = 800,
    maxRadius = (Math.min(width, height) / 2) - 5;

const formatNumber = d3.format(',d');

const sensitivity0color = "#65D188";

initializeBreadcrumbTrail();
const x = d3.scaleLinear()
    .range([0, 2 * Math.PI])
    .clamp(true);

// const y = d3.scalePow().exponent(2)
//     .range([150, maxRadius]);

let yMin = 150
let yRange = [0, yMin+20, yMin+30,yMin+50, yMin+70, maxRadius];
const y = d3.scaleLinear().range(yRange).domain([0,0.25,0.333,0.5,0.75,1]);
const yRowCounts = d3.scaleLinear().range([5,maxRadius - yMin - 80]);
const yRedundancy = d3.scaleLinear().range([5,maxRadius - yMin - 80]);

const color = d3.scaleOrdinal(d3.schemeCategory20);
var xScale = d3.scaleLinear().domain([0, 100]).range([0, 500])

var colorScale = d3.scaleLinear().range(["#EEEEEE", "#B928BB","#FC0E36"]);

const partition = d3.partition();

const arc = d3.arc()
    .startAngle(d => x(d.x0))
    .endAngle(d => x(d.x1))
    .innerRadius(d => Math.max(0, y(d.y0)))
    .outerRadius(d => Math.max(0, y(d.y1)));

const outArcByRowCount = d3.arc()
    .startAngle(d => x(d.x0))
    .endAngle(d => x(d.x1))
    .innerRadius(function(d){                
        return Math.max(0, y(d.y0));
    })            
    .outerRadius(function(d){                                 
        return Math.max(0, y(d.y0)) + yRowCounts(parseInt(d.data[field_rowcnt]));
    });

const outArcByRedundancy = d3.arc()
    .startAngle(d => x(d.x0))
    .endAngle(d => x(d.x1))
    .innerRadius(d => Math.max(0, y(d.y0)))
    .outerRadius(function(d){
        return Math.max(0, y(d.y0)) + yRedundancy(parseFloat(d.data[field_redundancy]))
    });

const middleArcLine = d => {
    const halfPi = Math.PI/2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
    if (invertDirection) { angles.reverse(); }

    const path = d3.path();
    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const textFits = d => {
    const CHAR_SPACE = 6;

    const deltaAngle = x(d.x1) - x(d.x0);
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
    const perimeter = r * deltaAngle;

    return d.data.name.length * CHAR_SPACE < perimeter;
};

let svg;        

get_data();
function get_data(){
    d3.csv('DataInventoryReport2.csv', function(data){                  
        data_full = data;
        data_filtered = data;                
        let treeArrayData = [];

        filter_data();
        getSelectionValues();        
        let root = createTreeData(data_filtered);
        render_chart(root);      
    });
}        
        
function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {            
    d3.select("#container").on("mouseleave", null);
    // Reset to top-level if no data point specified                        

    const transition = svg.transition()
        .duration(1000)
        .tween('scale', () => {                    
            const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), y.domain());                        
            return t => { x.domain(xd(t)); y.domain(yd(t)); };
        });
    
    yRowCounts.domain([0,d3.max(d.descendants().filter(function(d){return d.height == 0}).map(function(j){return j.data[field_rowcnt]}))]);
    yRedundancy.domain([0, d3.max(d.descendants().filter(function(d){return d.height == 0}).map(function(j){return j.data[field_redundancy]}))]);  

    transition.selectAll('path.main-arc')
        .attrTween('d', function(d){
            return function(){                         
                if(d.children == undefined){
                    if(selected_length == field_rowcnt){                                          
                        return outArcByRowCount(d);
                    }else if(selected_length == field_redundancy){
                        return outArcByRedundancy(d);
                    }else{
                        return arc(d);
                    }
                }else{
                    return arc(d);
                }                          
            } 
        }).on('end', function(d){                    
            d3.select("#container").on("mouseleave", mouseleave);          
        });
                                    
    transition.selectAll('path.hidden-arc')
        .attrTween('d', d => () => middleArcLine(d));

    transition.selectAll('text')
        .attrTween('display', d => () => textFits(d) ? null : 'none');

    // moveStackToFront(d);
    
    //            
    // function moveStackToFront(elD) {                
    //     svg.selectAll('.slice').filter(d => d === elD)
    //         .each(function(d) {
    //             this.parentNode.appendChild(this);
    //             if (d.parent) { moveStackToFront(d.parent); }
    //         })
    // }            
}

function mouseover(d) {                        
    if(d.depth !=0){            
        var percentage = (100 * d.value / totalSize).toPrecision(3);            
        var percentageString = "RowCounts:" + d['data'][field_rowcnt] + ' ' + "SensitivtyScore:" +  d['data'][field_sensitivity] + " " + "RedundancyMultiple:" + d['data'][field_redundancy];
        
        d3.select("#percentage")
            .text(percentageString);
        
        var sequenceArray = d.ancestors().reverse();
        sequenceArray.shift(); // remove root node from the array
        updateBreadcrumbs(sequenceArray, percentageString);

        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        svg.selectAll("path")
            .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                    })
            .style("opacity", 1);

    }
}

function mouseleave(d) {            
    // Hide the breadcrumb trail
    // d3.select("#trail")
    //     .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")
        .transition()
        .duration(500)
        .style("opacity", 1)
        .on("end", function() {
                d3.select(this).on("mouseover", mouseover);
            });

    d3.select("#explanation")
        .style("visibility", "hidden");
}

function createTreeData(data) {            
    let keys = ['DataStoreName','TableName'],
        final = {};
       result = data.reduce((r, o) => {
            keys
                .reduce((array, k) => {                            
                    var temp = array.find(({ name }) => name === o[k]);
                    if (!temp) array.push(temp = { name: o[k], RowCounts: 0,SensitivtyScore:0,RedundancyMultiple:0, children: [] });
                    // temp.rowcount += +o.RowCounts;                            
                    temp[field_rowcnt] = parseInt(o.RowCounts);
                    if($("#aggregate-select").val()=="sum"){                                                                
                        temp[field_sensitivity] += +o[field_sensitivity];
                        temp[field_redundancy] += +o[field_redundancy];
                    }else if($("#aggregate-select").val()=="average"){                        
                        if(temp.children.length == 0){
                            temp[field_sensitivity] = 0;
                            temp[field_redundancy] = 0;
                        }else{
                            temp[field_sensitivity] = parseFloat(d3.sum(temp.children.map(function(d){return d[field_sensitivity]})) / temp.children.length).toFixed(2);
                            temp[field_redundancy] = parseFloat(d3.sum(temp.children.map(function(d){return d[field_redundancy]})) / temp.children.length).toFixed(2);
                        }                                
                    }                         
                    temp['size'] = 0;
                    temp['key'] = k;
                    return temp.children;
                }, r)
                .push({ name: o.DataElementName, size: +1, RowCounts: +o.RowCounts, SensitivtyScore: +o.SensitivtyScore,RedundancyMultiple: +o.RedundancyMultiple});
            return r;
        }, []);            

    result.forEach(function(store){
        store.children.forEach(function(tbl){
            if($("#aggregate-select").val()=="average"){
                tbl[field_sensitivity] = parseFloat(d3.sum(tbl.children.map(function(d){return d[field_sensitivity]})) / tbl.children.length).toFixed(2);
                tbl[field_redundancy] = parseFloat(d3.sum(tbl.children.map(function(d){return d[field_redundancy]})) / tbl.children.length).toFixed(2);
            }else{
                tbl[field_redundancy] = parseFloat(d3.sum(tbl.children.map(function(d){return d[field_redundancy]}))).toFixed(2);
                tbl[field_sensitivity] = parseFloat(d3.sum(tbl.children.map(function(d){return d[field_sensitivity]}))).toFixed(2);
            }
        });
        if($("#aggregate-select").val()=="average"){
            store[field_sensitivity] = parseFloat(d3.sum(store.children.map(function(d){return d[field_sensitivity]})) / store.children.length).toFixed(2);
            store[field_redundancy] = parseFloat(d3.sum(store.children.map(function(d){return d[field_redundancy]})) / store.children.length).toFixed(2);
        }else{
            store[field_sensitivity] = parseFloat(d3.sum(store.children.map(function(d){return d[field_sensitivity]}))).toFixed(2);
            store[field_redundancy] = parseFloat(d3.sum(store.children.map(function(d){return d[field_redundancy]}))).toFixed(2);
        }
    })

    var rings = [];
    $("input[name='rings[]']:checked").each(function ()
    {
        rings.push(($(this).val()));
    });            

    tree_depth = rings.length;            
    let filtered_res = [];

    result.forEach(function(store,i){                
        if(rings.includes("DataStoreName")){                    
            let tmp = [];
            store.children.forEach(function(table){                        
                if(!rings.includes("DataElementName")){
                    delete table.children;
                }
                if(!rings.includes("TableName")){                            
                    if(table.children){
                        table.children.forEach(function(el){
                            tmp.push(el);
                        })                            
                    }                            
                }
            });                         
            if(!rings.includes("TableName")){                        
                store.children = tmp;                        
            }
            if(!rings.includes("TableName") && !rings.includes("DataElementName")){
                delete store.children;
            }                    
            // filtered_res.push(store);
        }else{
            store.children.forEach(function(table){                        
                if(!rings.includes("DataElementName")){
                    delete table.children;
                }
                if(rings.includes("TableName")){
                    filtered_res.push(table);
                }else{
                    table.children.forEach(function(el){
                        filtered_res.push(el);
                    })
                }
            })
        }
    });
        
    if(rings.includes("DataStoreName")){
        final = {'name':"Tree-ROOT", children:result};
    }else{
        final = {'name':"Tree-ROOT", children:filtered_res};
    }
    
    return final;
}

function filter_data(){            
    let checked = [];
    $("input[name='sensitivity[]']:checked").each(function ()
    {
        checked.push(parseInt($(this).val()));
    });            
    
    // data_filtered = data_full.filter(function(d){return checked.includes(d[field_sensitivity])});
    data_tmp = data_full.filter(function(d){return checked.includes(parseInt(d[field_sensitivity]))});  
    
    if(!$("[name='include-zero-rowcount']").prop('checked')){
        data_filtered = data_tmp.filter(function(d){return parseInt(d[field_rowcnt])!= 0});
    }else{
        data_filtered = data_tmp;
    }            
    return data_filtered;
}

function render_chart(root){                          
    $("#chart").html("");
    svg = d3.select('#chart').append('svg')
    .attr("width", width)
    .attr("height", height)            
    .append("g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .on('click', () => focusOn()); // Reset zoom on canvas click               

    root = d3.hierarchy(root);                    
    root.sum(function(d){return d.children ? 0 : 1;});

    root.sort(function(a, b) { return a.value - b.value; });      
        
    if(clicked_data == ""){
        yRowCounts.domain([0, d3.max(root.descendants().filter(function(d){return d.height == 0}).map(function(d){return parseInt(d.data[field_rowcnt]);}))]);
        yRedundancy.domain([0, d3.max(root.descendants().filter(function(d){return d.height == 0}).map(function(d){return parseFloat(d.data[field_redundancy]);}))]);            
    }else{             
        console.log(clicked_data);
        let new_clicked = getIndexfromRoot(root, clicked_data);                    
        console.log(new_clicked);
        yRowCounts.domain([0, d3.max(new_clicked.descendants().map(function(d){return parseInt(d.data[field_rowcnt])}))]);
        yRedundancy.domain([0, d3.max(new_clicked.descendants().map(function(d){return parseFloat(d.data[field_redundancy]);}))]);            
    }            
                
    let colMin = d3.min(root.descendants().map(function(d){return parseFloat(d.data[selected_color]);}));
    let colMax = d3.max(root.descendants().map(function(d){return parseFloat(d.data[selected_color]);}));

    let colMean = (colMin + colMax )/ 2;
    colorScale.domain([colMin,colMean,colMax]);
    d3.select("#color-min").text(colMin);
    d3.select("#color-max").text(colMax);

    const slice = svg.selectAll('g.slice')
        .data(partition(root).descendants());

    slice.exit().remove();

    const newSlice = slice.enter()
        .append('g')
        .attr('class', d=>{
            if(d.depth == 0) return "slice root";
            if(d.children==undefined) return 'slice leaves'; return 'slice';
        })
        .on('click', d => {       
            d3.event.stopPropagation();
            clicked_data = d;                    
            focusOn(d);                    
        }).on('mouseover', mouseover);

    newSlice.append('title')
        // .text(d => d.data.name + '\n' + formatNumber(d.value));
        .text(d => d.data.name);

    newSlice.append('path')
        .attr('class', 'main-arc')
        .style('fill', function(d){
            if(selected_color == ""){
                if(root.height !=1){
                    return color((d.children ? d : d.parent).data.name)
                }else{
                    return color(d.data.name);
                }                        
            }else if(selected_color == field_sensitivity){                                    
                return colorScale(parseFloat(d.data[field_sensitivity]));                        
            }else if(selected_color == field_rowcnt){
                return colorScale(parseFloat(d.data[field_rowcnt]));
            }else if(selected_color == field_redundancy){
                return colorScale(parseFloat(d.data[field_redundancy]));
            }
        })
        .attr('d', function(d){                    
            if(d.children == undefined){
                if(selected_length == field_rowcnt){                            
                    return outArcByRowCount(d);
                }else if(selected_length == field_redundancy){
                    return outArcByRedundancy(d);
                }else{
                    return arc(d);
                }
            }else{
                return arc(d);
            }                    
        });

    newSlice.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc${i}`)
        .attr('d', middleArcLine);

    const text = newSlice.append('text')
        .attr('display', function(d){
            if(d.depth > 1){
                return "none";
            }
            return textFits(d) ? null : 'none';
            });

    // Add white contour
    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name)
        .style('fill', 'none');

    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name);

    d3.select("#container").on("mouseleave", mouseleave);
    
    totalSize = root.value;

    if(clicked_data !=""){
        let new_clicked = getIndexfromRoot(root, clicked_data);                    
        focusOn(new_clicked);
    }
    
}

function getSelectionValues(){
    selected_color = "", selected_length = "";
    let checked = [];
    $("input[name='selection[]']:checked").each(function(){
        checked.push($(this).val());
    }); 

    if(checked.includes("Sensitivity")){        
        $("#data-selection-widget select").addClass('hide');
        selected_color = "SensitivtyScore";
        if(checked.includes("RowCount")){
            selected_length = field_rowcnt;
        }else if(checked.includes("Redundancy")){
            selected_length = field_redundancy;
        }
    }else{
        if(checked.includes("RowCount")){
            if($("#select-rowcount").val() == "length"){
                selected_length = field_rowcnt;
            }else if($("#select-rowcount").val() == "color"){
                selected_color = field_rowcnt;                
            }
            $("#select-rowcount").removeClass('hide');                
        }
        if(checked.includes("Redundancy")){
            if($("#select-redundancy").val() == "length"){
                selected_length = field_redundancy;
            }else if($("#select-redundancy").val() == "color"){
                selected_color = field_redundancy;                
            }
            $("#select-redundancy").removeClass('hide');
        }
    }                        

    // Legend 
    $("#length_span").html(selected_length);
    if(selected_length==""){
        $("#length_span").html("Entity Count");
    }
    $("#color_span").html(selected_color);
    if(selected_color==""){
        $(".color-legend").addClass('hide');
    }else{        
        $(".color-legend").removeClass('hide');                
    }          
}      

//breadcrumb
function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", 1300)
        .attr("height", 100)
        .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
}

function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w + ",0");
    points.push(b.w + b.t + "," + (b.h / 2));
    points.push(b.w + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
}

function updateBreadcrumbs(nodeArray, percentageString) {
    // Data join; key function combines name and depth (= position in sequence).
    var trail = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d) { return d.data.name + d.depth; });

    // Remove exiting nodes.
    trail.exit().remove();

    // Add breadcrumb and label for entering nodes.
    var entering = trail.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) {                     
            // 
            if(d.data.key == undefined){
                    return breadcrumbColors['DataElementName'];
                }else{
                    return breadcrumbColors[d.data.key];
                }                        
        });

    entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.name; });

    entering.append('text')
        .attr('class','breadcrumb-text')
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2 + 30)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return "Row Count:" + d.data[field_rowcnt]; });

    entering.append('text')
        .attr('class','breadcrumb-text')
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2 + 40)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return "Sensitivity Score:" + d.data[field_sensitivity]; });

    entering.append('text')
        .attr('class','breadcrumb-text')
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2 + 50)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return "Redundancy multiple:" + d.data[field_redundancy]; });

    // Merge enter and update selections; set position for all nodes.
    entering.merge(trail).attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
    });

    // Now move and update the percentage at the end.
    // d3.select("#trail").select("#endlabel")
    //     .attr("x", (nodeArray.length) * (b.w + b.s) + 10)
    //     .attr("y", b.h / 2)
    //     .attr("dy", "0.35em")
    //     .attr("text-anchor", "start")
    //     .text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "");
}

function getIndexfromRoot(root, clicked_data){
    let res = "";
    if(clicked_data.data.name == "Tree-ROOT"){
        res = root;
        return res;
    }else{
        root.children.forEach(function(store){
            if(store.data.name == clicked_data.data.name && clicked_data.data[field_rowcnt] == store.data[field_rowcnt] && store.parent.data.name == clicked_data.parent.data.name)  {                
                res = store;
                return;
            }
            if(store.children){
                store.children.forEach(function(table){
                    if(table.data.name == clicked_data.data.name && clicked_data.data[field_rowcnt] == table.data[field_rowcnt] && table.parent.data.name == clicked_data.parent.data.name)  {                
                        res = table;
                        return;
                    }                
                    if(table.children){
                        table.children.forEach(function(el){
                            if(el.data.name == clicked_data.data.name && clicked_data.data[field_rowcnt] == el.data[field_rowcnt] && el.parent.data.name == clicked_data.parent.data.name)  {                
                                res = el;
                                return;
                            }                               
                        })
                    }
                })
            }            
        })
    }
    if(res==""){
        res = root;
    }
    return res;
}