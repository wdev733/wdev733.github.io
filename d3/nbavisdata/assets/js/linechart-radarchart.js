   
var allplayers = [];
var playersTeamsArr = [];
var careerPL = [];

var teammap = {"BUF": "Buffalo Braves", "IND": "Indiana Pacers",
"LAL": "Los Angeles Lakers", "UTA": "Utah Jazz", "DET": "Detroit Pistons",
"DAL": "Dallas Mavericks", "MIL": "Milwaukee Bucks", "DEN": "Denver Nuggets", "DEV": "Denver Nuggets",
"PHI": "Philadelphia 76ers", "MEM": "Memphis Grizzlies", "GSW": "Golden State Warriors",
"WAS": "Washington Wizards", "CLE": "Cleveland Cavaliers", "LAC": "Los Angeles Clippers",
"NYK": "New York Knicks", "BOS": "Boston Celtics", "NJN": "New Jersey Nets",
"MLH": "Milwaukee Hawks", "STL": "St. Louis Hawks", "TOT": "Multiple teams",
"PHO": "Phoenix Suns", "HOU": "Houston Rockets", "POR": "Portland Trail Blazers",
"SEA": "Seattle SuperSonics", "SAS": "San Antonio Spurs", "CHH": "Charlotte Hornets",
"ATL": "Atlanta Hawks", "ORL": "Orlando Magic", "MIA": "Miami Heat", "CHI": "Chicago Bulls",
"KCK": "Kansas City Kings", "SAC": "Sacramento Kings", "MNL": "Minneapolis Lakers",
"SDR": "San Diego Rockets", "BAL": "Baltimore Bullets", "CAP": "Capital Bullets",
"WSB": "Washington Bullets", "TOR": "Toronto Raptors", "SYR": "Syracuse Nationals",
"BRK": "Brooklyn Nets", "MIN": "Minnesota Timberwolves", "CIN": "Cincinnati Royals",
"SDC": "San Diego Clippers", "CHP": "Chicago Packers", "CHZ": "Chicago Zephyrs",
"NOJ": "New Orleans Jazz", "PHW": "Philadelphia Warriors", "OKC": "Oklahoma City Thunder",
"NOK": "New Orleans Hornets", "NOH": "New Orleans Hornets", "SFW": "San Francisco Warriors"};

function alreadyExists(name) {
  for(t = 0 ; t < allplayers.length ; t++) {
    if(allplayers[t].name == name) {
      return t;
    }
  }
  return -1;
}

function getBestPlayers() {
  var bestplayers = [];
    console.log(allplayers)
  for(r = 0 ; r < allplayers.length ; r++) {
    seasons_arr = allplayers[r].seasons;
    var total_points = 0;
    for(e = 0 ; e < seasons_arr.length ; e++) {
      total_points += seasons_arr[e].points;
    }
    if(total_points > 10000) {
      bestplayers.push(allplayers[r]);
    }
   
  }
  return bestplayers;

}

    
function formatName1(name) {
  for(r = 0 ; r < allplayers.length ; r++){
      if(allplayers[r].name == name){
          return allplayers[r].Image;
      }
  }
}

function yearAdded(index, year) {
  for(s = 0 ; s < allplayers[index].seasons.length ; s++) {
    if(allplayers[index].seasons[s].year == year) {
      return s;
    }
  }
  return -1;
}

function getIndex(player, bestplayers) {
  for(g = 0 ; g < bestplayers.length ; g++) {
    if(bestplayers[g].name.replace("*", "") == player) {
      return g;
    }
  }
}

function yearExists(year) {
  for(r = 0 ; r < playersTeamsArr.length ; r++) {
    if(playersTeamsArr[r].playoffYear == year) {  
      return r;
    }
  }
  return -1;
}

function setSeasons(bestplayers) {
  for(p = 0 ; p < bestplayers.length ; p++) {
    for(y = 0 ; y < bestplayers[p].seasons.length ; y++) {
      var numberteams = bestplayers[p].seasons[y].team.length;
      if(numberteams == 1) {
        var teamName = getTeamName(bestplayers[p].seasons[y].team[0]);
      } else {
        var teamName = getTeamName(bestplayers[p].seasons[y].team[numberteams - 1]);
      }
      var year = bestplayers[p].seasons[y].year;
      var playoffsResult = checkPER(teamName, year);
      bestplayers[p].seasons[y].playoffs = playoffsResult;
    }
  }
}

function checkPER(team, year) {
  var index = yearExists(year);
  if(index != -1) {
    resultsArray = playersTeamsArr[index].results;
    for(s = resultsArray.length - 1 ; s >= 0 ; s--) {
      if(resultsArray[s].winner.startsWith(team) && resultsArray[s].series == "Finals") {
        return ["Champion", resultsArray[s].winner, resultsArray[s].loser, resultsArray[s].gW, resultsArray[s].gL];
      }
      if(resultsArray[s].loser.startsWith(team) && resultsArray[s].series == "Finals") {
        return ["Finals", resultsArray[s].winner, resultsArray[s].loser, resultsArray[s].gW, resultsArray[s].gL];
      }
      if(resultsArray[s].loser.startsWith(team) && resultsArray[s].series != "Finals") {
        return [resultsArray[s].series, resultsArray[s].winner, resultsArray[s].loser, resultsArray[s].gW, resultsArray[s].gL];
      }
    }
  }
  return ["No Playoffs"];
}

function getTeamName(team) {
  return teammap[team];
}

function getCareerPL(playerName) {
  for(s = 0 ; s < careerPL.length ; s++) {
    if(careerPL[s].name == playerName) {
      return careerPL[s].pl;
    }
  }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function setAverages(bestplayers) {
  for(e = 0 ; e < bestplayers.length ; e++) {

    var averagePoints = 0;
    var averageAssists = 0;
    var averageRebounds = 0;
    var averageSteals = 0;
    var averageBlocks = 0;
    var averagePL = 0;
    var averageFG = 0;
    var averageFGA = 0;
    var averageFT = 0;
    var averageFTA = 0;
    var averageT = 0;
    var averageTA = 0;

    var games = 0;

    for(q = 0 ; q < bestplayers[e].seasons.length ; q++) {
      games += bestplayers[e].seasons[q].games;
      averagePoints += bestplayers[e].seasons[q].points;
      averageAssists += bestplayers[e].seasons[q].assists;
      averageRebounds += bestplayers[e].seasons[q].rebounds;
      averageSteals += bestplayers[e].seasons[q].steals;
      averageBlocks += bestplayers[e].seasons[q].blocks;
      averageFG += bestplayers[e].seasons[q].fieldgoals;
      averageFGA += bestplayers[e].seasons[q].fieldgoalsAttempted;
      averageFT += bestplayers[e].seasons[q].freethrows;
      averageFTA += bestplayers[e].seasons[q].freethrowsAttempted;
      averageT += bestplayers[e].seasons[q].threepointers;
      averageTA += bestplayers[e].seasons[q].threepointersAttempted;
    }

    averagePoints = averagePoints/games;
    averageAssists = averageAssists/games;
    averageRebounds = averageRebounds/games;
    averageSteals = averageSteals/games;
    averageBlocks = averageBlocks/games;

    averageFG = averageFG/averageFGA;
    averageFT = averageFT/averageFTA;
    averageT = averageT/averageTA;

    bestplayers[e].averages[0] = averagePoints;
    bestplayers[e].averages[1] = averageAssists;
    bestplayers[e].averages[2] = averageRebounds;
    bestplayers[e].averages[3] = averageSteals;
    bestplayers[e].averages[4] = averageBlocks;
    bestplayers[e].averages[5] = getCareerPL(bestplayers[e].name);
    bestplayers[e].averages[6] = averageFG;
    bestplayers[e].averages[7] = averageFT;
    bestplayers[e].averages[8] = averageT;

  }
}

var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var image_svg = d3.select("#player_selector").append('svg').attr('width',520).attr('height',330);

var svg = d3.select("#linechartContainer").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", 300)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + 120 + ")");

var gauges_svg = d3.select("#gaugeContainer").append('svg').attr('width',720).attr('height',300);

d3.csv("assets/data/datanba.csv", function(data) {
  data.forEach(function(d) {
    var name = d.Name;
    var Image = d.pic;
    var index = alreadyExists(name);
    if(index == -1) {
      var season = {year: +d.Season, points: +d.PTS, assists: +d.AST,
        rebounds: +d.TRB, steals: +d.STL, blocks: +d.BLK, pointspergames: +d.PPG,
        plusminus: +d.BPM, games: +d.G, position: d.Pos, team: [d.Tm],
        age: +d.Age, minutes: +d.MP, threepointers: +d.threeP,
        fieldgoalpercent: +d.FGPERC, threepointerpercent: +d.THREEPPERC,
        freethrowpercent: +d.FTPERC, playoffs: null, fieldgoals: +d.FG,
        fieldgoalsAttempted: +d.FGA,
        threepointersAttempted: +d.threePA, freethrows: +d.FT,
        freethrowsAttempted: +d.FTA, pointPerGame: +d.PPG, Salary: +d.salary, PER: +d.PER};

      var player = {name: d.Name,Image: d.pic, seasons: [], averages: []};
      player.seasons.push(season);
      allplayers.push(player);

    } else {
      var yearIndex = yearAdded(index, +d.Season);

      if(yearIndex == -1) {
        var season = {year: +d.Season, points: +d.PTS, assists: +d.AST,
          rebounds: +d.TRB, steals: +d.STL, blocks: +d.BLK,
          plusminus: +d.BPM, games: +d.G, position: d.Pos, team: [d.Tm],
          age: +d.Age, minutes: +d.MP,
          fieldgoalpercent: +d.FGPERC, threepointerpercent: +d.THREEPPERC,
          freethrowpercent: +d.FTPERC, playoffs: null, fieldgoals: +d.FG,
          fieldgoalsAttempted: +d.FGA, threepointers: +d.threeP,
          threepointersAttempted: +d.threePA, freethrows: +d.FT,
          freethrowsAttempted: +d.FTA, pointPerGame: +d.PPG, Salary: +d.salary, PER: +d.PER};

          allplayers[index].seasons.push(season);

      } else {
        allplayers[index].seasons[yearIndex].team.push(d.Tm);
      }
    }
  });

  bestplayers = getBestPlayers();
  setSeasons(bestplayers);
  setAverages(bestplayers);

  bestplayers.sort(function(a,b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  
  var select1 = d3.select('#player_selector')
    .append('select')
    .attr('class','select')
    .attr('id', 'one')
    .on('change',onchange1)

  var options1 = select1
    .selectAll('option')
    .data(bestplayers).enter()
    .append('option')
    .text(function (d, i) { return d.name.replace("*", ""); })

  var select2 = d3.select('#player_selector')
    .append('select')
    .attr('class','select')
    .attr('id', 'two')
    .on('change',onchange2);

  var options2 = select2
    .selectAll('option')
    .data(bestplayers).enter()
    .append('option')
    .text(function (d) { return d.name.replace("*", ""); })

  var selection1 = document.getElementById('one');
  var index1 = getIndex("LeBron James", bestplayers);
  selection1.selectedIndex = index1;

  var selection2 = document.getElementById('two');
  var index2 = getIndex("Stephen Curry", bestplayers);
  selection2.selectedIndex = index2;

  //Player Selector Widget
  var legend_g = image_svg.append('g').attr('transform','translate(20,180)').attr('class','legend_g');
  legend_g.append('text').attr('x',0).attr('y',0).text('Legend:');
  legend_g.append('line').attr('x1',0).attr('y1',40).attr('x2',30).attr('y2',40).attr("stroke-width", 5).attr("stroke", "royalblue");
  legend_g.append('line').attr('x1',0).attr('y1',70).attr('x2',30).attr('y2',70).attr("stroke-width",5).attr('stroke','crimson');

  legend_g.append('text').attr('id','leg_one').attr('x',35).attr('y',45).text(d3.select('select#one').property('value'));
  legend_g.append('text').attr('id','leg_two').attr('x',35).attr('y',75).text(d3.select('select#two').property('value'));
  image_svg
    .append("image")
    .attr("xlink:href", formatName1(d3.select('select#one').property('value')))
    .attr("class", "pico")
    .attr("id", "pic_one")
    .attr("height", 215)
    .attr("width", 158.33)
    .attr("x", 215)
    .attr("y", 0);

  image_svg.append('text').attr('id','one_txt').attr('x',300).attr('y',250).attr('text-anchor','middle').text(d3.select('select#one').property('value'));
  image_svg.append('text').attr('id','sec_txt').attr('x',450).attr('y',250).attr('text-anchor','middle').text(d3.select('select#two').property('value'));
  image_svg
    .append("image")
    .attr("xlink:href", formatName1(d3.select('select#two').property('value')))
    .attr("class", "pico")
    .attr("id", "pic_two")
    .attr("height", 215)
    .attr("width", 158.33)
    .attr("x", 380)
    .attr("y", 0);

  var index3 = getIndex(d3.select('select#one').property('value'), bestplayers);
  var index4 = getIndex(d3.select('select#two').property('value'), bestplayers);

  function getMinPL(seasonArr1, seasonArr2) {
    var min = 0;
    for(t = 0 ; t < seasonArr1.length ; t++) {
      var plusminus = seasonArr1[t].plusminus;
      if(plusminus < min) {
        min = plusminus;
      }
    }
    for(w = 0 ; w < seasonArr2.length ; w++) {
      var plusminus = seasonArr2[w].plusminus;
      if(plusminus < min) {
        min = plusminus;
      }
    }
    return min;
  }

  function getMax(which, seasonArr1, seasonArr2) {
    var max = 0;
    for(q = 0 ; q < seasonArr1.length ; q++) {
      var games = seasonArr1[q].games;
      if(which == 0) {
        var ppg = seasonArr1[q].pointPerGame;
        if(ppg > max) {
          max = ppg;
        }
      }
      if(which == 1) {
        var apg = seasonArr1[q].assists/games;
        if(apg > max) {
          max = apg;
        }
      }
      if(which == 2) {
        var rpg = seasonArr1[q].rebounds/games;
        if(rpg > max) {
          max = rpg;
        }
      }
      if(which == 3) {
        var bpg = seasonArr1[q].blocks/games;
        if(bpg > max) {
          max = bpg;
        }
      }
      if(which == 4) {
        var spg = seasonArr1[q].steals/games;
        if(spg > max) {
          max = spg;
        }
      }
      if(which == 5) {
        var plusminus = seasonArr1[q].plusminus;
        if(plusminus > max) {
          max = plusminus;
        }
      }
    }
    for(e = 0 ; e < seasonArr2.length ; e++) {
      var games = seasonArr2[e].games;
      if(which == 0) {
        var ppg = seasonArr2[e].pointPerGame;
        if(ppg > max) {
          max = ppg;
        }
      }
      if(which == 1) {
        var apg = seasonArr2[e].assists/games;
        if(apg > max) {
          max = apg;
        }
      }
      if(which == 2) {
        var rpg = seasonArr2[e].rebounds/games;
        if(rpg > max) {
          max = rpg;
        }
      }
      if(which == 3) {
        var bpg = seasonArr2[e].blocks/games;
        if(bpg > max) {
          max = bpg;
        }
      }
      if(which == 4) {
        var spg = seasonArr2[e].steals/games;
        if(spg > max) {
          max = spg;
        }
      }
      if(which == 5) {
        var plusminus = seasonArr2[e].plusminus;
        if(plusminus > max) {
          max = plusminus;
        }
      }
    }
    return max;
  }

  var maxPPG = getMax(0, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var maxAPG = getMax(1, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var maxRPG = getMax(2, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var maxBPG = getMax(3, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var maxSPG = getMax(4, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var maxPL = getMax(5, bestplayers[index3].seasons, bestplayers[index4].seasons);
  var minPL = getMinPL(bestplayers[index3].seasons, bestplayers[index4].seasons);

  function getPPGScale(maxPPG) {
    var ppgScale = d3.scaleLinear().domain([0,maxPPG + 5]).range([530,260]);
    return ppgScale;
  }

  function getAPGScale(maxAPG) {
    var apgScale = d3.scaleLinear().domain([0,maxAPG + 5]).range([530,260]);
    return apgScale;
  }

  function getRPGScale(maxRPG) {
    var rpgScale = d3.scaleLinear().domain([0,maxRPG + 5]).range([530,260]);
    return rpgScale;
  }

  function getBPGScale(maxBPG) {
    var bpgScale = d3.scaleLinear().domain([0,maxBPG]).range([530,260]);
    return bpgScale;
  }

  function getSPGScale(maxSPG) {
    var spgScale = d3.scaleLinear().domain([0,maxSPG]).range([530,260]);
    return spgScale;
  }

  function getPlusMinusScale(maxPL, minPL) {
    var plusminusScale = d3.scaleLinear().domain([minPL,maxPL]).range([530,260]);
    return plusminusScale;
  }

  function getOpacityScale(numberseasons) {
    var opacityScale = d3.scaleLinear().domain([0, numberseasons]).range([0.5, 1]);
    return opacityScale;
  }

  function getCircleScale(stat1, stat2) {
    if(stat1 > stat2) {
      var circleScale = d3.scaleLinear().domain([0, stat1]).range([35, 55]);
    } else {
      var circleScale = d3.scaleLinear().domain([0, stat2]).range([35, 55]);
    }
    return circleScale;
  }
 
  ppgScale = getPPGScale(maxPPG);
  apgScale = getAPGScale(maxAPG);
  rpgScale = getRPGScale(maxRPG);
  bpgScale = getBPGScale(maxBPG);
  spgScale = getSPGScale(maxSPG);
  plusminusScale = getPlusMinusScale(maxPL, minPL);
  opacityScale = getOpacityScale(bestplayers[index3].seasons.length);


  var PERLabels = ['40','35','30' ,'25', '20','15', '10', '5', '0'];

  var labelDef = {"PPG": "Points per game", "APG": "Assists per game", "RPG": "Rebounds per game", "BPG": "Blocks per game", "SPG": "Steals per game", "+/-": "Plus minus score"}

  var yearLabels = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6',
  'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13',
  'Yr 14', 'Yr 15', 'Yr 16', 'Yr 17', 'Yr 18', 'Yr 19', 'Yr 20',
  'Yr 21', 'Yr 22', 'Yr 23', 'Yr 24', 'Yr 25'];

  gauges_svg.append("text")
      .attr("transform",
          "translate(110, 50)")
      .style("text-anchor", "middle")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "18px")
      .text("Field-Goal Percentage")
      .attr("fill", "black");

  gauges_svg.append("text")
      .attr("transform",
          "translate(350, 50)")
      .style("text-anchor", "middle")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "18px")
      .text("Free-Throw Percentage")
      .attr("fill", "black");

  gauges_svg.append("text")
      .attr("transform",
          "translate(600, 50)")
      .style("text-anchor", "middle")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "18px")
      .text("Three-Point Percentage")
      .attr("fill", "black");

  xScale3 = setupOverview(index3, index4);

  function setupOverview(index1, index2) {
      if(bestplayers[index2].seasons.length > bestplayers[index1].seasons.length) {
        var slicedArr = yearLabels.slice(0, bestplayers[index2].seasons.length);

        var xScale2 = d3.scaleBand()
          .domain(slicedArr)
          .range([0, (width)]);

        var xScale3 = d3.scaleLinear()
          .domain([0, slicedArr.length])
          .range([0, (width)]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("id", "overview")
        .attr("transform", "translate(20, 140)")
        .call(d3.axisBottom(xScale2));

      } else {
        var slicedArr = yearLabels.slice(0, bestplayers[index1].seasons.length);

        var xScale2 = d3.scaleBand()
          .domain(slicedArr)
          .range([0, (width)]);

        var xScale3 = d3.scaleLinear()
          .domain([0, slicedArr.length])
          .range([0, (width)]);

        svg.append("g")
        .attr("class", "x axis")
        .attr("id", "overview")
        .attr("transform", "translate(22, 140)")
        .call(d3.axisBottom(xScale2));
      }

      return xScale3;
  }

  var yScalePlayoffs = d3.scaleLinear()
    .domain(PERLabels)
    .range([0,30,60,90,120,150,180,210,240]);
   

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(22, -100)")
    .call(d3.axisLeft(yScalePlayoffs));

  createOverview(index3, "RoyalBlue", "one", xScale3, index4);
  createOverview(index4, "crimson", "two", xScale3, index3);

  function getPlayerName(id) {
    if(id.includes("one")) {
      var playerNameInd = getIndex(d3.select('select#one').property('value'), bestplayers);
      var playerName = bestplayers[playerNameInd].name.replace("*", "");
    } else {
      var playerNameInd = getIndex(d3.select('select#two').property('value'), bestplayers);
      var playerName = bestplayers[playerNameInd].name.replace("*", "");
    }
    return playerName;
  }

  function getDivInfo(seasonObject, id) {
    var playerName = getPlayerName(id);
    var index = seasonObject.team.length;
    var info = "<font color='white' size='2.75'>" + "Player: " + playerName + "<br/>";
    info += "Team: " + teammap[seasonObject.team[index - 1]] + "<br/>";
    info += "Player Age: " + seasonObject.age + "<br/>";
    info += "PER: " + seasonObject.PER + "<br/>";
   
    return info;
  }

  function getAveragePercentage(id, index) {
    var playerName = bestplayers[index].name.replace("*", "");
    if(id.includes("0")) {
      var stat = round(bestplayers[index].averages[6], 3) * 100;
      var statName = "Career Field-Goal %: ";
    }
    if(id.includes("1")) {
      var stat = round(bestplayers[index].averages[7], 3) * 100;
      var statName = "Career Free-Throw %: ";
    }
    if(id.includes("2")) {
      var stat = round(bestplayers[index].averages[8], 3) * 100;
      var statName = "Career Three-Point %: ";
    }
    var info = "<font color='white' size='3'>" + "Player: " + playerName + "</font>" + "<br/>";
    info += "<font color='white' size='3'> " + statName + "</font> "+ "<font color='white' size='7.5'>" + stat.toFixed(1) + "%<br/>" + "</font>";
    return info;
  }

  function getIndividualDivInfo(id, index) {
    div.style("width");
    var playerName = bestplayers[index].name.replace("*", "");
    if(id.includes("0") || id.includes("1")) {
      var stat = round(bestplayers[index].averages[0], 2);
      var statName = "Career Points Per Game: ";
    }
    if(id.includes("2") || id.includes("3")) {
      var stat = round(bestplayers[index].averages[1], 2);
      var statName = "Career Assists Per Game: ";
    }
    if(id.includes("4") || id.includes("5")) {
      var stat = round(bestplayers[index].averages[2], 2);
      var statName = "Career Rebounds Per G: ";
    }
    if(id.includes("6") || id.includes("7")) {
      var stat = round(bestplayers[index].averages[3], 2);
      var statName = "Career Steals Per Game: ";
    }
    if(id.includes("8") || id.includes("9")) {
      var stat = round(bestplayers[index].averages[4], 2);
      var statName = "Career Blocks Per Game: ";
    }
    if(id.includes("10") || id.includes("11")) {
      var stat = round(bestplayers[index].averages[5], 2);
      var statName = "Career Plus/Minus Score: ";
    }
    var info = "<font color='white' size='3'>" + "Player: " + playerName + "</font>" + "<br/>";
    info += "<font color='white' size='3'> " + statName + "</font> "+ "<font color='white' size='7.5'>" + stat + "<br/>" + "</font>";
    return info;
  }

  function getPixels(id) {
    if(id.includes("one")) {
      return (d3.event.pageX - 100) + "px";  
    } else {
      return (d3.event.pageX - 100) + "px";
    }
  }

  function getColor(id) {
    if(id.includes("one")) {
      return "RoyalBlue";
    } else {
      return "crimson";
    }
  }

  function setupIndividual() {

    drawDivider(750, 250, 1270, 250, "black", 1, 1);
    drawDivider(935, 250, 935, 380, "black", 1, 1);
    drawDivider(1105, 250, 1105, 380, "black", 1, 1);
    drawDivider(750, 270, 1270, 270, "black", 1, 1);
    drawDivider(750, 315, 1270, 315, "black", 1, 1);
    drawDivider(750, 335, 1270, 335, "black", 1, 1);
    drawDivider(750, 380, 1270, 380, "black", 1, 1);
    drawDivider(750, 250, 750, 380, "black", 1, 1);
    drawDivider(1270, 250, 1270, 380, "black", 1, 1);

    svg.append("text")
      .attr("transform",
          "translate(765, 265)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "13px")
      .style("font-style", "italic")
      .text("Points Per Game (PPG)")
      .attr("fill", "black");

    svg.append("text")
      .attr("transform",
          "translate(765, 330)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "13px")
      .style("font-style", "italic")
      .text("Steals Per Game (SPG)")
      .attr("fill", "black");

    svg.append("text")
      .attr("transform",
          "translate(945, 265)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "13px")
      .style("font-style", "italic")
      .text("Assists Per Game (APG)")
      .attr("fill", "black");

    svg.append("text")
      .attr("transform",
          "translate(945, 330)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "13px")
      .style("font-style", "italic")
      .text("Blocks Per Game (BPG)")
      .attr("fill", "black");

    svg.append("text")
      .attr("transform",
          "translate(1110, 265)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "11.5px")
      .style("font-style", "italic")
      .text("Rebounds Per Game (RPG)")
      .attr("fill", "black");

    svg.append("text")
      .attr("transform",
          "translate(1120, 330)")
      .style("text-anchor", "start")
      .style("font-family", "Helvetica, Arial, Sans-Serif")
      .style("font-size", "13px")
      .text("+/- Score for Season")
      .style("font-style", "italic")
      .attr("fill", "black");
  }

    setRadar(index3, index4, 0);
    
    function setRadar(index1, index2, season){
    var season = parseInt(season, 10);
    var season1 = season;
    var season2 = season;
    
    if(bestplayers[index1].seasons.length < (season + 1)) {
      season1 = bestplayers[index1].seasons.length - 1;
    }
    if(bestplayers[index2].seasons.length < (season + 1)) {
      season2 = bestplayers[index2].seasons.length - 1;
    }

    var currSeason = parseInt(season, 10);
    currSeason = currSeason + 1.0;

    var games1 = bestplayers[index1].seasons[season1].games;
    var ppg1 = (bestplayers[index1].seasons[season1].pointPerGame).toFixed(2);
    var apg1 = (bestplayers[index1].seasons[season1].assists/games1).toFixed(2);
    var rpg1 = (bestplayers[index1].seasons[season1].rebounds/games1).toFixed(2);
    var bpg1 = (bestplayers[index1].seasons[season1].blocks/games1).toFixed(2);
    var spg1 = (bestplayers[index1].seasons[season1].steals/games1).toFixed(2);
    var pl1 = (bestplayers[index1].seasons[season1].plusminus).toFixed(2);

    var games2 = bestplayers[index2].seasons[season2].games;
    var ppg2 = (bestplayers[index2].seasons[season2].pointPerGame).toFixed(2);
    var apg2 = (bestplayers[index2].seasons[season2].assists/games2).toFixed(2);
    var rpg2 = (bestplayers[index2].seasons[season2].rebounds/games2).toFixed(2);
    var bpg2 = (bestplayers[index2].seasons[season2].blocks/games2).toFixed(2);
    var spg2 = (bestplayers[index2].seasons[season2].steals/games2).toFixed(2);
    var pl2 = (bestplayers[index2].seasons[season2].plusminus).toFixed(2);
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
				width = Math.min(427, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
    var data = [
                  [//Player 1
                    {axis:"Assists Per Game",value:apg1},
                    {axis:"Blocks Per Game",value:bpg1},
                    {axis:"Steals Per Game",value:spg1},
                    {axis:"Rebounds Per Game",value:rpg1},
                    {axis:"Points Per Game",value:ppg1}	
                  ],[//Player 2
                   {axis:"Assists Per Game",value:apg2},
                    {axis:"Blocks Per Game",value:bpg2},
                    {axis:"Steals Per Game",value:spg2},  
                    {axis:"Rebounds Per Game",value:rpg2},
                    {axis:"Points Per Game",value:ppg2}
                  ]
                ];
        var color = d3.scale.ordinal()
				.range(["royalblue","crimson"]);
        var radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
        RadarChart("#radarChart",data,radarChartOptions)
    }
    
  function RadarChart(id, data, options) {
	var cfg = {
	 w: 60,				
	 h: 60,				
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, 
	 levels: 3,				
	 maxValue: 0, 			
	 labelFactor: 1.25, 	
	 wrapWidth: 60, 		
	 opacityArea: 0.35, 	
	 dotRadius: 4, 			
	 opacityCircles: 0.1, 	
	 strokeWidth: 2, 		
	 roundStrokes: false,	
	 color: d3.scale.category10()	
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }
	}
	
	
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value*1;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(''),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);
		
      
	d3.select(id).select("svg").remove();
	
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
	
	
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return (maxValue * d/cfg.levels).toFixed(2); });

	
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);


	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
					
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
				
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1); 
        
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "grey")
		.style("fill-opacity", 0.8);

	
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(d.value)
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	

	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, 
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}
	
}

  function drawDivider(x1, y1, x2, y2, color, width, opacity) {
    gauges_svg.append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke-width", width)
      .attr("stroke", color)
      .style("opacity", opacity);
  }  

  function createOverview(index, color, which, xScale, otherIndex) {
    
    var line = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return getOverviewPos(d)});

    svg.append("path")
      .datum(bestplayers[index].seasons)
      .attr("id", which)
      .attr("class", "line")
      .attr("transform", "translate(40, -100)")
      .attr("d", line)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg.selectAll(".dot" + which)
      .data(bestplayers[index].seasons)
      .enter().append("circle")
      .attr("id", function(d, i) {
        return 'circle_' + which + '_' + i; })
      .attr("class", "dot")
      .attr("cx", function(d, i) { return xScale3(i); })
      .attr("cy", function(d) { return getOverviewPos(d); })
      .attr("transform", "translate(45, -100)")
      .attr("fill", color)
      .attr("r",7)
      .on("mouseover", function(d) {
        if(d.playoffs.length > 1) {
            div.transition()
                .duration(400)
                .style("height", "60px")
                .style("width", "200px")
                .style("opacity", .9);
            div.html(getDivInfo(d, this.id))
                .style("left", getPixels(this.id ))
                .style("top", (d3.event.pageY - 28) + "px")
                .style("background", getColor(this.id));
        } else {
            var index = d.team.length;
            var playerName = getPlayerName(this.id);
            var info = "<font color='white' size=2.75>" + "Player: " + playerName + "<br/>";
            info += "Team: " + teammap[d.team[index - 1]] + "<br/>";
            info += "Player Age: " + d.age + "<br/>";
            info += "PER: " + d.PER + "<br/>";           
            div.transition()
                .duration(400)                
                .style("width", "200px")
                .style("opacity", .9);
            div .html(info)
                .style("left", getPixels(this.id))
                .style("top", (d3.event.pageY - 28) + "px")
                .style("background", getColor(this.id));
            }
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(600)
                .style("opacity", 0);
        })
        .on("click", function(d) {
            removeText();
            for(w = 0 ; w < 12 ; w++) {
                d3.select('#individuals_' + w).remove();
            }
            for(r = 0 ; r < 3 ; r++) {
                d3.select('#individualTextRed_' + r).remove();
                d3.select('#individualTextBlue_' + r).remove();
                d3.select('#individualRed_' + r).remove();
                d3.select('#individualBlue_' + r).remove();
            }
            d3.select('#individualText').remove();
            var id = this.id.substr(this.id.length - 2).replace("_", "");
            if(which == "one") {
              setRadar(index, otherIndex, id);
              createPercentages(index, otherIndex, id);
            } else {
              setRadar(otherIndex, index, id);
              createPercentages(otherIndex, index, id);
            }
        });
    }

    function getOverviewPos(seasonObj) {
        var x =240;
        return 240 - seasonObj.PER*6;
      if(seasonObj.playoffs == "No Playoffs") {
        return 240;
      }
      if(seasonObj.playoffs[0].includes("First Round")) {
        return 200;
      }
      if(seasonObj.playoffs[0].includes("Semifinals")) {
        return 160;
      }
      if(seasonObj.playoffs[0].includes("Conf") && seasonObj.playoffs[0].includes("Finals")) {
        return 120;
      }
      if(seasonObj.playoffs[0].includes("Div") && seasonObj.playoffs[0].includes("Finals")) {
        return 120;
      }
      if(seasonObj.playoffs[0] == "Finals") {
        return 80;
      }
      if(seasonObj.playoffs[0] == "Champion") {
        return 40;
      }
    }

  createQuestionTip(0, 163, 100,"This graph shows PER over the player's seasonal experience. By clicking on a particular point in the graph, you can see data for that player in that season In the radar chart and in the clock display, after mouse hover on the clock display, the season's data can be compared to his career data"); 

  function createQuestionTip(x, y, height, textTip){
    svg.append("g")
        .append("circle")
          .attr("transform",
            "translate("+x+","+y+")")
          .attr("r", 8)
          .attr("fill", "black")
          .style("opacity", 0.7);

    svg.append("g")
        .append("circle")
          .attr("transform",
            "translate("+x+","+y+")")
          .attr("r", 6)
          .attr("fill", "DarkGrey")
          .style("opacity", 0.7);

    svg.append("text")
        .attr("transform",
            "translate("+(x-3.5)+","+(y+5)+")")
        .text("?")
        .style("font-size", 14)
        .style("fill", "white")
        .style("opacity", 0.7);

    svg.append("g")
        .append("circle")
          .attr("transform",
            "translate("+x+","+y+")")
          .attr("r", 7)
          .attr("fill", "DarkGrey")
          .style("opacity", 0)
          .on("mouseover", function(d)
          {
            div.transition()
                .duration(400)
                .style("opacity", .9)
                .style("background", "grey")                
                .style("width", "220px")
            div.html(textTip)
                .style("color", "white")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY-(height/2)) + "px")                
                .style("width", "200px")

          })
          .on("mouseout", function(d)
          {
            div.transition()
                .duration(400)
                .style("opacity", 0)                
                .style("width", "200px")
          })
  }

  createPercentages(index3, index4, 0);
    
    function setSpeed1(value,value2, which, offset, index1, index2){
        var domain = [0,100];

            var gg = viz.gg()
                .domain(domain)
                .outerRadius(55)
                .innerRadius(10)
                .value(value);
            gg.defs(svg);
        
             var gg1 = viz.gg()
                .domain(domain)
                .outerRadius(55)
                .innerRadius(10)
                .value(value2);
            gg.defs(svg);
        
        gauges_svg.append("g").call(gg)
            .attr("class", "x axis")
            .attr("transform",
                "translate(" + (offset) + ", 150)")
            .attr("id", "individualTextBlue_" + which)
            .on("mouseover", function(d) {
            div.transition()
                .duration(400)
                .style("opacity", .9)                
                .style("width", "200px")                
            div.html(getAveragePercentage(this.id, index1))
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 28) + "px") })
        .on("mouseout", function(d) {
            div.transition()
                .duration(600)
                .style("opacity", 0);
          
        });
         gauges_svg.append("text")
        .attr("transform",
          "translate(" + (offset -29)+ ", 235)")
        .attr("id", "individualTextBlue_" + which)
        .style("text-anchor", "left")
        .style("font-size", "24px")
        .style("fill","RoyalBlue")
        .text(value + "%");
        
        
        gauges_svg.append("g").call(gg1)
            .attr("class", "x axis")
            .attr("transform",
                "translate(" + (offset+115) + ", 150)")
            .attr("id", "individualTextRed_" + which)
            .on("mouseover", function(d) {
            div.transition()
                .duration(400)
                .style("opacity", .9)                
                .style("width", "200px")                
            div.html(getAveragePercentage(this.id, index2))
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 28) + "px") })
        .on("mouseout", function(d) {
            div.transition()
                .duration(600)
                .style("opacity", 0);
      });
        
       gauges_svg.append("text")
        .attr("transform",
          "translate(" + (offset +90)+ ",235)")
        .attr("id", "individualTextRed_" + which)
        .style("text-anchor", "left")
        .style("font-size", "24px")
        .style("fill","crimson")
        .text(value2 + "%");
  }  
    
  function createPercentages(index1, index2, season) {
    var season = parseInt(season, 10);
    var season1 = season;
    var season2 = season;

    if(bestplayers[index1].seasons.length < (season + 1)) {
      season1 = bestplayers[index1].seasons.length - 1;
    }
    if(bestplayers[index2].seasons.length < (season + 1)) {
      season2 = bestplayers[index2].seasons.length - 1;
    }

    var fg1 = round(bestplayers[index1].seasons[season1].fieldgoalpercent * 100, 2);
    var fg2 = round(bestplayers[index2].seasons[season2].fieldgoalpercent * 100, 2);
    var three1 = round(bestplayers[index1].seasons[season1].threepointerpercent * 100, 2);
    var three2 = round(bestplayers[index2].seasons[season2].threepointerpercent * 100, 2);
    var ft1 = round(bestplayers[index1].seasons[season1].freethrowpercent * 100, 2);
    var ft2 = round(bestplayers[index2].seasons[season2].freethrowpercent * 100, 2);
    removeText();
    setSpeed1(fg1,fg2,0,60, index1, index2);
    setSpeed1(ft1, ft2, 1, 295, index1, index2);
    setSpeed1(three1, three2, 2, 540, index1, index2);
    drawDivider(235, 85, 235, 245, "DarkGrey", 2, 0.3);
    drawDivider(475, 85, 475, 245, "DarkGrey", 2, 0.3);
  }

  function removeText(){
    d3.select('text#individualTextBlue_0').remove();
    d3.select('text#individualTextBlue_1').remove();
    d3.select('text#individualTextBlue_2').remove();
    d3.select('text#individualTextRed_0').remove();
    d3.select('text#individualTextRed_1').remove();
    d3.select('text#individualTextRed_2').remove();
      
  }
    
  function onchange1() {
    removeText();
    selectValue = d3.select('select#one').property('value');
    selectValueOther = d3.select('select#two').property('value');
    d3.select('image#pic_one').attr("xlink:href", formatName1(selectValue));
    d3.select('text#text_one').text(selectValue);
    d3.select('text#legendone').text(selectValue);
    d3.select('text#individualTextBlue_0').text(" ");
    d3.select('text#individualTextBlue_1').text(" ");
    d3.select('text#individualTextBlue_2').text(" ");
    d3.select('text#individualTextRed_0').text(" ");
    d3.select('text#individualTextRed_1').text(" ");
    d3.select('text#individualTextRed_2').text(" ");
    
    d3.selectAll('.dimple-legend-text').style('font-weight','normal');

    var name = selectValue;
    name = name.replace(/\s+/g, '-').toLowerCase();
    name = '.dimple-'+name;
    d3.selectAll(name).style('font-weight','bold');
    
    d3.select('text#one_txt').text(selectValue);    
    d3.select('text#leg_one').text(selectValue);    
    for(a = 0 ; a < 600 ; a++) {
      for(r = 0 ; r < 20 ; r++) {
        d3.select('#line' + a + "_" + r + "one").remove();
      }
    }

    for(a = 0 ; a < 600 ; a++) {
      for(r = 0 ; r < 20 ; r++) {
        d3.select('#line' + a + "_" + r + "two").remove();
      }
    }

    d3.select('#yone').remove();
    d3.select('#ytwo').remove();
    d3.select('#ythree').remove();
    d3.select('#yfour').remove();
    d3.select('#yfive').remove();
    d3.select('#ysix').remove();

    for(k = 0 ; k < 25 ; k++) {
      d3.select('#circle_' + 'one' + '_' + k).remove();
      d3.select('#circle_' + 'two' + '_' + k).remove();
    }

    d3.select('path#' + 'one').remove();
    d3.select('path#' + 'two').remove();
    d3.select('#overview').remove();

    for(w = 0 ; w < 12 ; w++) {
      d3.select('#individuals_' + w).remove();
    }

    d3.select('#individualText').remove();
    for(r = 0 ; r < 3 ; r++) {
      d3.select('#individualTextRed_' + r).remove();
      d3.select('#individualTextBlue_' + r).remove();
      d3.select('#individualRed_' + r).remove();
      d3.select('#individualBlue_' + r).remove();
    }

    var index1 = getIndex(selectValue, bestplayers);
    var index2 = getIndex(selectValueOther, bestplayers);
    var maxPPG = getMax(0, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxAPG = getMax(1, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxRPG = getMax(2, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxBPG = getMax(3, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxSPG = getMax(4, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxPL = getMax(5, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var minPL = getMinPL(bestplayers[index1].seasons, bestplayers[index2].seasons);

    ppgScale = getPPGScale(maxPPG);
    apgScale = getAPGScale(maxAPG);
    rpgScale = getRPGScale(maxRPG);
    bpgScale = getBPGScale(maxBPG);
    spgScale = getSPGScale(maxSPG);
    plusminusScale = getPlusMinusScale(maxPL, minPL);
    opacityScale = getOpacityScale(bestplayers[index1].seasons.length);  

    xScale3 = setupOverview(index1, index2);
    createOverview(index1, "RoyalBlue", "one", xScale3, index2);
    createOverview(index2, "crimson", "two", xScale3, index1);

    setRadar(index1, index2, 0);
    createPercentages(index1, index2, 0);
  };

  function onchange2() {
    removeText();
    selectValue = d3.select('select#two').property('value')
    selectValueOther = d3.select('select#one').property('value');
    d3.select('image#pic_two').attr("xlink:href", formatName1(selectValue) + " ");
    d3.select('text#text_two').text(selectValue);
    d3.select('text#legendtwo').text(selectValue);

    d3.selectAll('.dimple-legend-text').style('font-weight','normal');
    var name = selectValue;
    name = name.replace(/\s+/g, '-').toLowerCase();
    name = '.dimple-'+name;
    d3.selectAll(name).style('font-weight','bold');

    d3.select('text#sec_txt').text(selectValue);
    d3.select('text#leg_two').text(selectValue);
    for(a = 0 ; a < 600 ; a++) {
      for(r = 0 ; r < 20 ; r++) {
        d3.select('#line' + a + "_" + r + "one").remove();
        d3.select('#circle_' + 'one' + '_' + r)
      }
    }

    for(a = 0 ; a < 600 ; a++) {
      for(r = 0 ; r < 20 ; r++) {
        d3.select('#line' + a + "_" + r + "two").remove();
      }
    }

    d3.select('#yone').remove();
    d3.select('#ytwo').remove();
    d3.select('#ythree').remove();
    d3.select('#yfour').remove();
    d3.select('#yfive').remove();
    d3.select('#ysix').remove();

    for(k = 0 ; k < 25 ; k++) {
      d3.select('#circle_' + 'one' + '_' + k).remove();
      d3.select('#circle_' + 'two' + '_' + k).remove();
    }

    d3.select('path#' + 'one').remove();
    d3.select('path#' + 'two').remove();
    d3.select('#overview').remove();

    for(w = 0 ; w < 12 ; w++) {
      d3.select('#individuals_' + w).remove();
    }

    d3.select('#individualText').remove();
    for(r = 0 ; r < 3 ; r++) {
      d3.select('#individualTextRed_' + r).remove();
      d3.select('#individualTextBlue_' + r).remove();
      d3.select('#individualRed_' + r).remove();
      d3.select('#individualBlue_' + r).remove();
    }

    var index2 = getIndex(selectValue, bestplayers);
    var index1 = getIndex(selectValueOther, bestplayers);
    var maxPPG = getMax(0, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxAPG = getMax(1, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxRPG = getMax(2, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxBPG = getMax(3, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxSPG = getMax(4, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var maxPL = getMax(5, bestplayers[index1].seasons, bestplayers[index2].seasons);
    var minPL = getMinPL(bestplayers[index1].seasons, bestplayers[index2].seasons);

    ppgScale = getPPGScale(maxPPG);
    apgScale = getAPGScale(maxAPG);
    rpgScale = getRPGScale(maxRPG);
    bpgScale = getBPGScale(maxBPG);
    spgScale = getSPGScale(maxSPG);
    plusminusScale = getPlusMinusScale(maxPL, minPL);
    opacityScale = getOpacityScale(bestplayers[index1].seasons.length);
 
    xScale3 = setupOverview(index1, index2);
    createOverview(index1, "RoyalBlue", "one", xScale3, index2);
    createOverview(index2, "crimson", "two", xScale3, index1);  
    setRadar(index1, index2, 0);
    createPercentages(index1, index2, 0);
  };
});