import { csv } from 'd3';
import * as vl from 'vega-lite-api'

const chart2data = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/recycledvsproduced.csv");


const generatedArea = vl.markLine({
    interpolate: "cardinal"
    })
    .encode(
        vl.x().fieldT('year')
            .title("Year"),
        vl.y().fieldQ('waste in msw (thousand tons)')
            .scale({domain:[0,60000]})
            .axis({orient: "right"})
            .title(" "),
        vl.color().value("white"),
        vl.opacity().value(.30),
     
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
        vl.color().value("#D38B5D")
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
            .title(" "),
        vl.color().value("#74A57F")
    )
    .height(300)
    .width(600);

//const chart2data = await csv("./src/recycledvsproduced.csv");

console.log(chart2data);
const rule = vl.markRule({
    color: "#605B56",
    strokeWidth: 2,
    strokeDash: [8,4]
})
    .transform({"filter": "1502000000000 < datum['year'] && datum['year']< 1540000000000 "})
    .encode(
        vl.x().fieldT("year")
    )
    .height(300)
    .width(600);

const annotation = vl.markText({
    align: 'center',
    dx: -5,
    dy: -100,
    color: "#605B56",
    fontSize: 12  })
  .encode(vl.text().value("Why the sudden change? →") )
  .height(300)
  .width(600);

  const generatedText = vl.markText({
    align: 'center',
    dx: 0,
    dy: -292,
    color: "#D38B5D",
    angle: 90,
    fontSize: 11,
    fontWeight: "bold"
  })
  .encode(vl.text().value("Waste Generation (kilotons)") )
  .height(300)
  .width(600);

  const recycledText = vl.markText({
    align: 'center',
    dx: -1,
    dy: -285,
    color: "#74A57F",
    angle: 270,
    fontSize: 11,
    fontWeight: "bold"
  })
  .encode(vl.text().value("Plastic Recycled (kilotons)") )
  .height(300)
  .width(600);

export const graph = vl.layer(generatedArea, generatedLine, recycledLine, rule, annotation, generatedText, recycledText)
    .resolve({"scale": {"y": "independent"}})
    .title("U.S. Plastic Waste Generation vs. Plastic Recycled (kilotons)")
    .data(chart2data)
    // .tooltip([{field: "year", type: "temporal", timeUnit: "year", title: "Year"}, {field: "waste in msw (thousand tons)", title: "Waste Generated (kilotons)"}, {field: "recycled_value", title: "Plastic Recycled (kilotons)"}]),

 ;

