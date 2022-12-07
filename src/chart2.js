import { csv } from 'd3';
import * as vl from 'vega-lite-api'

const generatedArea = vl.markArea({
    interpolate: "cardinal"
    })
    .encode(
        vl.x().fieldT('year')
            .title("Year"),
        vl.y().fieldQ('waste in msw (thousand tons)')
            .scale({domain:[0,60000]})
            .axis({orient: "right"})
            .title("Waste Generation (kilotons)"),
        vl.color().value("teal"),
        vl.opacity().value(.30),
        vl.tooltip([{field: "year", type: "temporal", timeUnit: "year", title: "Year"}, {field: "waste in msw (thousand tons)", title: "Waste Generated (kilotons)"}, {field: "recycled_value", title: "Plastic Recycled (kilotons)"}])
    )
    .height(300)
    .width(600);

const generatedLine = vl.markLine({
    strokeWidth: 2,
    interpolate: "cardinal"
    })
    .encode(
        vl.x().fieldT('year'),
        vl.y().fieldQ('waste in msw (thousand tons)')
            .scale({domain:[0,60000]})
            .axis(null),
        vl.color().value("teal")
    )
    .height(300)
    .width(600);

const recycledLine = vl.markLine({
    strokeWidth: 2,
    interpolate: "cardinal"
    })
    .encode(
        vl.x().fieldT('year'),
        vl.y().fieldQ('recycled_value')
            .scale({domain:[0,6000]})
            .axis({orient: "left"})
            .title("Plastic Recycled (kilotons)"),
        vl.color().value("navy")
    )
    .height(300)
    .width(600);

const chart2data = await csv("./src/recycled_vs_produced.csv");

export const graph = vl.layer(generatedArea, generatedLine, recycledLine)
    .resolve({"scale": {"y": "independent"}})
    .title("Plastic Waste Generation vs. Plastic Recycled (kilotons)")
    .data(chart2data)
 ;