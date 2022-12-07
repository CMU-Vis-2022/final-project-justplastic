

// The svg
var svg1 = d3.select("#viz_plastic_produce"),
  width = +svg1.attr("width"),
  height = +svg1.attr("height");

// Define the div for the tooltip
var div1 = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// Map and projection
var path1 = d3.geoPath();
var projection1 = d3.geoEckert3()
  .scale(175)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data1 = d3.map();
var colorScale1 = d3.scaleThreshold()
  .domain([0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45 , 0.5])
  .range(d3.schemeBlues[9]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/aryanm1999/data-vis-data/main/per-capita-person-day.csv", function(d) { data1.set(d.code, +d.pop); })
  .await(ready1);

function ready1(error, topo) {

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
  svg1.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection1)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data1.get(d.id) || 0;
        return colorScale1(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
}