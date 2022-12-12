import { csv } from 'd3';
import * as vl from 'vega-lite-api';

const mapData = await csv("https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/map.csv");

const facilities_fill = vl.markGeoshape({strokeOpacity: 0.5})
.data(vl.topojson('https://raw.githubusercontent.com/CMU-Vis-2022/final-project-justplastic/main/src/states-10m.json').feature('states'))
.transform(
    vl.lookup('properties.name')
      .from(vl.data(mapData).key('State').fields(['Facilities per Million People', 'Ban_Preemption', 'State']))
  )
.params([
    {
      "name": "highlight",
      "select": {"type": "point", "on": "mouseover"},
      "value": false
    },
    {
      "name": "select",
      "select": "point",
      "value": false
    }
])
.encode(
    vl.color().fieldQ("Facilities per Million People").scale({type: 'pow', exponent: 0.4, scheme: ["white", "gray"]}).legend({"direction": "vertical"}),
    vl.tooltip().condition([
        {
            "test": "datum['Ban_Preemption'] == '1'",
            "value": "Ban in Place"
        },
        {
            "test": "datum['Ban_Preemption'] == '2'",
            "value": "Preemption in Place"
        },
        {
            "test": "datum['Ban_Preemption'] == '0'",
            "value": "No Legislation in Place"
        }
        ]).value("test"),
    vl.stroke().fieldN("Ban_Preemption").scale({domain: ["0","1","2"], range: ["gray", "green", "#FCD12A"]}).legend({"labelExpr": "datum.label == '0' ? 'No Legislation in Place' : datum.label == '1' ? 'Ban in Place' :datum.label == '2' ? 'Preemption in Place' : 'null'"}).title("Legislation"),

    vl.strokeWidth().condition({
        "test": {"or": [{"param": "highlight"}, {"param": "select"}]},
        // "value": "purple"
        "value": 6,
    }).value(2)
    
)
.project(vl.projection('albersusa'))
.width(800).height(400)
.title("Number of Plastic Producing Facilities vs. Plastic Bag Legislation by State ")


export const map = facilities_fill;
    // .config({view: {stroke: null}});