import { csv } from 'd3';
import * as vl from 'vega-lite-api';

const graph3aData = await csv("src/Per-Capita-Waste-Generation.csv");

// country data with codes from http://techslides.com/countries-and-capitals-with-d3-and-natural-earth <3

const graph3a_fill = vl.markGeoshape({stroke: null, opacity: 1})
    .data(vl.topojson('src/world-NE-10m.json').feature("countries"))
    .transform(
        vl.lookup('id')
          .from(vl.data(graph3aData).key('Code').fields(['Entity', 'Code', 'Per capita plastic waste (kg/person/day)']))
      )
    //   domain: [0, 0.45, 0.8]
    .encode(
        vl.color().fieldQ('Per capita plastic waste (kg/person/day)').scale({type: "pow", exponent: 1.2, scheme: "blues"}).legend({"title": {"value": "(kg/person/day)", "angle": 90}}),
        vl.tooltip([{field : "Entity", title: "Country"}, {field: "Per capita plastic waste (kg/person/day)", title: "Waste per Person"}]),
    )
    .project(vl.projection('equalEarth'))
    .title('Per capita plastic waste (kg/person/day) by Country');


const graph3a_stroke = vl.markGeoshape({stroke: "lightgray", strokeWidth: 0.5, fill: "white"})
.data(vl.topojson('src/world-NE-10m.json').feature("countries"))
.project(vl.projection('equalEarth'))
.encode(
    vl.tooltip([{field : "id", title: "Country"}]),
);
export const graph3a = vl.layer(graph3a_stroke, graph3a_fill);
