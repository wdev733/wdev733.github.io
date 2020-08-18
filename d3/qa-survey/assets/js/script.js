var margin = {top:50,left:50};
var nodes = [], linksArray = [],nodeIds = [], links = [],uniqueLinks=[], nodesObject = new Object, highligthedPaths = [];
var height = 800;
var minBandX = 200;
var xLevel = 0, highlightWidth = 3;

var y = [];
var drawPath = d3.line().curve(d3.curveCardinal );

var strokeWidth = d3.scaleLinear().range([3,50]);

d3.json("assets/data.json", function(error, data) { 

    var jsonData = data.paths;        

    Object.keys(jsonData).forEach(function(key){                                   
        var path = jsonData[key];

        var link = [];
        path.forEach(function(p){            
            if(p.pageid != undefined){
                p.id = p.pageid;
                if(!nodeIds.includes(p.pageid)){
                    nodeIds.push(p.pageid);
                    var tmp = new Object;
                    tmp.id = p.pageid;
                    tmp.highlight = p.highlight;
                    tmp.label = p.label;
                    tmp.type = p.type;
                    tmp.cnt = 1;
                    nodes.push(tmp);                
                }else{
                    nodes.forEach(function(n){
                        if(n.id==p.pageid){
                            n.cnt = n.cnt + 1;                            
                        }
                    })
                }
                link.push(p.pageid);
            }else if(p.decisionid != undefined){
                p.id = p.decisionid;
                if(!nodeIds.includes(p.decisionid)){
                    nodeIds.push(p.decisionid);
                    var tmp = new Object;
                    tmp.id = p.decisionid;
                    tmp.highlight = p.highlight;
                    tmp.label = p.label;
                    tmp.cnt = 1;
                    nodes.push(tmp);                    
                }else{
                   nodes.forEach(function(n){
                        if(n.id==p.decisionid){
                            n.cnt = n.cnt + 1;                            
                        }
                    })
                }
                link.push(p.decisionid);
            }else if(p.type == "exit"){
                link.push("exit_"+p.endstatus);
                p.id = "exit_"+p.endstatus;
                p.highlight =  p.highlight;
            }                        
        })           
        
        linksArray.push(link);            
        if(!isArrayInArray(uniqueLinks,link)){
            uniqueLinks.push(link);
        }
    })

    var newPaths = Object.values(jsonData).sort(function(a,b){return b.length - a.length});

    var allIds = [];    
    xLevel = d3.max(uniqueLinks.map(function(ul){return ul.length;}));
    
    uniqueLinks.forEach(function(ul){
        var i=0;
        linksArray.forEach(function(l){            
            if(ul.equals(l)){
                i++;
            }
        })
        var tmp = new Object;
        tmp.weight = i;
        tmp.path = ul;
        links.push(tmp);
    })

    for(var i=0;i<xLevel;i++){
        nodesObject[i] = [];
    }

    newPaths.forEach(function(p){
        p.forEach(function(l,i){               
            if(!allIds.includes(l.id)){
                allIds.push(l.id);
                if(nodesObject[i].map(function(n){return n.id}).includes(l.id)){
                    nodesObject[i].forEach(function(a){
                        if(a.id==l.id){
                            a.cnt = a.cnt + 1;                                                        
                        }
                    })
                }else{
                    l.cnt = 1;                                
                    nodesObject[i].push(l);    
                }
            }else{
                if(nodesObject[i].map(function(n){return n.id}).includes(l.id)){
                    nodesObject[i].forEach(function(a){
                        if(a.id==l.id){
                            a.cnt = a.cnt + 1;                            
                        }
                    })
                }
            }                                    
        })
    })    
    
    var highlightPaths = Object.values(newPaths).filter(function(d){return d.map(function(l){return l.highlight}).reduce(function(a,b){return a && b;})});

    highlightPaths.forEach(function(path){
        var ts = path.map(function(d){return d.id});
        ts.forEach(function(p,i){
            if(ts[i+1]==undefined){

            }else{                
                var tmp = new Object;
                tmp['from'] = ts[i];
                tmp['to'] = ts[i+1];
                highligthedPaths.push(tmp);
            }
        })
    })

    var uniqueLinkArray = [];
    uniqueLinks.forEach(function(ul){        
        ul.forEach(function(u,i){
            if(ul[i+1] == undefined){                
            }else{                                
                var tmp = new Object;
                tmp['from'] = u;
                var toIds = uniqueLinkArray.filter(function(d){return d.from == u}).map(function(d){return d.to});                
                tmp['to'] = ul[i+1];                
                if(!toIds.includes(tmp['to'])){
                    uniqueLinkArray.push(tmp);
                }                
            }
        })
    })    

    var strokeMax = d3.max(nodes.map(function(n){return n.cnt}));    

    var width = Object.keys(nodesObject).length * minBandX + margin.left * 2;
   
    var yMax = d3.max(Object.values(nodesObject).map(function(d){return d.length}));


    var svg = d3.select("#main_content").append('svg').attr("width",width).attr("height",(height+margin.top))
     .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 })).on('mousedown.zoom',null)
     .append("g")
    .attr("transform","translate("+margin.top+","+margin.left+")")

    var x = d3.scaleBand()    
        .range([0, width])
        .paddingInner(0.1);

    for(var i=0;i<xLevel;i++){
        y[i] = d3.scaleBand().range([0,height]).paddingInner(0.1);
    }

    x.domain(Object.keys(nodesObject)); 

    Object.keys(nodesObject).forEach(function(d,i){        
        var yDomain = [];
        for(var j=0;j<nodesObject[d].length;j++){
            yDomain.push(j);
        }
        y[i].domain(yDomain);
    })
        
    strokeWidth.domain([0,strokeMax]);

    var g_links = svg.append("g").attr('class',"g_links");

    

    g_links.selectAll('.link').data(uniqueLinkArray).enter().append('path').attr('class',function(d){        
        var keyFrom = findKey(nodesObject,d.from);
        var keyTo = findKey(nodesObject,d.to);
        if(nodesObject[keyFrom[0]][keyFrom[1]].highlight == true && nodesObject[keyTo[0]][keyTo[1]].highlight == true){            
        }else if(nodesObject[keyTo[0]][keyTo[1]].highlight == false){
            return 'link dehighlight';
        }else if(nodesObject[keyTo[0]][keyTo[1]].highlight == undefined){
            return "link normal";
        }
        return 'link';
    }).attr("d",function(d){
            var pathData = [];
            var key = findKey(nodesObject,d.from);
            var tmp1 = [x(key[0]), y[key[0]](key[1]) + y[key[0]].bandwidth()/2];
            pathData.push(tmp1);

            key = findKey(nodesObject,d.to);
            var tmp3 = [x(key[0]),y[key[0]](key[1]) + y[key[0]].bandwidth()/2];

            var tmp2 = [];
            tmp2[0] = (tmp3[0] - tmp1[0])/2 + tmp1[0];


            if(tmp3[1] > tmp1[1]){
                tmp2[1] = tmp1[1] - (tmp1[1] - tmp3[1])/2 + 30;
            }else if(tmp3[1] < tmp1[1]){
                tmp2[1] = tmp1[1] + (tmp3[1] - tmp1[1])/2 - 30;
            }else{
                tmp2[1] = tmp1[1] + (tmp3[1] - tmp1[1])/2;
            }
            pathData.push(tmp2);
            pathData.push(tmp3);
            
            return drawPath(pathData);
        })             
        .attr('stroke-width',function(d){
            var key = findKey(nodesObject,d.to);
            var tmp = nodesObject[key[0]][key[1]].cnt;
            return strokeWidth(tmp);
        });
        
    g_links.selectAll('.highlight_link').data(highligthedPaths).enter().append('path').attr('class',function(d){        
        return 'highlight_link highlight';
    }).attr("d",function(d){
            var pathData = [];
            var key = findKey(nodesObject,d.from);
            var tmp1 = [x(key[0]), y[key[0]](key[1]) + y[key[0]].bandwidth()/2];
            pathData.push(tmp1);

            key = findKey(nodesObject,d.to);
            var tmp3 = [x(key[0]),y[key[0]](key[1]) + y[key[0]].bandwidth()/2];

            var tmp2 = [];
            tmp2[0] = (tmp3[0] - tmp1[0])/2 + tmp1[0];


            if(tmp3[1] > tmp1[1]){
                tmp2[1] = tmp1[1] - (tmp1[1] - tmp3[1])/2 + 30;
            }else if(tmp3[1] < tmp1[1]){
                tmp2[1] = tmp1[1] + (tmp3[1] - tmp1[1])/2 - 30;
            }else{
                tmp2[1] = tmp1[1] + (tmp3[1] - tmp1[1])/2;
            }
            pathData.push(tmp2);
            pathData.push(tmp3);
            
            return drawPath(pathData);
        })             
        .attr('stroke-width', highlightWidth);

    var g_node = svg.selectAll('.node_g').data(Object.values(nodesObject)).enter().append('g').attr('class',(d,i)=>'node_g g_'+i).attr('transform',function(d,i){return "translate("+x(i)+",0)"});
    g_node.selectAll('.node')
    .data(function(d,i){return d;}).enter()
    .append('circle').attr('class',function(d){return "node node_"+ d.id + " " + d.type})
    .attr('cx',function(d){return 0;})
    .attr('cy',function(d,i){
        var index = d3.select(this.parentNode).attr('class');
        index = parseInt(index.substr(9));                       
        return y[index](i) + y[index].bandwidth()/2;
    })
    .attr('r',30).attr('fill','red')
    .on("mousemove",function(d){
        div.transition()        
            .duration(200)      
            .style("opacity", .9);      
        div .html(function(){
            if(d.label==undefined){
                return "Exit:"  + d.endstatus;
            }
            return d.label;
        })  
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY - 28) + "px");    
    }).on("mouseout",function(){
        div.transition()        
        .duration(500)      
        .style("opacity", 0);   
    });

    g_node.selectAll("text.cnt").data(function(d){return d;}).enter().append("text").attr('class','cnt').attr("x",function(d){return x(d.id)})
    .attr("y",function(d,i){
        var index = d3.select(this.parentNode).attr('class');
        index = parseInt(index.substr(9));                       
        return y[index](i) + y[index].bandwidth()/2;        
    }).attr("text-anchor","middle").text(function(d){return d.cnt});    

    g_node.selectAll("text.label").data(function(d){return d;}).enter().append("text").attr('class','label').attr("x",function(d){return x(d.id)})
    .attr("y",function(d,i){
        var index = d3.select(this.parentNode).attr('class');
        index = parseInt(index.substr(9));                       
        return y[index](i) + y[index].bandwidth()/2 -  25;        
    }).attr("text-anchor","middle").text(function(d){
        if(d.label!=undefined){
            var s = d.label; 
            if(s.length > 10);
                return s.substr(0,10) + "...";
            return s;
        }else{
            return "Exit " + d.endstatus;
        }
    }); 
});


var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function isArrayInArray(arr, item){
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

function findKey(obj, value)
{
    var key = [];

    for (var prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            var ids = obj[prop].map(function(d){return d.id});            
            if(ids.includes(value)){
                key[0] = prop;
                key[1] = ids.indexOf(value);                
            }
        }
    }

    return key;
};