import { csv, descending } from 'd3';
import * as vl from 'vega-lite-api';

const productData = await csv("src/graph1_data.csv");

const graph = vl.markBar()
    .data(productData)
    .encode(
        vl.x().fieldQ("perc_val"),
        vl.y().fieldN("product").sort(null).title("Product"),
        vl.color().fieldQ("perc_val").title("Percent of Plastic Production"),
        vl.tooltip([{field: "perc_val", type: "nominal", title: "Percent of Plastic Production"}])
    )
    .width(600)


export const products = graph;