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
  document.getElementById("map5").appendChild(policy_div);
};

vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new Handler().call); }
  });

const slider = document.getElementById("slider");
const guess = document.getElementById("guess");
guess.innerText = slider.value;

slider.oninput = function() {
  guess.innerHTML = this.value;
}

const slider_button = document.getElementById("slider_button");
slider_button.addEventListener("click", sliderSolution())

function sliderSolution() {
  console.log("hi");
  const div = document.getElementById("slider_solution");
  div.classList.remove("hidden")
}

console.log(document.getElementById("slider").value)
// Generators.observe((notify) =>

const run = async () => {
    const productsMarks = products
      .width(0.3 * width);
    const graphMarks = graph
    .autosize({ type: 'fit', contains: 'padding' })
    const graph3aMarks = graph3a
      .width(800).height(500);
    const graph3bMarks = graph3b
      .width(800).height(500);
    const graph3cMarks = graph3c
      .width(800).height(500);
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
    // document.getElementById("graph3b").appendChild(await graph3bMarks.render());
    // document.getElementById("graph3c").appendChild(await graph3cMarks.render());
    document.getElementById("map5").appendChild(await mapMarks.render());
    // document.getElementById("viz_plastic_export").appendChild(chart.element);
    
};
run();
