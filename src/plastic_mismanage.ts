
// The svg
var svg2 = d3.select("#viz_plastic_mismanage"),
  width = +svg2.attr("width"),
  height = +svg2.attr("height");

// Define the div for the tooltip
var div2 = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// Map and projection
var path2 = d3.geoPath();
var projection2 = d3.geoEckert3()
  .scale(175)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data2 = d3.map();
var colorScale2 = d3.scaleThreshold()
  .domain([0, 1, 2.5, 5, 10, 20, 40, 80])
  .range(d3.schemeReds[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/aryanm1999/data-vis-data/main/mismanage.csv", function(d) { data2.set(d.code, +d.pop); })
  .await(ready2);

function ready2(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .3)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
    // div.transition()		
    //     .duration(200)		
    //     .style("opacity", .9);		
    // div.html(d.country + "<br/>"  + d.pop)	
    //     .style("left", (d3.event.pageX) + "px")		
    //     .style("top", (d3.event.pageY - 28) + "px");
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      // .style("stroke", "transparent")
    // div.transition()		
    //   .duration(500)		
    //   .style("opacity", 0);	
  }

  // Draw the map
  svg2.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection2)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data2.get(d.id) || 0;
        return colorScale2(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
}
