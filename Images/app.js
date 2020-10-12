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

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(journalData) {

    // Parse Data
    // ==============================
    journalData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.abbr = data.abbr;
      data.income = +data.income;
    });

    // Create x & y scale functions
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

    // Append Axes to the chart
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
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".5")
    .attr("stroke-width", "1")
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
      .attr("value","lacks_healthcare") // value to grab for event listener
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr("value","in_poverty") // value to grab for event listener
      .text("In Poverty");

  
  
  });


makeResponsive();

}



// // Step 6: Initialize tool tip
    // // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .style("background", "black")
    //   .style("color", "white")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
    //   });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("mouseover", function() {
    //   d3.select(this)
    //         .transition()
    //         .duration(1000)
    //         .attr("r", 20)
    //         .attr("fill", "blue");
    // })
    //     .on("click", function(d) {
    //         toolTip.show(d, this);
    //     })

    //     .on("mouseout", function() {
    //         d3.select(this)
    //         .transition()
    //         .duration(1000)
    //         .attr("r", 15)
    //         .attr("fill", "green")
    //         toolTip.hide()
    //     });

    /* }).catch(function(error) {
    console.log(error); */

