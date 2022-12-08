import { csv, descending } from 'd3';
import * as vl from 'vega-lite-api';

const productData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/graph1_data.csv");

const graph = vl.markBar()
    .data(productData)
    .encode(
        vl.x().fieldQ("perc_val").title(" "),
        // Percent of Total Plastic Contamination
        vl.y().fieldN("product").sort(null).title("Product"),
        vl.color().fieldQ("perc_val").legend({title: {value: " "}}).scale({range: ["#ADE1E5", "#3E5C79"]}),
        vl.tooltip([{field: "perc_val", type: "nominal", title: "% of Total Plastic Contamination"}])
    )




export const products = graph;