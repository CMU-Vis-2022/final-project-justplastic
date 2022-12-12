// https://vizhub.com/curran/717a939bb09b4b3297b62c20d42ea6a3?edit=files&file=bundle.js

import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import { csv } from 'd3';
import { Handler } from 'vega-tooltip';
import { graph } from './chart2';
import { map } from './chart5';
import { products } from './chart1'
import { graph3a } from './chart3a';
import { graph3b } from './chart3b';
import { graph3c } from './chart3c';
import { doc } from 'prettier';

// import { svg3chart } from "./test";

const policyData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/policyData.csv");

// const chart = svg3chart();

let width = window.innerWidth;
window.onresize = width = window.innerWidth;

const slider = document.getElementById("slider");
const guess = document.getElementById("guess");
guess.innerHTML = `${slider.value}%`;

slider.oninput = function() {
  guess.innerHTML = `${this.value}%`;
}

function reveal(id) {
  let div = document.getElementById(id);
  console.log(div.classList);
  div.classList.remove("hidden");
};

function writeAnswer() {
  let answer = document.getElementById("answer");
  answer.innerHTML = `You answered ${slider.value}%. In reality, <u style= "font-size: 50px; color: #3E5C79">83.6%</u> of all environmental plastic contamination is created by the industries of only <span style="color: #DD9787">10 products.</span?`
}


function policy_desc(state) {
  const currentState = state;
  if (document.getElementById("policy_div")){
    document.getElementById("policy_div").remove();
  }
  let policy_div = document.createElement("div");
  policy_div.setAttribute("id", "policy_div");
  let div_title = document.createElement("h3");
  let table = document.createElement("table");
  let table_rowNumber = 0;
  for (const row of policyData) {
    if(row.State == state){
      if (table_rowNumber == 0) {
        let tableHeadingRow = document.createElement("tr");
        tableHeadingRow.setAttribute("class", "heading");
        let citationHeading = document.createElement("th");
        citationHeading.innerText = "Citation";
        citationHeading.setAttribute("class", "citation");
        let summaryHeading = document.createElement("th");
        summaryHeading.innerText = "Summary";
        tableHeadingRow.appendChild(citationHeading);
        tableHeadingRow.appendChild(summaryHeading);
        table.appendChild(tableHeadingRow);
      }
      let tablerow = document.createElement("tr");
      let citation = document.createElement("td");
      citation.innerText = row.Citation;
      citation.setAttribute("class", "citation");
      let summary = document.createElement("td");
      summary.setAttribute("class", "summary");
      summary.innerText = row.Summary
      tablerow.appendChild(citation);
      tablerow.appendChild(summary)
      table.appendChild(tablerow);
      table_rowNumber++;
    }
  }
  
  div_title.innerText = state;
  policy_div.appendChild(div_title);
  policy_div.appendChild(table);
  if (table_rowNumber == 0) {
    let noLegislation = document.createElement("p");
    noLegislation.innerHTML = "No Plastic Bag Legislation";
    policy_div.appendChild(noLegislation);
  }
  document.getElementById("map5").appendChild(policy_div);
};

vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new Handler().call); }
  });




// let slider_solution = document.getElementById("slider_solution");


// slider_solution.setAttribute("class", "hidden")


// console.log(document.getElementById("slider").value)
// // Generators.observe((notify) =>

// function test() {
//   console.log("hiii");
// }



const run = async () => {
    const productsMarks = products
      .width(0.35 * width);
    const graphMarks = graph
    .autosize({ type: 'fit', contains: 'padding' })
    const graph3aMarks = graph3a
      .width(800).height(400);
    const graph3bMarks = graph3b
      .width(800).height(400);
    const graph3cMarks = graph3c
      .width(800).height(400);
    const mapMarks = map
      .autosize({ type: 'fit', contains: 'padding' })
      .view(
        addEventListener('click', function(event, item) {
          policy_desc(event.item.datum.properties.name);
        })
        );


    document.getElementById("graph1").appendChild(await productsMarks.render());
    document.getElementById("graph2").appendChild(await graphMarks.render());
    document.getElementById("graph3a").appendChild(await graph3aMarks.render());
    document.getElementById("graph3b").appendChild(await graph3bMarks.render());
    document.getElementById("graph3c").appendChild(await graph3cMarks.render());
    document.getElementById("map5").appendChild(await mapMarks.render());
    // document.getElementById("viz_plastic_export").appendChild(chart.element);


    let slider_button = document.getElementById("slider_button");
    slider_button.addEventListener("click", function() { writeAnswer(); reveal("slider_reveal"); });

    let above_graph2_button = document.getElementById("above_graph2_button");
    above_graph2_button.addEventListener("click", function() { reveal("above_graph2_reveal")});

    let no_button = document.getElementById("no_button");
    no_button.addEventListener("click", function() { reveal("no_reveal")});
    
};
run();
