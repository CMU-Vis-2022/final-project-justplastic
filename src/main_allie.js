// https://vizhub.com/curran/717a939bb09b4b3297b62c20d42ea6a3?edit=files&file=bundle.js

import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import { csv } from 'd3';
import { Handler } from 'vega-tooltip';
import { graph } from './chart2';
import { map } from './chart5';
import { products } from './chart1'
// import { svg3chart } from "./test";

const policyData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/policy_data.csv");

// const chart = svg3chart();

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

// Generators.observe((notify) =>

const run = async () => {
    const productsMarks = products
      .autosize({ type: 'fit', contains: 'padding' });
    const graphMarks = graph
      .autosize({ type: 'fit', contains: 'padding' });
    const mapMarks = map
      .autosize({ type: 'fit', contains: 'padding' })
      .view(addEventListener('click', function(event, item) {
        policy_desc(event.item.datum.properties.name);
      }));


    document.getElementById("graph1").appendChild(await productsMarks.render());
    document.getElementById("graph2").appendChild(await graphMarks.render());
    document.getElementById("map5").appendChild(await mapMarks.render());
    // document.getElementById("viz_plastic_export").appendChild(chart.element);
    
};
run();
