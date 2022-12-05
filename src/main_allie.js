// https://vizhub.com/curran/717a939bb09b4b3297b62c20d42ea6a3?edit=files&file=bundle.js

import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import { csv } from 'd3';
import { Handler } from 'vega-tooltip';
import { graph } from './chart2';
import { map } from './chart5';
import { products } from './chart1'



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
      .autosize({ type: 'fit', contains: 'padding' });


    document.getElementById("graph1").appendChild(await productsMarks.render());
    document.getElementById("graph2").appendChild(await graphMarks.render());
    document.getElementById("map5").appendChild(await mapMarks.render());
    
};
run();
