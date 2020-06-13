
function makeResponsive() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

 // Retrieve data from the CSV file and execute everything below

d3.csv("assets/data/data.csv").then(function(journalData) {

    //Parse Data
    // ==============================
    journalData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.abbr = data.abbr;
      data.income = +data.income;
    });

    // Create X & Y scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8.5, d3.max(journalData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3.5, d3.max(journalData, d => d.healthcare)])
      .range([height, 0]);

    // Create initial axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append X & Y Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // append initial circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(journalData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "17")
    .attr("fill", "green") 
    .attr("opacity", ".5")
    .attr("stroke-width", "2")
    .attr("stroke", "black"); 


    chartGroup.select("g")
        .selectAll("circle")
        .data(journalData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",-415)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black");

        console.log(journalData);

    

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty");

  // create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select()
    .append("div")
     .attr("class", "tooltip")
     .style("background", "black")
     .style("color", "red")
     //.offset([80, -60])
     .html(
       function(d) {
        return (`${d.state}<hr>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`)
    // });
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + "px");
  
  });

  
  //tooltip in the chart.
  //circlesGroup.call(toolTip);

  var circlesGroup = chartGroup.selectAll("circle")
      .data(journalData)
      .enter()
      .append("circle")
      .attr("cx", d => xTimeScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "10")
      .attr("fill", "gold")
      .attr("stroke-width", "1")
      .attr("stroke", "black");

    // Step 3: Add an onmouseout event to make the tooltip invisible
  circlesGroup.on("mouseover", function(d) {
    toolTip.styles("display", "block");
    
    /* d3.select(this)
      .transition()
      .duration(1000)
      .atr("r", 20)
      .attr("fill","red");  */
  
 })

  .on("click", function(journalData) {
    toolTip.show(data, this);
})

  .on("mouseout",function(journalData) {
    d3.select(this)
    .transition()
    .duration(1000)
    .attr("r", 15)
    .attr("fill","black")
    toolTip.style("display","none")
  }); 

  
});

}

// // When the browser loads, makeResponsive() is called.
makeResponsive();

// // When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);


