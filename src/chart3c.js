import { csv, nice } from 'd3';
import * as vl from 'vega-lite-api';

const graph3cData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/aryan_archive/aryan-clean-data/plastic-export.csv");
console.log(Object.values(graph3cData).includes("USA"))

function hasVal(value) { return Object.values(graph3cData).includes(value) };

// country data with codes from http://techslides.com/countries-and-capitals-with-d3-and-natural-earth <3

const graph3c_fill = vl.markGeoshape({stroke: null, opacity: 1})
    .data(vl.topojson('https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/world-NE-10m.json').feature("countries"))
    .transform(
        vl.lookup('id')
          .from(vl.data(graph3cData).key('code').fields(['country', 'code', 'pop']))
      )
    //   domain: [0, 0.5, 1, 2.5, 5, 10,100], 
    .encode(
        vl.tooltip([{field : "country", title: "Country"}, {field: "pop", title: "Exports (kg/person/day)"}]),
        vl.color().fieldQ('pop').scale({type: "sqrt", domain: [0,40], scheme: "greens"}).legend({"title": {"value": "Exports (kg/person/day)", "angle": 90}}),
    )
    .project(vl.projection('equalEarth'))
    .title('Plastic Waste Exports per Person by Country');


const graph3c_stroke = vl.markGeoshape({stroke: "lightgray", strokeWidth: 0.5, fill: "white"})
.data(vl.topojson('https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/world-NE-10m.json').feature("countries"))
.project(vl.projection('equalEarth'))
.encode(
    vl.tooltip().condition({
        "test": `${hasVal("datum['id']")} == true`,
        "value": 0
    }).value(null)
    // [{field : "id", title: "Country"}]),
);
export const graph3c = vl.layer(graph3c_stroke, graph3c_fill);
