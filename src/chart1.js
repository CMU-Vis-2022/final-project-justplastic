import { csv, descending } from 'd3';
import * as vl from 'vega-lite-api';

const productData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/graph1_data.csv");

const graph = vl.markBar()
    .encode(
        vl.x().fieldQ("perc_val").title("Percent (%)"),
        // Percent of Total Plastic Contamination
        vl.y().fieldN("product").sort(null).title("Product"),
        vl.color().fieldQ("perc_val").legend({title: {value: " "}}).scale({range: ["#E4C5AF", "#DD9787"]}),
        vl.tooltip([{field: "perc_val", type: "nominal", title: "% of Total Plastic Contamination"}])
    ).title("Percent of Total Plastic Contamination of Top 10 Plastic Products");



const legendTitle = vl.markText({
    align: 'center',
    dx: 5,
    dy: -310,
    color: "black",
    angle: 90,
    fontWeight: 545,
    fontSize: 11 })
    .encode(vl.text().value("Percent (%)") );

export const products = vl.layer(graph, legendTitle).data(productData);