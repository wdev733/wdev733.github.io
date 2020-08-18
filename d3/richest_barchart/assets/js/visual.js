if (!Array.prototype.remove) {
    Array.prototype.remove = function(val) {
        var i = this.indexOf(val);
        return i > -1 ? this.splice(i, 1) : [];
    };
}

d3.csv("assets/data/richest_people.csv").then(function(data) {
    draw(data)    
});


function draw(data) {
    var date = [];
    var names = [];
    data.forEach(element => {
        if (date.indexOf(element["date"]) == -1) {
            date.push(element["date"]);
        }
        if (names.indexOf(element['name']) == -1) {
            names.push(element['name']);
        }
    });
    let rate = [];
    var auto_sort = config.auto_sort;
    if (auto_sort) {
        var time = date.sort((x, y) => new Date(x) - new Date(y));
    } else {
        var time = date;
    }
    
    var colorByNames = new Object;

    var colorsArray = ["#FF0000", "#000000", "#6B7490", "#666665", "#3D0048", "#001348", "#004839", "#1F5200", "#5A5700", "#5A0000", "#9C0082", "#47009C", "#00289C", "#006F9C", "#009C6A", "#6A9C00", "#9C5A00", "#9C0000", "#FF00F0", "#8700FF", "#001BFF", "#00BDFF", "#04FF00", "#FFA200"];
    names.forEach(function(name) {
        var tmp1 = new Object;
        name = name.replace(/\s/g, '');
        colorByNames[name] = colorsArray[Math.floor(Math.random() * colorsArray.length)];;
    })

    var big_value = config.big_value;
    var divide_by = config.divide_by;

    var baseTime = 3000;

    var allow_up = config.allow_up;
    var interval_time = config.interval_time;

    var format = config.format;
    var left_margin = config.left_margin;
    var right_margin = config.right_margin;
    var top_margin = config.top_margin;
    var bottom_margin = config.bottom_margin;
    var timeFormat = config.timeFormat;
    var max_number = config.max_number;
    var reverse = config.reverse;

    const margin = {
        left: left_margin,
        right: right_margin,
        top: top_margin,
        bottom: bottom_margin
    };
    var background_color = config.background_color;

    d3.select("body").attr("style", "background:" + background_color);

    var enter_from_0 = config.enter_from_0;
    interval_time /= 3;
    var lastData = [];
    var currentdate = time[0].toString();
    var currentData = [];

    const width = document.getElementById("chart_wrapper").getBoundingClientRect().width;
    const height = document.getElementById("chart_wrapper").getBoundingClientRect().height;

    const svg = d3.select("svg")
        .attr('width', width)
        .attr('height', height)
        .style('background', function(d, i) {
            if (config.blur_background_image)
                return 'linear-gradient(rgba(253, 242, 232, 0.8), rgba(253, 242, 232, 0.8)), url("assets/img/background.png")';
            else
                return 'url("assets/img/background.png") no-repeat';
        })
        .style('background-size', '100%')
        .style('-webkit-animation', function(d) {
            if (config.animate_background_image) return 'slide 120s linear infinite';
            return null;

        });

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom - 32;
    //var dateLabel_y = height - margin.top - margin.bottom - 32;;
    const xValue = d => Number(d.value);
    const yValue = d => d.name;

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxisG = g
        .append("g")
        .attr("transform", `translate(0, 0)`);
    const yAxisG = g.append("g");

    xAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 100);

    var xScale = d3.scaleLinear();

    const yScale = d3
        .scaleBand()
        .paddingInner(0.3)
        .paddingOuter(0);

    const xTicks = 7;
    const xAxis = d3
        .axisTop()
        .scale(xScale)
        .ticks(xTicks)
        .tickPadding(10)
        .tickFormat(d => {
            if (d <= 0) {
                return "";
            }
            return d;
        })
        .tickSize(-innerHeight);


    const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickPadding(5)
        .tickSize(-innerWidth);

    var dateLabel_switch = config.dateLabel_switch;
    var dateLabel_x = config.dateLabel_x;
    var dateLabel_y = config.dateLabel_y;
    //dateLabel位置
    if (dateLabel_x == null || dateLabel_y == null) {
        dateLabel_x = innerWidth; //默认
        dateLabel_y = innerHeight; //默认
    } //是否隐藏
    if (dateLabel_switch == false) {
        dateLabel_switch = "hidden";
    } else {
        dateLabel_switch = "visible";
    }

    var dateLabel = g
        .insert("text")
        .data(currentdate)
        .attr("class", "dateLabel")
        .attr('font-size', config.date_label.font_size + 'pt')
        .attr("style:visibility", dateLabel_switch)
        .attr("x", dateLabel_x + config.date_label.x)
        .attr("y", dateLabel_y + config.date_label.y)
        .attr("text-anchor", function() {
            return "end";
        })
        .text(currentdate);

    function dataSort() {
        if (reverse) {
            currentData.sort(function(a, b) {
                if (Number(a.value) == Number(b.value)) {
                    var r1 = 0;
                    var r2 = 0;
                    for (let index = 0; index < a.name.length; index++) {
                        r1 = r1 + a.name.charCodeAt(index);
                    }
                    for (let index = 0; index < b.name.length; index++) {
                        r2 = r2 + b.name.charCodeAt(index);
                    }
                    return r2 - r1;
                } else {
                    return Number(a.value) - Number(b.value);
                }
            });
        } else {
            currentData.sort(function(a, b) {
                if (Number(a.value) == Number(b.value)) {
                    var r1 = 0;
                    var r2 = 0;
                    for (let index = 0; index < a.name.length; index++) {
                        r1 = r1 + a.name.charCodeAt(index);
                    }
                    for (let index = 0; index < b.name.length; index++) {
                        r2 = r2 + b.name.charCodeAt(index);
                    }
                    return r2 - r1;
                } else {
                    return Number(b.value) - Number(a.value);
                }
            });
        }
    }

    function getCurrentData(date) {
        rate = [];
        currentData = [];
        indexList = [];

        data.forEach(element => {
            if (element["date"] == date && parseFloat(element["value"]) != 0) {
                if (element.name.length > config.bar_name_max) {
                    tail = "...";
                } else {
                    tail = "";
                }
                element.name = element.name.slice(0, config.bar_name_max - 1) + tail;
                element.value = parseFloat(element.value);
                currentData.push(element);
            }
        });

        rate["MAX_RATE"] = 0;
        rate["MIN_RATE"] = 1;
        currentData.forEach(e => {
            _cName = e.name;
            lastData.forEach(el => {
                if (el.name == e.name) {
                    rate[e.name] = Number(Number(e.value) - Number(el.value));
                }
            });
            if (rate[e.name] == undefined) {
                rate[e.name] = rate["MIN_RATE"];
            }
            if (rate[e.name] > rate["MAX_RATE"]) {
                rate["MAX_RATE"] = rate[e.name];
            } else if (rate[e.name] < rate["MIN_RATE"]) {
                rate["MIN_RATE"] = rate[e.name];
            }
        });
        currentData = currentData.slice(0, max_number);

        dataSort();

        d3.transition("2")
            .each(redraw)
            .each(change);
        lastData = currentData;
    }

    var avg = 0;

    var firstTime = true;

    function redraw() {
        if (currentData.length == 0) return;

        if (big_value) {
            xScale
                .domain([
                    2 * d3.min(currentData, xValue) - d3.max(currentData, xValue),
                    d3.max(currentData, xValue) + 10
                ])
                .range([0, innerWidth]);
        } else {
            xScale
                .domain([0, d3.max(currentData, xValue) + 1])
                .range([0, innerWidth]);
        }
        if (auto_sort) {
            dateLabel
                .data(currentData)
                .transition()
                .duration(baseTime * interval_time)
                .ease(d3.easeLinear)
                .tween("text", function(d) {
                    var self = this;

                    var tmp = new Date(d.date);
                    var nextDay = new Date(d.date);
                    nextDay.setDate(tmp.getDate()+1);
                    var i = d3.interpolateDate(
                        new Date(self.textContent),
                        nextDay
                    );
                    return function(t) {
                        var dateformat = d3.timeFormat(timeFormat);
                        self.textContent = dateformat(i(t));
                    };
                });
        } else {
            dateLabel.text(currentdate);
        }


        xAxisG
            .transition()
            .duration(baseTime * interval_time)
            .ease(d3.easeLinear)
            .call(xAxis);
        yAxisG
            .transition()
            .duration(baseTime * interval_time)
            .ease(d3.easeLinear)
            .call(yAxis);

        yAxisG.selectAll(".tick").remove();
        if (!config.show_x_tick) {
            xAxisG.selectAll(".tick").remove();
        }

        yScale
            .domain(currentData.map(d => d.name).reverse())
            .range([innerHeight, 0]);

        var bar = g.selectAll(".bar").data(currentData, function(d) {
            return d.name;
        });

        var barEnter = bar
            .enter()
            .insert("g", ".axis")
            .attr("class", "bar")
            .attr("transform", function(d) {
                return "translate(0," + yScale(yValue(d)) + ")";
            });

        let bars = barEnter
            .append("rect")
            .attr("width", function(d) {
                if (enter_from_0) {
                    return 0;
                } else {
                    return xScale(currentData[currentData.length - 1].value);
                }
            })
            .attr("fill-opacity", 0)
            .attr("height", config.bar_height)
            .attr("y", 50)
            .style("fill", function(d) {
                name = d.name.replace(/\s/g, '');
                return colorByNames[name]
            })
            .transition("a")
            .delay(500 * interval_time)
            .duration(2490 * interval_time)
            .attr("y", 0)
            .attr("width", d => xScale(xValue(d)))
            .attr("fill-opacity", 1);

        if (config.showLabel == true && config.display_left_of_the_bar != 'rank') {
            barEnter
                .append("text")
                .attr("y", 50)
                .attr("fill-opacity", 0)
                .style("fill", function(d) {
                    name = d.name.replace(/\s/g, '');
                    return colorByNames[name];
                })
                .transition("2")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("fill-opacity", 1)
                .attr("y", 0)
                .attr("class", function(d) {
                    return "label ";
                })
                .attr("x", config.labelx)
                .attr("y", 30)
                .attr("text-anchor", "end")
                .text(function(d, i) {
                    return d[config.display_left_of_the_bar];
                });
        }

        barEnter
            .append("text")
            .attr("x", function() {
                if (enter_from_0) {
                    return 0;
                } else {
                    return xScale(currentData[currentData.length - 1].value);
                }
            })
            .attr("y", 50)
            .attr("fill-opacity", 0)
            .style("fill", function(d) {
                name = d.name.replace(/\s/g, '');
                return colorByNames[name]
            })
            .transition()
            .duration(2990 * interval_time)
            .tween("text", function(d) {
                var self = this;

                self.textContent = Number(d.value) * 0.9;
                var i = d3.interpolate(self.textContent, Number(d.value)),
                    prec = (Number(d.value) + "").split("."),
                    round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                return function(t) {
                    self.textContent = d3.format(format)(
                        Math.round(i(t) * round) / round
                    ) + config.postfix;
                };
            })
            .attr("fill-opacity", 1)
            .attr("y", 0)
            .attr("class", function(d) {
                return "value";
            })
            .attr("x", d => {
                return xScale(xValue(d)) + 10;
            })
            .attr("y", 32)
            .attr("font-size", config.player_rank_point_size + 'pt');



        var barUpdate = bar
            .transition("2")
            .duration(2990 * interval_time)
            .ease(d3.easeLinear);

        barUpdate
            .select("rect")
            .style("fill", function(d) {
                name = d.name.replace(/\s/g, '');
                return colorByNames[name]
            }) //1. colorScale(d.name)
            .attr("width", d => xScale(xValue(d)));
        if (config.showLabel == true) {
            barUpdate
                .select(".label")
                .attr("class", function(d) {
                    return "label ";
                })
                .style("fill", function(d) {
                    name = d.name.replace(/\s/g, '');
                    return colorByNames[name]
                }) //1. colorScale(d.name)
                .attr("width", d => xScale(xValue(d)));
        }

        barUpdate
            .select(".value")
            .attr("class", function(d) {
                return "value";
            })
            .attr("width", d => xScale(xValue(d)));

        barUpdate
            .select(".value")
            .tween("text", function(d) {
                var self = this;

                // if postfix is blank, do not slice.
                if (config.postfix == "") {
                    var i = d3.interpolate(parseFloat(self.textContent.replace(/,/g, '')), Number(d.value));
                } else {                                       
                    var i = d3.interpolate(self.textContent.substring(0, self.textContent.indexOf(config.postfix)), Number(d.value));
                }


                var prec = (Number(d.value) + "").split("."),
                    round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                return function(t) {
                    self.textContent = d3.format(format)(
                        Math.round(i(t) * round) / round
                    ) + config.postfix;
                };
            })
            .duration(2990 * interval_time)
            .attr("x", d => xScale(xValue(d)) + 10);


        avg =
            (Number(currentData[0]["value"]) +
                Number(currentData[currentData.length - 1]["value"])) /
            2;

        var barExit = bar
            .exit()
            .attr("fill-opacity", 1)
            .transition()
            .duration(2500 * interval_time);
        barExit
            .attr("transform", function(d) {
                if (Number(d.value) > avg && allow_up) {
                    return "translate(0," + "-100" + ")";
                }
                return "translate(0," + "2000" + ")";
            })
            .remove()
            .attr("fill-opacity", 0);
        barExit
            .select("rect")
            .attr("fill-opacity", 0)
            .attr("width", xScale(currentData[currentData.length - 1]["value"]));

        barExit
            .select(".value")
            .attr("fill-opacity", 0)
            .attr("x", () => {
                return xScale(currentData[currentData.length - 1]["value"]);
            });

        barExit.select(".label").attr("fill-opacity", 0);

        firstTime = false;
    }

    function change() {
        yScale
            .domain(currentData.map(d => d.name).reverse())
            .range([innerHeight, 0]);

        g.selectAll(".bar")
            .data(currentData, function(d) {
                return d.name;
            })
            .transition("1")
            .duration(baseTime * update_rate * interval_time)
            .attr("transform", function(d) {
                return "translate(0," + yScale(yValue(d)) + ")";
            });
    }

    var i = 0;
    var p = config.wait;
    var update_rate = config.update_rate;
    var inter = setInterval(function next() {        
        while (p) {
            p -= 1;
            return;
        }
        currentdate = time[i];
        getCurrentData(time[i]);
        i++;

        if (i >= time.length) {
            window.clearInterval(inter);
        }
    }, baseTime * interval_time + config.pauseDuration);
}

//get random color 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}