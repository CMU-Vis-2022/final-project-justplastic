import { csv } from 'd3';
import * as vl from 'vega-lite-api';

const graph3bData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/aryan_archive/aryan-clean-data/mismanage.csv");
console.log(graph3bData)
// country data with codes from http://techslides.com/countries-and-capitals-with-d3-and-natural-earth <3

const graph3b_fill = vl.markGeoshape({stroke: null, opacity: 1})
    .data(vl.topojson('src/world-NE-10m.json').feature("countries"))
    .transform(
        vl.lookup('id')
          .from(vl.data(graph3bData).key('code').fields(['country', 'code', 'pop']))
      )
    .encode(
        vl.color().fieldQ('pop').scale({scheme: "lightorange", domain: [0,20,60]}).legend({"title": {"value": "pop", "angle": 90}}),
        vl.tooltip([{field : "country", title: "Country"}, {field: "pop", title: "Mismanaged val"}]),
    )
    .project(vl.projection('equalEarth'))
    .title('Per capita plastic waste (kg/person/day) by Country');


const graph3b_stroke = vl.markGeoshape({stroke: "lightgray", strokeWidth: 0.5, fill: "white"})
.data(vl.topojson('src/world-NE-10m.json').feature("countries"))
.project(vl.projection('equalEarth'))
.encode(
    vl.tooltip([{field : "id", title: "Country"}]),
);
export const graph3b = vl.layer(graph3b_stroke, graph3b_fill);
