export const bar_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A basic bar chart example, with value labels shown upon pointer hover.",
    "width": 400,
    "height": 200,
    "padding": 5,
  
    "data": [
      {
        "name": "table",
        "values": [
          {"category": "A", "amount": 28},
          {"category": "B", "amount": 55},
          {"category": "C", "amount": 43},
          {"category": "D", "amount": 91},
          {"category": "E", "amount": 81},
          {"category": "F", "amount": 53},
          {"category": "G", "amount": 19},
          {"category": "H", "amount": 87}
        ]
      }
    ],
  
    "signals": [
      {
        "name": "tooltip",
        "value": {},
        "on": [
          {"events": "rect:pointerover", "update": "datum"},
          {"events": "rect:pointerout",  "update": "{}"}
        ]
      }
    ],
  
    "scales": [
      {
        "name": "xscale",
        "type": "band",
        "domain": {"data": "table", "field": "category"},
        "range": "width",
        "padding": 0.05,
        "round": true
      },
      {
        "name": "yscale",
        "domain": {"data": "table", "field": "amount"},
        "nice": true,
        "range": "height"
      }
    ],
  
    "axes": [
      { "orient": "bottom", "scale": "xscale" },
      { "orient": "left", "scale": "yscale" }
    ],
  
    "marks": [
      {
        "type": "rect",
        "from": {"data":"table"},
        "encode": {
          "enter": {
            "x": {"scale": "xscale", "field": "category"},
            "width": {"scale": "xscale", "band": 1},
            "y": {"scale": "yscale", "field": "amount"},
            "y2": {"scale": "yscale", "value": 0}
          },
          "update": {
            "fill": {"value": "steelblue"}
          },
          "hover": {
            "fill": {"value": "red"}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "align": {"value": "center"},
            "baseline": {"value": "bottom"},
            "fill": {"value": "#333"}
          },
          "update": {
            "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
            "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
            "text": {"signal": "tooltip.amount"},
            "fillOpacity": [
              {"test": "datum === tooltip", "value": 0},
              {"value": 1}
            ]
          }
        }
      }
    ]
}

export const donut_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A basic donut chart example.",
    "width": 200,
    "height": 200,
    "autosize": "none",
  
    "signals": [
      {
        "name": "startAngle", "value": 0,
        "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
      },
      {
        "name": "endAngle", "value": 6.29,
        "bind": {"input": "range", "min": 0, "max": 6.29, "step": 0.01}
      },
      {
        "name": "padAngle", "value": 0,
        "bind": {"input": "range", "min": 0, "max": 0.1}
      },
      {
        "name": "innerRadius", "value": 60,
        "bind": {"input": "range", "min": 0, "max": 90, "step": 1}
      },
      {
        "name": "cornerRadius", "value": 0,
        "bind": {"input": "range", "min": 0, "max": 10, "step": 0.5}
      },
      {
        "name": "sort", "value": false,
        "bind": {"input": "checkbox"}
      }
    ],
  
    "data": [
      {
        "name": "table",
        "values": [
          {"id": 1, "field": 4},
          {"id": 2, "field": 6},
          {"id": 3, "field": 10},
          {"id": 4, "field": 3},
          {"id": 5, "field": 7},
          {"id": 6, "field": 8}
        ],
        "transform": [
          {
            "type": "pie",
            "field": "field",
            "startAngle": {"signal": "startAngle"},
            "endAngle": {"signal": "endAngle"},
            "sort": {"signal": "sort"}
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "color",
        "type": "ordinal",
        "domain": {"data": "table", "field": "id"},
        "range": {"scheme": "category20"}
      }
    ],
  
    "marks": [
      {
        "type": "arc",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "fill": {"scale": "color", "field": "id"},
            "x": {"signal": "width / 2"},
            "y": {"signal": "height / 2"}
          },
          "update": {
            "startAngle": {"field": "startAngle"},
            "endAngle": {"field": "endAngle"},
            "padAngle": {"signal": "padAngle"},
            "innerRadius": {"signal": "innerRadius"},
            "outerRadius": {"signal": "width / 2"},
            "cornerRadius": {"signal": "cornerRadius"}
          }
        }
      }
    ]
}

export const stacked_area_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A basic stacked area chart example.",
    "width": 500,
    "height": 200,
    "padding": 5,
  
    "data": [
      {
        "name": "table",
        "values": [
          {"x": 0, "y": 28, "c":0}, {"x": 0, "y": 55, "c":1},
          {"x": 1, "y": 43, "c":0}, {"x": 1, "y": 91, "c":1},
          {"x": 2, "y": 81, "c":0}, {"x": 2, "y": 53, "c":1},
          {"x": 3, "y": 19, "c":0}, {"x": 3, "y": 87, "c":1},
          {"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
          {"x": 5, "y": 24, "c":0}, {"x": 5, "y": 49, "c":1},
          {"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
          {"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
          {"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
          {"x": 9, "y": 49, "c":0}, {"x": 9, "y": 15, "c":1}
        ],
        "transform": [
          {
            "type": "stack",
            "groupby": ["x"],
            "sort": {"field": "c"},
            "field": "y"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "point",
        "range": "width",
        "domain": {"data": "table", "field": "x"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "nice": true, "zero": true,
        "domain": {"data": "table", "field": "y1"}
      },
      {
        "name": "color",
        "type": "ordinal",
        "range": "category",
        "domain": {"data": "table", "field": "c"}
      }
    ],
  
    "axes": [
      {"orient": "bottom", "scale": "x", "zindex": 1},
      {"orient": "left", "scale": "y", "zindex": 1}
    ],
  
    "marks": [
      {
        "type": "group",
        "from": {
          "facet": {
            "name": "series",
            "data": "table",
            "groupby": "c"
          }
        },
        "marks": [
          {
            "type": "area",
            "from": {"data": "series"},
            "encode": {
              "enter": {
                "interpolate": {"value": "monotone"},
                "x": {"scale": "x", "field": "x"},
                "y": {"scale": "y", "field": "y0"},
                "y2": {"scale": "y", "field": "y1"},
                "fill": {"scale": "color", "field": "c"}
              },
              "update": {
                "fillOpacity": {"value": 1}
              },
              "hover": {
                "fillOpacity": {"value": 0.5}
              }
            }
          }
        ]
      }
    ]
}

const barley_data = [
    {
        "yield": 27,
        "variety": "Manchuria",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 48.86667,
        "variety": "Manchuria",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 27.43334,
        "variety": "Manchuria",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 39.93333,
        "variety": "Manchuria",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 32.96667,
        "variety": "Manchuria",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 28.96667,
        "variety": "Manchuria",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 43.06666,
        "variety": "Glabron",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 55.2,
        "variety": "Glabron",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 28.76667,
        "variety": "Glabron",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 38.13333,
        "variety": "Glabron",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 29.13333,
        "variety": "Glabron",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 29.66667,
        "variety": "Glabron",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 35.13333,
        "variety": "Svansota",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 47.33333,
        "variety": "Svansota",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 25.76667,
        "variety": "Svansota",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 40.46667,
        "variety": "Svansota",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 29.66667,
        "variety": "Svansota",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 25.7,
        "variety": "Svansota",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 39.9,
        "variety": "Velvet",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 50.23333,
        "variety": "Velvet",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 26.13333,
        "variety": "Velvet",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 41.33333,
        "variety": "Velvet",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 23.03333,
        "variety": "Velvet",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 26.3,
        "variety": "Velvet",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 36.56666,
        "variety": "Trebi",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 63.8333,
        "variety": "Trebi",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 43.76667,
        "variety": "Trebi",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 46.93333,
        "variety": "Trebi",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 29.76667,
        "variety": "Trebi",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 33.93333,
        "variety": "Trebi",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 43.26667,
        "variety": "No. 457",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 58.1,
        "variety": "No. 457",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 28.7,
        "variety": "No. 457",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 45.66667,
        "variety": "No. 457",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 32.16667,
        "variety": "No. 457",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 33.6,
        "variety": "No. 457",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 36.6,
        "variety": "No. 462",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 65.7667,
        "variety": "No. 462",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 30.36667,
        "variety": "No. 462",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 48.56666,
        "variety": "No. 462",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 24.93334,
        "variety": "No. 462",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 28.1,
        "variety": "No. 462",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 32.76667,
        "variety": "Peatland",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 48.56666,
        "variety": "Peatland",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 29.86667,
        "variety": "Peatland",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 41.6,
        "variety": "Peatland",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 34.7,
        "variety": "Peatland",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 32,
        "variety": "Peatland",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 24.66667,
        "variety": "No. 475",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 46.76667,
        "variety": "No. 475",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 22.6,
        "variety": "No. 475",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 44.1,
        "variety": "No. 475",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 19.7,
        "variety": "No. 475",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 33.06666,
        "variety": "No. 475",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 39.3,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "University Farm"
    },
    {
        "yield": 58.8,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "Waseca"
    },
    {
        "yield": 29.46667,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "Morris"
    },
    {
        "yield": 49.86667,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "Crookston"
    },
    {
        "yield": 34.46667,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "Grand Rapids"
    },
    {
        "yield": 31.6,
        "variety": "Wisconsin No. 38",
        "year": 1931,
        "site": "Duluth"
    },
    {
        "yield": 26.9,
        "variety": "Manchuria",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 33.46667,
        "variety": "Manchuria",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 34.36666,
        "variety": "Manchuria",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 32.96667,
        "variety": "Manchuria",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 22.13333,
        "variety": "Manchuria",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 22.56667,
        "variety": "Manchuria",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 36.8,
        "variety": "Glabron",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 37.73333,
        "variety": "Glabron",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 35.13333,
        "variety": "Glabron",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 26.16667,
        "variety": "Glabron",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 14.43333,
        "variety": "Glabron",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 25.86667,
        "variety": "Glabron",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 27.43334,
        "variety": "Svansota",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 38.5,
        "variety": "Svansota",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 35.03333,
        "variety": "Svansota",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 20.63333,
        "variety": "Svansota",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 16.63333,
        "variety": "Svansota",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 22.23333,
        "variety": "Svansota",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 26.8,
        "variety": "Velvet",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 37.4,
        "variety": "Velvet",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 38.83333,
        "variety": "Velvet",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 32.06666,
        "variety": "Velvet",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 32.23333,
        "variety": "Velvet",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 22.46667,
        "variety": "Velvet",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 29.06667,
        "variety": "Trebi",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 49.2333,
        "variety": "Trebi",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 46.63333,
        "variety": "Trebi",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 41.83333,
        "variety": "Trebi",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 20.63333,
        "variety": "Trebi",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 30.6,
        "variety": "Trebi",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 26.43334,
        "variety": "No. 457",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 42.2,
        "variety": "No. 457",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 43.53334,
        "variety": "No. 457",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 34.33333,
        "variety": "No. 457",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 19.46667,
        "variety": "No. 457",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 22.7,
        "variety": "No. 457",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 25.56667,
        "variety": "No. 462",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 44.7,
        "variety": "No. 462",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 47,
        "variety": "No. 462",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 30.53333,
        "variety": "No. 462",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 19.9,
        "variety": "No. 462",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 22.5,
        "variety": "No. 462",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 28.06667,
        "variety": "Peatland",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 36.03333,
        "variety": "Peatland",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 43.2,
        "variety": "Peatland",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 25.23333,
        "variety": "Peatland",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 26.76667,
        "variety": "Peatland",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 31.36667,
        "variety": "Peatland",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 30,
        "variety": "No. 475",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 41.26667,
        "variety": "No. 475",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 44.23333,
        "variety": "No. 475",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 32.13333,
        "variety": "No. 475",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 15.23333,
        "variety": "No. 475",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 27.36667,
        "variety": "No. 475",
        "year": 1932,
        "site": "Duluth"
    },
    {
        "yield": 38,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "University Farm"
    },
    {
        "yield": 58.16667,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "Waseca"
    },
    {
        "yield": 47.16667,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "Morris"
    },
    {
        "yield": 35.9,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "Crookston"
    },
    {
        "yield": 20.66667,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "Grand Rapids"
    },
    {
        "yield": 29.33333,
        "variety": "Wisconsin No. 38",
        "year": 1932,
        "site": "Duluth"
    }
]

export const barley_trellis_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A small multiples view of barley yields by site and variety.",
    "width": 200,
    "padding": 5,
  
    "signals": [
      {"name": "offset", "value": 15},
      {"name": "cellHeight", "value": 100},
      {"name": "height", "update": "6 * (offset + cellHeight)"}
    ],
  
    "data": {
        "name": "barley",
        "values": barley_data
    },
  
    "scales": [
      {
        "name": "gscale",
        "type": "band",
        "range": [0, {"signal": "height"}],
        "round": true,
        "domain": {
          "data": "barley",
          "field": "site",
          "sort": {
            "field": "yield",
            "op": "median",
            "order": "descending"
          }
        }
      },
      {
        "name": "xscale",
        "type": "linear",
        "nice": true,
        "range": "width",
        "round": true,
        "domain": {"data": "barley", "field": "yield"}
      },
      {
        "name": "cscale",
        "type": "ordinal",
        "range": "category",
        "domain": {"data": "barley", "field": "year"}
      }
    ],
  
    "axes": [
      {"orient": "bottom", "scale": "xscale", "zindex": 1}
    ],
  
    "legends": [
      {
        "stroke": "cscale",
        "title": "Year",
        "padding": 4,
        "encode": {
          "symbols": {
            "enter": {
              "strokeWidth": {"value": 2},
              "size": {"value": 50}
            }
          }
        }
      }
    ],
  
    "marks": [
      {
        "name": "site",
        "type": "group",
  
        "from": {
          "facet": {
            "data": "barley",
            "name": "sites",
            "groupby": "site"
          }
        },
  
        "encode": {
          "enter": {
            "y": {"scale": "gscale", "field": "site", "offset": {"signal": "offset"}},
            "height": {"signal": "cellHeight"},
            "width": {"signal": "width"},
            "stroke": {"value": "#ccc"}
          }
        },
  
        "scales": [
          {
            "name": "yscale",
            "type": "point",
            "range": [0, {"signal": "cellHeight"}],
            "padding": 1,
            "round": true,
            "domain": {
              "data": "barley",
              "field": "variety",
              "sort": {
                "field": "yield",
                "op": "median",
                "order": "descending"
              }
            }
          }
        ],
  
        "axes": [
          {
            "orient": "left",
            "scale": "yscale",
            "tickSize": 0,
            "domain": false,
            "grid": true,
            "encode": {
              "grid": {
                "enter": {"strokeDash": {"value": [3,3]}}
              }
            }
          },
          {
            "orient": "right",
            "scale": "yscale",
            "tickSize": 0,
            "domain": false
          }
        ],
  
        "marks": [
          {
            "type": "symbol",
            "from": {"data": "sites"},
            "encode": {
              "enter": {
                "x": {"scale": "xscale", "field": "yield"},
                "y": {"scale": "yscale", "field": "variety"},
                "stroke": {"scale": "cscale", "field": "year"},
                "strokeWidth": {"value": 2},
                "size": {"value": 50}
              }
            }
          }
        ]
      },
  
      {
        "type": "text",
        "from": {"data": "site"},
        "encode": {
          "enter": {
            "x": {"field": "width", "mult": 0.5},
            "y": {"field": "y"},
            "fontSize": {"value": 11},
            "fontWeight": {"value": "bold"},
            "text": {"field": "datum.site"},
            "align": {"value": "center"},
            "baseline": {"value": "bottom"},
            "fill": {"value": "#000"}
          }
        }
      }
    ]
}

const population_data = [
    {
        "year": 1850,
        "age": 0,
        "sex": 1,
        "people": 1483789
    },
    {
        "year": 1850,
        "age": 0,
        "sex": 2,
        "people": 1450376
    },
    {
        "year": 1850,
        "age": 5,
        "sex": 1,
        "people": 1411067
    },
    {
        "year": 1850,
        "age": 5,
        "sex": 2,
        "people": 1359668
    },
    {
        "year": 1850,
        "age": 10,
        "sex": 1,
        "people": 1260099
    },
    {
        "year": 1850,
        "age": 10,
        "sex": 2,
        "people": 1216114
    },
    {
        "year": 1850,
        "age": 15,
        "sex": 1,
        "people": 1077133
    },
    {
        "year": 1850,
        "age": 15,
        "sex": 2,
        "people": 1110619
    },
    {
        "year": 1850,
        "age": 20,
        "sex": 1,
        "people": 1017281
    },
    {
        "year": 1850,
        "age": 20,
        "sex": 2,
        "people": 1003841
    },
    {
        "year": 1850,
        "age": 25,
        "sex": 1,
        "people": 862547
    },
    {
        "year": 1850,
        "age": 25,
        "sex": 2,
        "people": 799482
    },
    {
        "year": 1850,
        "age": 30,
        "sex": 1,
        "people": 730638
    },
    {
        "year": 1850,
        "age": 30,
        "sex": 2,
        "people": 639636
    },
    {
        "year": 1850,
        "age": 35,
        "sex": 1,
        "people": 588487
    },
    {
        "year": 1850,
        "age": 35,
        "sex": 2,
        "people": 505012
    },
    {
        "year": 1850,
        "age": 40,
        "sex": 1,
        "people": 475911
    },
    {
        "year": 1850,
        "age": 40,
        "sex": 2,
        "people": 428185
    },
    {
        "year": 1850,
        "age": 45,
        "sex": 1,
        "people": 384211
    },
    {
        "year": 1850,
        "age": 45,
        "sex": 2,
        "people": 341254
    },
    {
        "year": 1850,
        "age": 50,
        "sex": 1,
        "people": 321343
    },
    {
        "year": 1850,
        "age": 50,
        "sex": 2,
        "people": 286580
    },
    {
        "year": 1850,
        "age": 55,
        "sex": 1,
        "people": 194080
    },
    {
        "year": 1850,
        "age": 55,
        "sex": 2,
        "people": 187208
    },
    {
        "year": 1850,
        "age": 60,
        "sex": 1,
        "people": 174976
    },
    {
        "year": 1850,
        "age": 60,
        "sex": 2,
        "people": 162236
    },
    {
        "year": 1850,
        "age": 65,
        "sex": 1,
        "people": 106827
    },
    {
        "year": 1850,
        "age": 65,
        "sex": 2,
        "people": 105534
    },
    {
        "year": 1850,
        "age": 70,
        "sex": 1,
        "people": 73677
    },
    {
        "year": 1850,
        "age": 70,
        "sex": 2,
        "people": 71762
    },
    {
        "year": 1850,
        "age": 75,
        "sex": 1,
        "people": 40834
    },
    {
        "year": 1850,
        "age": 75,
        "sex": 2,
        "people": 40229
    },
    {
        "year": 1850,
        "age": 80,
        "sex": 1,
        "people": 23449
    },
    {
        "year": 1850,
        "age": 80,
        "sex": 2,
        "people": 22949
    },
    {
        "year": 1850,
        "age": 85,
        "sex": 1,
        "people": 8186
    },
    {
        "year": 1850,
        "age": 85,
        "sex": 2,
        "people": 10511
    },
    {
        "year": 1850,
        "age": 90,
        "sex": 1,
        "people": 5259
    },
    {
        "year": 1850,
        "age": 90,
        "sex": 2,
        "people": 6569
    },
    {
        "year": 1860,
        "age": 0,
        "sex": 1,
        "people": 2120846
    },
    {
        "year": 1860,
        "age": 0,
        "sex": 2,
        "people": 2092162
    },
    {
        "year": 1860,
        "age": 5,
        "sex": 1,
        "people": 1804467
    },
    {
        "year": 1860,
        "age": 5,
        "sex": 2,
        "people": 1778772
    },
    {
        "year": 1860,
        "age": 10,
        "sex": 1,
        "people": 1612640
    },
    {
        "year": 1860,
        "age": 10,
        "sex": 2,
        "people": 1540350
    },
    {
        "year": 1860,
        "age": 15,
        "sex": 1,
        "people": 1438094
    },
    {
        "year": 1860,
        "age": 15,
        "sex": 2,
        "people": 1495999
    },
    {
        "year": 1860,
        "age": 20,
        "sex": 1,
        "people": 1351121
    },
    {
        "year": 1860,
        "age": 20,
        "sex": 2,
        "people": 1370462
    },
    {
        "year": 1860,
        "age": 25,
        "sex": 1,
        "people": 1217615
    },
    {
        "year": 1860,
        "age": 25,
        "sex": 2,
        "people": 1116373
    },
    {
        "year": 1860,
        "age": 30,
        "sex": 1,
        "people": 1043174
    },
    {
        "year": 1860,
        "age": 30,
        "sex": 2,
        "people": 936055
    },
    {
        "year": 1860,
        "age": 35,
        "sex": 1,
        "people": 866910
    },
    {
        "year": 1860,
        "age": 35,
        "sex": 2,
        "people": 737136
    },
    {
        "year": 1860,
        "age": 40,
        "sex": 1,
        "people": 699434
    },
    {
        "year": 1860,
        "age": 40,
        "sex": 2,
        "people": 616826
    },
    {
        "year": 1860,
        "age": 45,
        "sex": 1,
        "people": 552404
    },
    {
        "year": 1860,
        "age": 45,
        "sex": 2,
        "people": 461739
    },
    {
        "year": 1860,
        "age": 50,
        "sex": 1,
        "people": 456176
    },
    {
        "year": 1860,
        "age": 50,
        "sex": 2,
        "people": 407305
    },
    {
        "year": 1860,
        "age": 55,
        "sex": 1,
        "people": 292417
    },
    {
        "year": 1860,
        "age": 55,
        "sex": 2,
        "people": 267224
    },
    {
        "year": 1860,
        "age": 60,
        "sex": 1,
        "people": 260887
    },
    {
        "year": 1860,
        "age": 60,
        "sex": 2,
        "people": 249735
    },
    {
        "year": 1860,
        "age": 65,
        "sex": 1,
        "people": 149331
    },
    {
        "year": 1860,
        "age": 65,
        "sex": 2,
        "people": 141405
    },
    {
        "year": 1860,
        "age": 70,
        "sex": 1,
        "people": 98465
    },
    {
        "year": 1860,
        "age": 70,
        "sex": 2,
        "people": 101778
    },
    {
        "year": 1860,
        "age": 75,
        "sex": 1,
        "people": 56699
    },
    {
        "year": 1860,
        "age": 75,
        "sex": 2,
        "people": 57597
    },
    {
        "year": 1860,
        "age": 80,
        "sex": 1,
        "people": 29007
    },
    {
        "year": 1860,
        "age": 80,
        "sex": 2,
        "people": 29506
    },
    {
        "year": 1860,
        "age": 85,
        "sex": 1,
        "people": 10434
    },
    {
        "year": 1860,
        "age": 85,
        "sex": 2,
        "people": 14053
    },
    {
        "year": 1860,
        "age": 90,
        "sex": 1,
        "people": 7232
    },
    {
        "year": 1860,
        "age": 90,
        "sex": 2,
        "people": 6622
    },
    {
        "year": 1870,
        "age": 0,
        "sex": 1,
        "people": 2800083
    },
    {
        "year": 1870,
        "age": 0,
        "sex": 2,
        "people": 2717102
    },
    {
        "year": 1870,
        "age": 5,
        "sex": 1,
        "people": 2428469
    },
    {
        "year": 1870,
        "age": 5,
        "sex": 2,
        "people": 2393680
    },
    {
        "year": 1870,
        "age": 10,
        "sex": 1,
        "people": 2427341
    },
    {
        "year": 1870,
        "age": 10,
        "sex": 2,
        "people": 2342670
    },
    {
        "year": 1870,
        "age": 15,
        "sex": 1,
        "people": 1958390
    },
    {
        "year": 1870,
        "age": 15,
        "sex": 2,
        "people": 2077248
    },
    {
        "year": 1870,
        "age": 20,
        "sex": 1,
        "people": 1805303
    },
    {
        "year": 1870,
        "age": 20,
        "sex": 2,
        "people": 1909382
    },
    {
        "year": 1870,
        "age": 25,
        "sex": 1,
        "people": 1509059
    },
    {
        "year": 1870,
        "age": 25,
        "sex": 2,
        "people": 1574285
    },
    {
        "year": 1870,
        "age": 30,
        "sex": 1,
        "people": 1251534
    },
    {
        "year": 1870,
        "age": 30,
        "sex": 2,
        "people": 1275629
    },
    {
        "year": 1870,
        "age": 35,
        "sex": 1,
        "people": 1185336
    },
    {
        "year": 1870,
        "age": 35,
        "sex": 2,
        "people": 1137490
    },
    {
        "year": 1870,
        "age": 40,
        "sex": 1,
        "people": 968861
    },
    {
        "year": 1870,
        "age": 40,
        "sex": 2,
        "people": 944401
    },
    {
        "year": 1870,
        "age": 45,
        "sex": 1,
        "people": 852672
    },
    {
        "year": 1870,
        "age": 45,
        "sex": 2,
        "people": 747916
    },
    {
        "year": 1870,
        "age": 50,
        "sex": 1,
        "people": 736387
    },
    {
        "year": 1870,
        "age": 50,
        "sex": 2,
        "people": 637801
    },
    {
        "year": 1870,
        "age": 55,
        "sex": 1,
        "people": 486036
    },
    {
        "year": 1870,
        "age": 55,
        "sex": 2,
        "people": 407819
    },
    {
        "year": 1870,
        "age": 60,
        "sex": 1,
        "people": 399264
    },
    {
        "year": 1870,
        "age": 60,
        "sex": 2,
        "people": 374801
    },
    {
        "year": 1870,
        "age": 65,
        "sex": 1,
        "people": 260829
    },
    {
        "year": 1870,
        "age": 65,
        "sex": 2,
        "people": 239080
    },
    {
        "year": 1870,
        "age": 70,
        "sex": 1,
        "people": 173364
    },
    {
        "year": 1870,
        "age": 70,
        "sex": 2,
        "people": 165501
    },
    {
        "year": 1870,
        "age": 75,
        "sex": 1,
        "people": 86929
    },
    {
        "year": 1870,
        "age": 75,
        "sex": 2,
        "people": 89540
    },
    {
        "year": 1870,
        "age": 80,
        "sex": 1,
        "people": 47427
    },
    {
        "year": 1870,
        "age": 80,
        "sex": 2,
        "people": 54190
    },
    {
        "year": 1870,
        "age": 85,
        "sex": 1,
        "people": 15891
    },
    {
        "year": 1870,
        "age": 85,
        "sex": 2,
        "people": 19302
    },
    {
        "year": 1870,
        "age": 90,
        "sex": 1,
        "people": 8649
    },
    {
        "year": 1870,
        "age": 90,
        "sex": 2,
        "people": 13068
    },
    {
        "year": 1880,
        "age": 0,
        "sex": 1,
        "people": 3533662
    },
    {
        "year": 1880,
        "age": 0,
        "sex": 2,
        "people": 3421597
    },
    {
        "year": 1880,
        "age": 5,
        "sex": 1,
        "people": 3297503
    },
    {
        "year": 1880,
        "age": 5,
        "sex": 2,
        "people": 3179142
    },
    {
        "year": 1880,
        "age": 10,
        "sex": 1,
        "people": 2911924
    },
    {
        "year": 1880,
        "age": 10,
        "sex": 2,
        "people": 2813550
    },
    {
        "year": 1880,
        "age": 15,
        "sex": 1,
        "people": 2457734
    },
    {
        "year": 1880,
        "age": 15,
        "sex": 2,
        "people": 2527818
    },
    {
        "year": 1880,
        "age": 20,
        "sex": 1,
        "people": 2547780
    },
    {
        "year": 1880,
        "age": 20,
        "sex": 2,
        "people": 2512803
    },
    {
        "year": 1880,
        "age": 25,
        "sex": 1,
        "people": 2119393
    },
    {
        "year": 1880,
        "age": 25,
        "sex": 2,
        "people": 1974241
    },
    {
        "year": 1880,
        "age": 30,
        "sex": 1,
        "people": 1749107
    },
    {
        "year": 1880,
        "age": 30,
        "sex": 2,
        "people": 1596772
    },
    {
        "year": 1880,
        "age": 35,
        "sex": 1,
        "people": 1540772
    },
    {
        "year": 1880,
        "age": 35,
        "sex": 2,
        "people": 1483717
    },
    {
        "year": 1880,
        "age": 40,
        "sex": 1,
        "people": 1237347
    },
    {
        "year": 1880,
        "age": 40,
        "sex": 2,
        "people": 1239435
    },
    {
        "year": 1880,
        "age": 45,
        "sex": 1,
        "people": 1065973
    },
    {
        "year": 1880,
        "age": 45,
        "sex": 2,
        "people": 1003711
    },
    {
        "year": 1880,
        "age": 50,
        "sex": 1,
        "people": 964484
    },
    {
        "year": 1880,
        "age": 50,
        "sex": 2,
        "people": 863012
    },
    {
        "year": 1880,
        "age": 55,
        "sex": 1,
        "people": 679147
    },
    {
        "year": 1880,
        "age": 55,
        "sex": 2,
        "people": 594843
    },
    {
        "year": 1880,
        "age": 60,
        "sex": 1,
        "people": 580298
    },
    {
        "year": 1880,
        "age": 60,
        "sex": 2,
        "people": 526956
    },
    {
        "year": 1880,
        "age": 65,
        "sex": 1,
        "people": 369398
    },
    {
        "year": 1880,
        "age": 65,
        "sex": 2,
        "people": 346303
    },
    {
        "year": 1880,
        "age": 70,
        "sex": 1,
        "people": 255422
    },
    {
        "year": 1880,
        "age": 70,
        "sex": 2,
        "people": 251860
    },
    {
        "year": 1880,
        "age": 75,
        "sex": 1,
        "people": 141628
    },
    {
        "year": 1880,
        "age": 75,
        "sex": 2,
        "people": 143513
    },
    {
        "year": 1880,
        "age": 80,
        "sex": 1,
        "people": 67526
    },
    {
        "year": 1880,
        "age": 80,
        "sex": 2,
        "people": 77290
    },
    {
        "year": 1880,
        "age": 85,
        "sex": 1,
        "people": 22437
    },
    {
        "year": 1880,
        "age": 85,
        "sex": 2,
        "people": 31227
    },
    {
        "year": 1880,
        "age": 90,
        "sex": 1,
        "people": 10272
    },
    {
        "year": 1880,
        "age": 90,
        "sex": 2,
        "people": 15451
    },
    {
        "year": 1890,
        "age": 0,
        "sex": 1,
        "people": 3533662
    },
    {
        "year": 1890,
        "age": 0,
        "sex": 2,
        "people": 3421597
    },
    {
        "year": 1890,
        "age": 5,
        "sex": 1,
        "people": 3297503
    },
    {
        "year": 1890,
        "age": 5,
        "sex": 2,
        "people": 3179142
    },
    {
        "year": 1890,
        "age": 10,
        "sex": 1,
        "people": 2911924
    },
    {
        "year": 1890,
        "age": 10,
        "sex": 2,
        "people": 2813550
    },
    {
        "year": 1890,
        "age": 15,
        "sex": 1,
        "people": 2457734
    },
    {
        "year": 1890,
        "age": 15,
        "sex": 2,
        "people": 2527818
    },
    {
        "year": 1890,
        "age": 20,
        "sex": 1,
        "people": 2547780
    },
    {
        "year": 1890,
        "age": 20,
        "sex": 2,
        "people": 2512803
    },
    {
        "year": 1890,
        "age": 25,
        "sex": 1,
        "people": 2119393
    },
    {
        "year": 1890,
        "age": 25,
        "sex": 2,
        "people": 1974241
    },
    {
        "year": 1890,
        "age": 30,
        "sex": 1,
        "people": 1749107
    },
    {
        "year": 1890,
        "age": 30,
        "sex": 2,
        "people": 1596772
    },
    {
        "year": 1890,
        "age": 35,
        "sex": 1,
        "people": 1540772
    },
    {
        "year": 1890,
        "age": 35,
        "sex": 2,
        "people": 1483717
    },
    {
        "year": 1890,
        "age": 40,
        "sex": 1,
        "people": 1237347
    },
    {
        "year": 1890,
        "age": 40,
        "sex": 2,
        "people": 1239435
    },
    {
        "year": 1890,
        "age": 45,
        "sex": 1,
        "people": 1065973
    },
    {
        "year": 1890,
        "age": 45,
        "sex": 2,
        "people": 1003711
    },
    {
        "year": 1890,
        "age": 50,
        "sex": 1,
        "people": 964484
    },
    {
        "year": 1890,
        "age": 50,
        "sex": 2,
        "people": 863012
    },
    {
        "year": 1890,
        "age": 55,
        "sex": 1,
        "people": 679147
    },
    {
        "year": 1890,
        "age": 55,
        "sex": 2,
        "people": 594843
    },
    {
        "year": 1890,
        "age": 60,
        "sex": 1,
        "people": 580298
    },
    {
        "year": 1890,
        "age": 60,
        "sex": 2,
        "people": 526956
    },
    {
        "year": 1890,
        "age": 65,
        "sex": 1,
        "people": 369398
    },
    {
        "year": 1890,
        "age": 65,
        "sex": 2,
        "people": 346303
    },
    {
        "year": 1890,
        "age": 70,
        "sex": 1,
        "people": 255422
    },
    {
        "year": 1890,
        "age": 70,
        "sex": 2,
        "people": 251860
    },
    {
        "year": 1890,
        "age": 75,
        "sex": 1,
        "people": 141628
    },
    {
        "year": 1890,
        "age": 75,
        "sex": 2,
        "people": 143513
    },
    {
        "year": 1890,
        "age": 80,
        "sex": 1,
        "people": 67526
    },
    {
        "year": 1890,
        "age": 80,
        "sex": 2,
        "people": 77290
    },
    {
        "year": 1890,
        "age": 85,
        "sex": 1,
        "people": 22437
    },
    {
        "year": 1890,
        "age": 85,
        "sex": 2,
        "people": 31227
    },
    {
        "year": 1890,
        "age": 90,
        "sex": 1,
        "people": 10272
    },
    {
        "year": 1890,
        "age": 90,
        "sex": 2,
        "people": 15451
    },
    {
        "year": 1900,
        "age": 0,
        "sex": 1,
        "people": 4619544
    },
    {
        "year": 1900,
        "age": 0,
        "sex": 2,
        "people": 4589196
    },
    {
        "year": 1900,
        "age": 5,
        "sex": 1,
        "people": 4465783
    },
    {
        "year": 1900,
        "age": 5,
        "sex": 2,
        "people": 4390483
    },
    {
        "year": 1900,
        "age": 10,
        "sex": 1,
        "people": 4057669
    },
    {
        "year": 1900,
        "age": 10,
        "sex": 2,
        "people": 4001749
    },
    {
        "year": 1900,
        "age": 15,
        "sex": 1,
        "people": 3774846
    },
    {
        "year": 1900,
        "age": 15,
        "sex": 2,
        "people": 3801743
    },
    {
        "year": 1900,
        "age": 20,
        "sex": 1,
        "people": 3694038
    },
    {
        "year": 1900,
        "age": 20,
        "sex": 2,
        "people": 3751061
    },
    {
        "year": 1900,
        "age": 25,
        "sex": 1,
        "people": 3389280
    },
    {
        "year": 1900,
        "age": 25,
        "sex": 2,
        "people": 3236056
    },
    {
        "year": 1900,
        "age": 30,
        "sex": 1,
        "people": 2918964
    },
    {
        "year": 1900,
        "age": 30,
        "sex": 2,
        "people": 2665174
    },
    {
        "year": 1900,
        "age": 35,
        "sex": 1,
        "people": 2633883
    },
    {
        "year": 1900,
        "age": 35,
        "sex": 2,
        "people": 2347737
    },
    {
        "year": 1900,
        "age": 40,
        "sex": 1,
        "people": 2261070
    },
    {
        "year": 1900,
        "age": 40,
        "sex": 2,
        "people": 2004987
    },
    {
        "year": 1900,
        "age": 45,
        "sex": 1,
        "people": 1868413
    },
    {
        "year": 1900,
        "age": 45,
        "sex": 2,
        "people": 1648025
    },
    {
        "year": 1900,
        "age": 50,
        "sex": 1,
        "people": 1571038
    },
    {
        "year": 1900,
        "age": 50,
        "sex": 2,
        "people": 1411981
    },
    {
        "year": 1900,
        "age": 55,
        "sex": 1,
        "people": 1161908
    },
    {
        "year": 1900,
        "age": 55,
        "sex": 2,
        "people": 1064632
    },
    {
        "year": 1900,
        "age": 60,
        "sex": 1,
        "people": 916571
    },
    {
        "year": 1900,
        "age": 60,
        "sex": 2,
        "people": 887508
    },
    {
        "year": 1900,
        "age": 65,
        "sex": 1,
        "people": 672663
    },
    {
        "year": 1900,
        "age": 65,
        "sex": 2,
        "people": 640212
    },
    {
        "year": 1900,
        "age": 70,
        "sex": 1,
        "people": 454747
    },
    {
        "year": 1900,
        "age": 70,
        "sex": 2,
        "people": 440007
    },
    {
        "year": 1900,
        "age": 75,
        "sex": 1,
        "people": 268211
    },
    {
        "year": 1900,
        "age": 75,
        "sex": 2,
        "people": 265879
    },
    {
        "year": 1900,
        "age": 80,
        "sex": 1,
        "people": 127435
    },
    {
        "year": 1900,
        "age": 80,
        "sex": 2,
        "people": 132449
    },
    {
        "year": 1900,
        "age": 85,
        "sex": 1,
        "people": 44008
    },
    {
        "year": 1900,
        "age": 85,
        "sex": 2,
        "people": 48614
    },
    {
        "year": 1900,
        "age": 90,
        "sex": 1,
        "people": 15164
    },
    {
        "year": 1900,
        "age": 90,
        "sex": 2,
        "people": 20093
    },
    {
        "year": 1910,
        "age": 0,
        "sex": 1,
        "people": 5296823
    },
    {
        "year": 1910,
        "age": 0,
        "sex": 2,
        "people": 5287477
    },
    {
        "year": 1910,
        "age": 5,
        "sex": 1,
        "people": 4991803
    },
    {
        "year": 1910,
        "age": 5,
        "sex": 2,
        "people": 4866139
    },
    {
        "year": 1910,
        "age": 10,
        "sex": 1,
        "people": 4650747
    },
    {
        "year": 1910,
        "age": 10,
        "sex": 2,
        "people": 4471887
    },
    {
        "year": 1910,
        "age": 15,
        "sex": 1,
        "people": 4566154
    },
    {
        "year": 1910,
        "age": 15,
        "sex": 2,
        "people": 4592269
    },
    {
        "year": 1910,
        "age": 20,
        "sex": 1,
        "people": 4637632
    },
    {
        "year": 1910,
        "age": 20,
        "sex": 2,
        "people": 4447683
    },
    {
        "year": 1910,
        "age": 25,
        "sex": 1,
        "people": 4257755
    },
    {
        "year": 1910,
        "age": 25,
        "sex": 2,
        "people": 3946153
    },
    {
        "year": 1910,
        "age": 30,
        "sex": 1,
        "people": 3658125
    },
    {
        "year": 1910,
        "age": 30,
        "sex": 2,
        "people": 3295220
    },
    {
        "year": 1910,
        "age": 35,
        "sex": 1,
        "people": 3427518
    },
    {
        "year": 1910,
        "age": 35,
        "sex": 2,
        "people": 3088990
    },
    {
        "year": 1910,
        "age": 40,
        "sex": 1,
        "people": 2860229
    },
    {
        "year": 1910,
        "age": 40,
        "sex": 2,
        "people": 2471267
    },
    {
        "year": 1910,
        "age": 45,
        "sex": 1,
        "people": 2363801
    },
    {
        "year": 1910,
        "age": 45,
        "sex": 2,
        "people": 2114930
    },
    {
        "year": 1910,
        "age": 50,
        "sex": 1,
        "people": 2126516
    },
    {
        "year": 1910,
        "age": 50,
        "sex": 2,
        "people": 1773592
    },
    {
        "year": 1910,
        "age": 55,
        "sex": 1,
        "people": 1508358
    },
    {
        "year": 1910,
        "age": 55,
        "sex": 2,
        "people": 1317651
    },
    {
        "year": 1910,
        "age": 60,
        "sex": 1,
        "people": 1189421
    },
    {
        "year": 1910,
        "age": 60,
        "sex": 2,
        "people": 1090697
    },
    {
        "year": 1910,
        "age": 65,
        "sex": 1,
        "people": 850159
    },
    {
        "year": 1910,
        "age": 65,
        "sex": 2,
        "people": 813868
    },
    {
        "year": 1910,
        "age": 70,
        "sex": 1,
        "people": 557936
    },
    {
        "year": 1910,
        "age": 70,
        "sex": 2,
        "people": 547623
    },
    {
        "year": 1910,
        "age": 75,
        "sex": 1,
        "people": 322679
    },
    {
        "year": 1910,
        "age": 75,
        "sex": 2,
        "people": 350900
    },
    {
        "year": 1910,
        "age": 80,
        "sex": 1,
        "people": 161715
    },
    {
        "year": 1910,
        "age": 80,
        "sex": 2,
        "people": 174315
    },
    {
        "year": 1910,
        "age": 85,
        "sex": 1,
        "people": 59699
    },
    {
        "year": 1910,
        "age": 85,
        "sex": 2,
        "people": 62725
    },
    {
        "year": 1910,
        "age": 90,
        "sex": 1,
        "people": 23929
    },
    {
        "year": 1910,
        "age": 90,
        "sex": 2,
        "people": 28965
    },
    {
        "year": 1920,
        "age": 0,
        "sex": 1,
        "people": 5934792
    },
    {
        "year": 1920,
        "age": 0,
        "sex": 2,
        "people": 5694244
    },
    {
        "year": 1920,
        "age": 5,
        "sex": 1,
        "people": 5789008
    },
    {
        "year": 1920,
        "age": 5,
        "sex": 2,
        "people": 5693960
    },
    {
        "year": 1920,
        "age": 10,
        "sex": 1,
        "people": 5401156
    },
    {
        "year": 1920,
        "age": 10,
        "sex": 2,
        "people": 5293057
    },
    {
        "year": 1920,
        "age": 15,
        "sex": 1,
        "people": 4724365
    },
    {
        "year": 1920,
        "age": 15,
        "sex": 2,
        "people": 4779936
    },
    {
        "year": 1920,
        "age": 20,
        "sex": 1,
        "people": 4549411
    },
    {
        "year": 1920,
        "age": 20,
        "sex": 2,
        "people": 4742632
    },
    {
        "year": 1920,
        "age": 25,
        "sex": 1,
        "people": 4565066
    },
    {
        "year": 1920,
        "age": 25,
        "sex": 2,
        "people": 4529382
    },
    {
        "year": 1920,
        "age": 30,
        "sex": 1,
        "people": 4110771
    },
    {
        "year": 1920,
        "age": 30,
        "sex": 2,
        "people": 3982426
    },
    {
        "year": 1920,
        "age": 35,
        "sex": 1,
        "people": 4081543
    },
    {
        "year": 1920,
        "age": 35,
        "sex": 2,
        "people": 3713810
    },
    {
        "year": 1920,
        "age": 40,
        "sex": 1,
        "people": 3321923
    },
    {
        "year": 1920,
        "age": 40,
        "sex": 2,
        "people": 3059757
    },
    {
        "year": 1920,
        "age": 45,
        "sex": 1,
        "people": 3143891
    },
    {
        "year": 1920,
        "age": 45,
        "sex": 2,
        "people": 2669089
    },
    {
        "year": 1920,
        "age": 50,
        "sex": 1,
        "people": 2546035
    },
    {
        "year": 1920,
        "age": 50,
        "sex": 2,
        "people": 2200491
    },
    {
        "year": 1920,
        "age": 55,
        "sex": 1,
        "people": 1880975
    },
    {
        "year": 1920,
        "age": 55,
        "sex": 2,
        "people": 1674672
    },
    {
        "year": 1920,
        "age": 60,
        "sex": 1,
        "people": 1587549
    },
    {
        "year": 1920,
        "age": 60,
        "sex": 2,
        "people": 1382877
    },
    {
        "year": 1920,
        "age": 65,
        "sex": 1,
        "people": 1095956
    },
    {
        "year": 1920,
        "age": 65,
        "sex": 2,
        "people": 989901
    },
    {
        "year": 1920,
        "age": 70,
        "sex": 1,
        "people": 714618
    },
    {
        "year": 1920,
        "age": 70,
        "sex": 2,
        "people": 690097
    },
    {
        "year": 1920,
        "age": 75,
        "sex": 1,
        "people": 417292
    },
    {
        "year": 1920,
        "age": 75,
        "sex": 2,
        "people": 439465
    },
    {
        "year": 1920,
        "age": 80,
        "sex": 1,
        "people": 187000
    },
    {
        "year": 1920,
        "age": 80,
        "sex": 2,
        "people": 211110
    },
    {
        "year": 1920,
        "age": 85,
        "sex": 1,
        "people": 75991
    },
    {
        "year": 1920,
        "age": 85,
        "sex": 2,
        "people": 92829
    },
    {
        "year": 1920,
        "age": 90,
        "sex": 1,
        "people": 22398
    },
    {
        "year": 1920,
        "age": 90,
        "sex": 2,
        "people": 32085
    },
    {
        "year": 1930,
        "age": 0,
        "sex": 1,
        "people": 5875250
    },
    {
        "year": 1930,
        "age": 0,
        "sex": 2,
        "people": 5662530
    },
    {
        "year": 1930,
        "age": 5,
        "sex": 1,
        "people": 6542592
    },
    {
        "year": 1930,
        "age": 5,
        "sex": 2,
        "people": 6129561
    },
    {
        "year": 1930,
        "age": 10,
        "sex": 1,
        "people": 6064820
    },
    {
        "year": 1930,
        "age": 10,
        "sex": 2,
        "people": 5986529
    },
    {
        "year": 1930,
        "age": 15,
        "sex": 1,
        "people": 5709452
    },
    {
        "year": 1930,
        "age": 15,
        "sex": 2,
        "people": 5769587
    },
    {
        "year": 1930,
        "age": 20,
        "sex": 1,
        "people": 5305992
    },
    {
        "year": 1930,
        "age": 20,
        "sex": 2,
        "people": 5565382
    },
    {
        "year": 1930,
        "age": 25,
        "sex": 1,
        "people": 4929853
    },
    {
        "year": 1930,
        "age": 25,
        "sex": 2,
        "people": 5050229
    },
    {
        "year": 1930,
        "age": 30,
        "sex": 1,
        "people": 4424408
    },
    {
        "year": 1930,
        "age": 30,
        "sex": 2,
        "people": 4455213
    },
    {
        "year": 1930,
        "age": 35,
        "sex": 1,
        "people": 4576531
    },
    {
        "year": 1930,
        "age": 35,
        "sex": 2,
        "people": 4593776
    },
    {
        "year": 1930,
        "age": 40,
        "sex": 1,
        "people": 4075139
    },
    {
        "year": 1930,
        "age": 40,
        "sex": 2,
        "people": 3754022
    },
    {
        "year": 1930,
        "age": 45,
        "sex": 1,
        "people": 3633152
    },
    {
        "year": 1930,
        "age": 45,
        "sex": 2,
        "people": 3396558
    },
    {
        "year": 1930,
        "age": 50,
        "sex": 1,
        "people": 3128108
    },
    {
        "year": 1930,
        "age": 50,
        "sex": 2,
        "people": 2809191
    },
    {
        "year": 1930,
        "age": 55,
        "sex": 1,
        "people": 2434077
    },
    {
        "year": 1930,
        "age": 55,
        "sex": 2,
        "people": 2298614
    },
    {
        "year": 1930,
        "age": 60,
        "sex": 1,
        "people": 1927564
    },
    {
        "year": 1930,
        "age": 60,
        "sex": 2,
        "people": 1783515
    },
    {
        "year": 1930,
        "age": 65,
        "sex": 1,
        "people": 1397275
    },
    {
        "year": 1930,
        "age": 65,
        "sex": 2,
        "people": 1307312
    },
    {
        "year": 1930,
        "age": 70,
        "sex": 1,
        "people": 919045
    },
    {
        "year": 1930,
        "age": 70,
        "sex": 2,
        "people": 918509
    },
    {
        "year": 1930,
        "age": 75,
        "sex": 1,
        "people": 536375
    },
    {
        "year": 1930,
        "age": 75,
        "sex": 2,
        "people": 522716
    },
    {
        "year": 1930,
        "age": 80,
        "sex": 1,
        "people": 246708
    },
    {
        "year": 1930,
        "age": 80,
        "sex": 2,
        "people": 283579
    },
    {
        "year": 1930,
        "age": 85,
        "sex": 1,
        "people": 88978
    },
    {
        "year": 1930,
        "age": 85,
        "sex": 2,
        "people": 109210
    },
    {
        "year": 1930,
        "age": 90,
        "sex": 1,
        "people": 30338
    },
    {
        "year": 1930,
        "age": 90,
        "sex": 2,
        "people": 43483
    },
    {
        "year": 1940,
        "age": 0,
        "sex": 1,
        "people": 5294628
    },
    {
        "year": 1940,
        "age": 0,
        "sex": 2,
        "people": 5124653
    },
    {
        "year": 1940,
        "age": 5,
        "sex": 1,
        "people": 5468378
    },
    {
        "year": 1940,
        "age": 5,
        "sex": 2,
        "people": 5359099
    },
    {
        "year": 1940,
        "age": 10,
        "sex": 1,
        "people": 5960416
    },
    {
        "year": 1940,
        "age": 10,
        "sex": 2,
        "people": 5868532
    },
    {
        "year": 1940,
        "age": 15,
        "sex": 1,
        "people": 6165109
    },
    {
        "year": 1940,
        "age": 15,
        "sex": 2,
        "people": 6193701
    },
    {
        "year": 1940,
        "age": 20,
        "sex": 1,
        "people": 5682414
    },
    {
        "year": 1940,
        "age": 20,
        "sex": 2,
        "people": 5896002
    },
    {
        "year": 1940,
        "age": 25,
        "sex": 1,
        "people": 5438166
    },
    {
        "year": 1940,
        "age": 25,
        "sex": 2,
        "people": 5664244
    },
    {
        "year": 1940,
        "age": 30,
        "sex": 1,
        "people": 5040048
    },
    {
        "year": 1940,
        "age": 30,
        "sex": 2,
        "people": 5171522
    },
    {
        "year": 1940,
        "age": 35,
        "sex": 1,
        "people": 4724804
    },
    {
        "year": 1940,
        "age": 35,
        "sex": 2,
        "people": 4791809
    },
    {
        "year": 1940,
        "age": 40,
        "sex": 1,
        "people": 4437392
    },
    {
        "year": 1940,
        "age": 40,
        "sex": 2,
        "people": 4394061
    },
    {
        "year": 1940,
        "age": 45,
        "sex": 1,
        "people": 4190187
    },
    {
        "year": 1940,
        "age": 45,
        "sex": 2,
        "people": 4050290
    },
    {
        "year": 1940,
        "age": 50,
        "sex": 1,
        "people": 3785735
    },
    {
        "year": 1940,
        "age": 50,
        "sex": 2,
        "people": 3488396
    },
    {
        "year": 1940,
        "age": 55,
        "sex": 1,
        "people": 2972069
    },
    {
        "year": 1940,
        "age": 55,
        "sex": 2,
        "people": 2810000
    },
    {
        "year": 1940,
        "age": 60,
        "sex": 1,
        "people": 2370232
    },
    {
        "year": 1940,
        "age": 60,
        "sex": 2,
        "people": 2317790
    },
    {
        "year": 1940,
        "age": 65,
        "sex": 1,
        "people": 1897678
    },
    {
        "year": 1940,
        "age": 65,
        "sex": 2,
        "people": 1911117
    },
    {
        "year": 1940,
        "age": 70,
        "sex": 1,
        "people": 1280023
    },
    {
        "year": 1940,
        "age": 70,
        "sex": 2,
        "people": 1287711
    },
    {
        "year": 1940,
        "age": 75,
        "sex": 1,
        "people": 713875
    },
    {
        "year": 1940,
        "age": 75,
        "sex": 2,
        "people": 764915
    },
    {
        "year": 1940,
        "age": 80,
        "sex": 1,
        "people": 359418
    },
    {
        "year": 1940,
        "age": 80,
        "sex": 2,
        "people": 414761
    },
    {
        "year": 1940,
        "age": 85,
        "sex": 1,
        "people": 127303
    },
    {
        "year": 1940,
        "age": 85,
        "sex": 2,
        "people": 152131
    },
    {
        "year": 1940,
        "age": 90,
        "sex": 1,
        "people": 42263
    },
    {
        "year": 1940,
        "age": 90,
        "sex": 2,
        "people": 58119
    },
    {
        "year": 1950,
        "age": 0,
        "sex": 1,
        "people": 8211806
    },
    {
        "year": 1950,
        "age": 0,
        "sex": 2,
        "people": 7862267
    },
    {
        "year": 1950,
        "age": 5,
        "sex": 1,
        "people": 6706601
    },
    {
        "year": 1950,
        "age": 5,
        "sex": 2,
        "people": 6450863
    },
    {
        "year": 1950,
        "age": 10,
        "sex": 1,
        "people": 5629744
    },
    {
        "year": 1950,
        "age": 10,
        "sex": 2,
        "people": 5430835
    },
    {
        "year": 1950,
        "age": 15,
        "sex": 1,
        "people": 5264129
    },
    {
        "year": 1950,
        "age": 15,
        "sex": 2,
        "people": 5288742
    },
    {
        "year": 1950,
        "age": 20,
        "sex": 1,
        "people": 5573308
    },
    {
        "year": 1950,
        "age": 20,
        "sex": 2,
        "people": 5854227
    },
    {
        "year": 1950,
        "age": 25,
        "sex": 1,
        "people": 6007254
    },
    {
        "year": 1950,
        "age": 25,
        "sex": 2,
        "people": 6317332
    },
    {
        "year": 1950,
        "age": 30,
        "sex": 1,
        "people": 5676022
    },
    {
        "year": 1950,
        "age": 30,
        "sex": 2,
        "people": 5895178
    },
    {
        "year": 1950,
        "age": 35,
        "sex": 1,
        "people": 5511364
    },
    {
        "year": 1950,
        "age": 35,
        "sex": 2,
        "people": 5696261
    },
    {
        "year": 1950,
        "age": 40,
        "sex": 1,
        "people": 5076985
    },
    {
        "year": 1950,
        "age": 40,
        "sex": 2,
        "people": 5199224
    },
    {
        "year": 1950,
        "age": 45,
        "sex": 1,
        "people": 4533177
    },
    {
        "year": 1950,
        "age": 45,
        "sex": 2,
        "people": 4595842
    },
    {
        "year": 1950,
        "age": 50,
        "sex": 1,
        "people": 4199164
    },
    {
        "year": 1950,
        "age": 50,
        "sex": 2,
        "people": 4147295
    },
    {
        "year": 1950,
        "age": 55,
        "sex": 1,
        "people": 3667351
    },
    {
        "year": 1950,
        "age": 55,
        "sex": 2,
        "people": 3595158
    },
    {
        "year": 1950,
        "age": 60,
        "sex": 1,
        "people": 3035038
    },
    {
        "year": 1950,
        "age": 60,
        "sex": 2,
        "people": 3009768
    },
    {
        "year": 1950,
        "age": 65,
        "sex": 1,
        "people": 2421234
    },
    {
        "year": 1950,
        "age": 65,
        "sex": 2,
        "people": 2548250
    },
    {
        "year": 1950,
        "age": 70,
        "sex": 1,
        "people": 1627920
    },
    {
        "year": 1950,
        "age": 70,
        "sex": 2,
        "people": 1786831
    },
    {
        "year": 1950,
        "age": 75,
        "sex": 1,
        "people": 1006530
    },
    {
        "year": 1950,
        "age": 75,
        "sex": 2,
        "people": 1148469
    },
    {
        "year": 1950,
        "age": 80,
        "sex": 1,
        "people": 511727
    },
    {
        "year": 1950,
        "age": 80,
        "sex": 2,
        "people": 637717
    },
    {
        "year": 1950,
        "age": 85,
        "sex": 1,
        "people": 182821
    },
    {
        "year": 1950,
        "age": 85,
        "sex": 2,
        "people": 242798
    },
    {
        "year": 1950,
        "age": 90,
        "sex": 1,
        "people": 54836
    },
    {
        "year": 1950,
        "age": 90,
        "sex": 2,
        "people": 90766
    },
    {
        "year": 1960,
        "age": 0,
        "sex": 1,
        "people": 10374975
    },
    {
        "year": 1960,
        "age": 0,
        "sex": 2,
        "people": 10146999
    },
    {
        "year": 1960,
        "age": 5,
        "sex": 1,
        "people": 9495503
    },
    {
        "year": 1960,
        "age": 5,
        "sex": 2,
        "people": 9250741
    },
    {
        "year": 1960,
        "age": 10,
        "sex": 1,
        "people": 8563700
    },
    {
        "year": 1960,
        "age": 10,
        "sex": 2,
        "people": 8310764
    },
    {
        "year": 1960,
        "age": 15,
        "sex": 1,
        "people": 6620902
    },
    {
        "year": 1960,
        "age": 15,
        "sex": 2,
        "people": 6617493
    },
    {
        "year": 1960,
        "age": 20,
        "sex": 1,
        "people": 5268384
    },
    {
        "year": 1960,
        "age": 20,
        "sex": 2,
        "people": 5513495
    },
    {
        "year": 1960,
        "age": 25,
        "sex": 1,
        "people": 5311805
    },
    {
        "year": 1960,
        "age": 25,
        "sex": 2,
        "people": 5548259
    },
    {
        "year": 1960,
        "age": 30,
        "sex": 1,
        "people": 5801342
    },
    {
        "year": 1960,
        "age": 30,
        "sex": 2,
        "people": 6090862
    },
    {
        "year": 1960,
        "age": 35,
        "sex": 1,
        "people": 6063063
    },
    {
        "year": 1960,
        "age": 35,
        "sex": 2,
        "people": 6431337
    },
    {
        "year": 1960,
        "age": 40,
        "sex": 1,
        "people": 5657943
    },
    {
        "year": 1960,
        "age": 40,
        "sex": 2,
        "people": 5940520
    },
    {
        "year": 1960,
        "age": 45,
        "sex": 1,
        "people": 5345658
    },
    {
        "year": 1960,
        "age": 45,
        "sex": 2,
        "people": 5516028
    },
    {
        "year": 1960,
        "age": 50,
        "sex": 1,
        "people": 4763364
    },
    {
        "year": 1960,
        "age": 50,
        "sex": 2,
        "people": 4928844
    },
    {
        "year": 1960,
        "age": 55,
        "sex": 1,
        "people": 4170581
    },
    {
        "year": 1960,
        "age": 55,
        "sex": 2,
        "people": 4402878
    },
    {
        "year": 1960,
        "age": 60,
        "sex": 1,
        "people": 3405293
    },
    {
        "year": 1960,
        "age": 60,
        "sex": 2,
        "people": 3723839
    },
    {
        "year": 1960,
        "age": 65,
        "sex": 1,
        "people": 2859371
    },
    {
        "year": 1960,
        "age": 65,
        "sex": 2,
        "people": 3268699
    },
    {
        "year": 1960,
        "age": 70,
        "sex": 1,
        "people": 2115763
    },
    {
        "year": 1960,
        "age": 70,
        "sex": 2,
        "people": 2516479
    },
    {
        "year": 1960,
        "age": 75,
        "sex": 1,
        "people": 1308913
    },
    {
        "year": 1960,
        "age": 75,
        "sex": 2,
        "people": 1641371
    },
    {
        "year": 1960,
        "age": 80,
        "sex": 1,
        "people": 619923
    },
    {
        "year": 1960,
        "age": 80,
        "sex": 2,
        "people": 856952
    },
    {
        "year": 1960,
        "age": 85,
        "sex": 1,
        "people": 253245
    },
    {
        "year": 1960,
        "age": 85,
        "sex": 2,
        "people": 384572
    },
    {
        "year": 1960,
        "age": 90,
        "sex": 1,
        "people": 75908
    },
    {
        "year": 1960,
        "age": 90,
        "sex": 2,
        "people": 135774
    },
    {
        "year": 1970,
        "age": 0,
        "sex": 1,
        "people": 8685121
    },
    {
        "year": 1970,
        "age": 0,
        "sex": 2,
        "people": 8326887
    },
    {
        "year": 1970,
        "age": 5,
        "sex": 1,
        "people": 10411131
    },
    {
        "year": 1970,
        "age": 5,
        "sex": 2,
        "people": 10003293
    },
    {
        "year": 1970,
        "age": 10,
        "sex": 1,
        "people": 10756403
    },
    {
        "year": 1970,
        "age": 10,
        "sex": 2,
        "people": 10343538
    },
    {
        "year": 1970,
        "age": 15,
        "sex": 1,
        "people": 9605399
    },
    {
        "year": 1970,
        "age": 15,
        "sex": 2,
        "people": 9414284
    },
    {
        "year": 1970,
        "age": 20,
        "sex": 1,
        "people": 7729202
    },
    {
        "year": 1970,
        "age": 20,
        "sex": 2,
        "people": 8341830
    },
    {
        "year": 1970,
        "age": 25,
        "sex": 1,
        "people": 6539301
    },
    {
        "year": 1970,
        "age": 25,
        "sex": 2,
        "people": 6903041
    },
    {
        "year": 1970,
        "age": 30,
        "sex": 1,
        "people": 5519879
    },
    {
        "year": 1970,
        "age": 30,
        "sex": 2,
        "people": 5851441
    },
    {
        "year": 1970,
        "age": 35,
        "sex": 1,
        "people": 5396732
    },
    {
        "year": 1970,
        "age": 35,
        "sex": 2,
        "people": 5708021
    },
    {
        "year": 1970,
        "age": 40,
        "sex": 1,
        "people": 5718538
    },
    {
        "year": 1970,
        "age": 40,
        "sex": 2,
        "people": 6129319
    },
    {
        "year": 1970,
        "age": 45,
        "sex": 1,
        "people": 5794120
    },
    {
        "year": 1970,
        "age": 45,
        "sex": 2,
        "people": 6198742
    },
    {
        "year": 1970,
        "age": 50,
        "sex": 1,
        "people": 5298312
    },
    {
        "year": 1970,
        "age": 50,
        "sex": 2,
        "people": 5783817
    },
    {
        "year": 1970,
        "age": 55,
        "sex": 1,
        "people": 4762911
    },
    {
        "year": 1970,
        "age": 55,
        "sex": 2,
        "people": 5222164
    },
    {
        "year": 1970,
        "age": 60,
        "sex": 1,
        "people": 4037643
    },
    {
        "year": 1970,
        "age": 60,
        "sex": 2,
        "people": 4577251
    },
    {
        "year": 1970,
        "age": 65,
        "sex": 1,
        "people": 3142606
    },
    {
        "year": 1970,
        "age": 65,
        "sex": 2,
        "people": 3894827
    },
    {
        "year": 1970,
        "age": 70,
        "sex": 1,
        "people": 2340826
    },
    {
        "year": 1970,
        "age": 70,
        "sex": 2,
        "people": 3138009
    },
    {
        "year": 1970,
        "age": 75,
        "sex": 1,
        "people": 1599269
    },
    {
        "year": 1970,
        "age": 75,
        "sex": 2,
        "people": 2293376
    },
    {
        "year": 1970,
        "age": 80,
        "sex": 1,
        "people": 886155
    },
    {
        "year": 1970,
        "age": 80,
        "sex": 2,
        "people": 1417553
    },
    {
        "year": 1970,
        "age": 85,
        "sex": 1,
        "people": 371123
    },
    {
        "year": 1970,
        "age": 85,
        "sex": 2,
        "people": 658511
    },
    {
        "year": 1970,
        "age": 90,
        "sex": 1,
        "people": 186502
    },
    {
        "year": 1970,
        "age": 90,
        "sex": 2,
        "people": 314929
    },
    {
        "year": 1980,
        "age": 0,
        "sex": 1,
        "people": 8439366
    },
    {
        "year": 1980,
        "age": 0,
        "sex": 2,
        "people": 8081854
    },
    {
        "year": 1980,
        "age": 5,
        "sex": 1,
        "people": 8680730
    },
    {
        "year": 1980,
        "age": 5,
        "sex": 2,
        "people": 8275881
    },
    {
        "year": 1980,
        "age": 10,
        "sex": 1,
        "people": 9452338
    },
    {
        "year": 1980,
        "age": 10,
        "sex": 2,
        "people": 9048483
    },
    {
        "year": 1980,
        "age": 15,
        "sex": 1,
        "people": 10698856
    },
    {
        "year": 1980,
        "age": 15,
        "sex": 2,
        "people": 10410271
    },
    {
        "year": 1980,
        "age": 20,
        "sex": 1,
        "people": 10486776
    },
    {
        "year": 1980,
        "age": 20,
        "sex": 2,
        "people": 10614947
    },
    {
        "year": 1980,
        "age": 25,
        "sex": 1,
        "people": 9624053
    },
    {
        "year": 1980,
        "age": 25,
        "sex": 2,
        "people": 9827903
    },
    {
        "year": 1980,
        "age": 30,
        "sex": 1,
        "people": 8705835
    },
    {
        "year": 1980,
        "age": 30,
        "sex": 2,
        "people": 8955225
    },
    {
        "year": 1980,
        "age": 35,
        "sex": 1,
        "people": 6852069
    },
    {
        "year": 1980,
        "age": 35,
        "sex": 2,
        "people": 7134239
    },
    {
        "year": 1980,
        "age": 40,
        "sex": 1,
        "people": 5692148
    },
    {
        "year": 1980,
        "age": 40,
        "sex": 2,
        "people": 5953910
    },
    {
        "year": 1980,
        "age": 45,
        "sex": 1,
        "people": 5342469
    },
    {
        "year": 1980,
        "age": 45,
        "sex": 2,
        "people": 5697543
    },
    {
        "year": 1980,
        "age": 50,
        "sex": 1,
        "people": 5603709
    },
    {
        "year": 1980,
        "age": 50,
        "sex": 2,
        "people": 6110117
    },
    {
        "year": 1980,
        "age": 55,
        "sex": 1,
        "people": 5485098
    },
    {
        "year": 1980,
        "age": 55,
        "sex": 2,
        "people": 6160229
    },
    {
        "year": 1980,
        "age": 60,
        "sex": 1,
        "people": 4696140
    },
    {
        "year": 1980,
        "age": 60,
        "sex": 2,
        "people": 5456885
    },
    {
        "year": 1980,
        "age": 65,
        "sex": 1,
        "people": 3893510
    },
    {
        "year": 1980,
        "age": 65,
        "sex": 2,
        "people": 4896947
    },
    {
        "year": 1980,
        "age": 70,
        "sex": 1,
        "people": 2857774
    },
    {
        "year": 1980,
        "age": 70,
        "sex": 2,
        "people": 3963441
    },
    {
        "year": 1980,
        "age": 75,
        "sex": 1,
        "people": 1840438
    },
    {
        "year": 1980,
        "age": 75,
        "sex": 2,
        "people": 2951759
    },
    {
        "year": 1980,
        "age": 80,
        "sex": 1,
        "people": 1012886
    },
    {
        "year": 1980,
        "age": 80,
        "sex": 2,
        "people": 1919292
    },
    {
        "year": 1980,
        "age": 85,
        "sex": 1,
        "people": 472338
    },
    {
        "year": 1980,
        "age": 85,
        "sex": 2,
        "people": 1023115
    },
    {
        "year": 1980,
        "age": 90,
        "sex": 1,
        "people": 204148
    },
    {
        "year": 1980,
        "age": 90,
        "sex": 2,
        "people": 499046
    },
    {
        "year": 1990,
        "age": 0,
        "sex": 1,
        "people": 9307465
    },
    {
        "year": 1990,
        "age": 0,
        "sex": 2,
        "people": 8894007
    },
    {
        "year": 1990,
        "age": 5,
        "sex": 1,
        "people": 9274732
    },
    {
        "year": 1990,
        "age": 5,
        "sex": 2,
        "people": 8799955
    },
    {
        "year": 1990,
        "age": 10,
        "sex": 1,
        "people": 8782542
    },
    {
        "year": 1990,
        "age": 10,
        "sex": 2,
        "people": 8337284
    },
    {
        "year": 1990,
        "age": 15,
        "sex": 1,
        "people": 9020572
    },
    {
        "year": 1990,
        "age": 15,
        "sex": 2,
        "people": 8590991
    },
    {
        "year": 1990,
        "age": 20,
        "sex": 1,
        "people": 9436188
    },
    {
        "year": 1990,
        "age": 20,
        "sex": 2,
        "people": 9152644
    },
    {
        "year": 1990,
        "age": 25,
        "sex": 1,
        "people": 10658027
    },
    {
        "year": 1990,
        "age": 25,
        "sex": 2,
        "people": 10587292
    },
    {
        "year": 1990,
        "age": 30,
        "sex": 1,
        "people": 11028712
    },
    {
        "year": 1990,
        "age": 30,
        "sex": 2,
        "people": 11105750
    },
    {
        "year": 1990,
        "age": 35,
        "sex": 1,
        "people": 9853933
    },
    {
        "year": 1990,
        "age": 35,
        "sex": 2,
        "people": 10038644
    },
    {
        "year": 1990,
        "age": 40,
        "sex": 1,
        "people": 8712632
    },
    {
        "year": 1990,
        "age": 40,
        "sex": 2,
        "people": 8928252
    },
    {
        "year": 1990,
        "age": 45,
        "sex": 1,
        "people": 6848082
    },
    {
        "year": 1990,
        "age": 45,
        "sex": 2,
        "people": 7115129
    },
    {
        "year": 1990,
        "age": 50,
        "sex": 1,
        "people": 5553992
    },
    {
        "year": 1990,
        "age": 50,
        "sex": 2,
        "people": 5899925
    },
    {
        "year": 1990,
        "age": 55,
        "sex": 1,
        "people": 4981670
    },
    {
        "year": 1990,
        "age": 55,
        "sex": 2,
        "people": 5460506
    },
    {
        "year": 1990,
        "age": 60,
        "sex": 1,
        "people": 4953822
    },
    {
        "year": 1990,
        "age": 60,
        "sex": 2,
        "people": 5663205
    },
    {
        "year": 1990,
        "age": 65,
        "sex": 1,
        "people": 4538398
    },
    {
        "year": 1990,
        "age": 65,
        "sex": 2,
        "people": 5594108
    },
    {
        "year": 1990,
        "age": 70,
        "sex": 1,
        "people": 3429420
    },
    {
        "year": 1990,
        "age": 70,
        "sex": 2,
        "people": 4610222
    },
    {
        "year": 1990,
        "age": 75,
        "sex": 1,
        "people": 2344932
    },
    {
        "year": 1990,
        "age": 75,
        "sex": 2,
        "people": 3723980
    },
    {
        "year": 1990,
        "age": 80,
        "sex": 1,
        "people": 1342996
    },
    {
        "year": 1990,
        "age": 80,
        "sex": 2,
        "people": 2545730
    },
    {
        "year": 1990,
        "age": 85,
        "sex": 1,
        "people": 588790
    },
    {
        "year": 1990,
        "age": 85,
        "sex": 2,
        "people": 1419494
    },
    {
        "year": 1990,
        "age": 90,
        "sex": 1,
        "people": 238459
    },
    {
        "year": 1990,
        "age": 90,
        "sex": 2,
        "people": 745146
    },
    {
        "year": 2000,
        "age": 0,
        "sex": 1,
        "people": 9735380
    },
    {
        "year": 2000,
        "age": 0,
        "sex": 2,
        "people": 9310714
    },
    {
        "year": 2000,
        "age": 5,
        "sex": 1,
        "people": 10552146
    },
    {
        "year": 2000,
        "age": 5,
        "sex": 2,
        "people": 10069564
    },
    {
        "year": 2000,
        "age": 10,
        "sex": 1,
        "people": 10563233
    },
    {
        "year": 2000,
        "age": 10,
        "sex": 2,
        "people": 10022524
    },
    {
        "year": 2000,
        "age": 15,
        "sex": 1,
        "people": 10237419
    },
    {
        "year": 2000,
        "age": 15,
        "sex": 2,
        "people": 9692669
    },
    {
        "year": 2000,
        "age": 20,
        "sex": 1,
        "people": 9731315
    },
    {
        "year": 2000,
        "age": 20,
        "sex": 2,
        "people": 9324244
    },
    {
        "year": 2000,
        "age": 25,
        "sex": 1,
        "people": 9659493
    },
    {
        "year": 2000,
        "age": 25,
        "sex": 2,
        "people": 9518507
    },
    {
        "year": 2000,
        "age": 30,
        "sex": 1,
        "people": 10205879
    },
    {
        "year": 2000,
        "age": 30,
        "sex": 2,
        "people": 10119296
    },
    {
        "year": 2000,
        "age": 35,
        "sex": 1,
        "people": 11475182
    },
    {
        "year": 2000,
        "age": 35,
        "sex": 2,
        "people": 11635647
    },
    {
        "year": 2000,
        "age": 40,
        "sex": 1,
        "people": 11320252
    },
    {
        "year": 2000,
        "age": 40,
        "sex": 2,
        "people": 11488578
    },
    {
        "year": 2000,
        "age": 45,
        "sex": 1,
        "people": 9925006
    },
    {
        "year": 2000,
        "age": 45,
        "sex": 2,
        "people": 10261253
    },
    {
        "year": 2000,
        "age": 50,
        "sex": 1,
        "people": 8507934
    },
    {
        "year": 2000,
        "age": 50,
        "sex": 2,
        "people": 8911133
    },
    {
        "year": 2000,
        "age": 55,
        "sex": 1,
        "people": 6459082
    },
    {
        "year": 2000,
        "age": 55,
        "sex": 2,
        "people": 6921268
    },
    {
        "year": 2000,
        "age": 60,
        "sex": 1,
        "people": 5123399
    },
    {
        "year": 2000,
        "age": 60,
        "sex": 2,
        "people": 5668961
    },
    {
        "year": 2000,
        "age": 65,
        "sex": 1,
        "people": 4453623
    },
    {
        "year": 2000,
        "age": 65,
        "sex": 2,
        "people": 4804784
    },
    {
        "year": 2000,
        "age": 70,
        "sex": 1,
        "people": 3792145
    },
    {
        "year": 2000,
        "age": 70,
        "sex": 2,
        "people": 5184855
    },
    {
        "year": 2000,
        "age": 75,
        "sex": 1,
        "people": 2912655
    },
    {
        "year": 2000,
        "age": 75,
        "sex": 2,
        "people": 4355644
    },
    {
        "year": 2000,
        "age": 80,
        "sex": 1,
        "people": 1902638
    },
    {
        "year": 2000,
        "age": 80,
        "sex": 2,
        "people": 3221898
    },
    {
        "year": 2000,
        "age": 85,
        "sex": 1,
        "people": 970357
    },
    {
        "year": 2000,
        "age": 85,
        "sex": 2,
        "people": 1981156
    },
    {
        "year": 2000,
        "age": 90,
        "sex": 1,
        "people": 336303
    },
    {
        "year": 2000,
        "age": 90,
        "sex": 2,
        "people": 1064581
    }
]

export const population_pyramid_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A population pyramid showing U.S. demographics from 1850 to 2000.",
    "height": 400,
    "padding": 5,
  
    "signals": [
      { "name": "chartWidth", "value": 300 },
      { "name": "chartPad", "value": 20 },
      { "name": "width", "update": "2 * chartWidth + chartPad" },
      { "name": "year", "value": 2000,
        "bind": {"input": "range", "min": 1850, "max": 2000, "step": 10} }
    ],
  
    "data": [
      {
        "name": "population",
        "values": population_data
      },
      {
        "name": "popYear",
        "source": "population",
        "transform": [
          {"type": "filter", "expr": "datum.year == year"}
        ]
      },
      {
        "name": "males",
        "source": "popYear",
        "transform": [
          {"type": "filter", "expr": "datum.sex == 1"}
        ]
      },
      {
        "name": "females",
        "source": "popYear",
        "transform": [
          {"type": "filter", "expr": "datum.sex == 2"}
        ]
      },
      {
        "name": "ageGroups",
        "source": "population",
        "transform": [
          { "type": "aggregate", "groupby": ["age"] }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "y",
        "type": "band",
        "range": [{"signal": "height"}, 0],
        "round": true,
        "domain": {"data": "ageGroups", "field": "age"}
      },
      {
        "name": "c",
        "type": "ordinal",
        "domain": [1, 2],
        "range": ["#d5855a", "#6c4e97"]
      }
    ],
  
    "marks": [
      {
        "type": "text",
        "interactive": false,
        "from": {"data": "ageGroups"},
        "encode": {
          "enter": {
            "x": {"signal": "chartWidth + chartPad / 2"},
            "y": {"scale": "y", "field": "age", "band": 0.5},
            "text": {"field": "age"},
            "baseline": {"value": "middle"},
            "align": {"value": "center"},
            "fill": {"value": "#000"}
          }
        }
      },
      {
        "type": "group",
  
        "encode": {
          "update": {
            "x": {"value": 0},
            "height": {"signal": "height"}
          }
        },
  
        "scales": [
          {
            "name": "x",
            "type": "linear",
            "range": [{"signal": "chartWidth"}, 0],
            "nice": true, "zero": true,
            "domain": {"data": "population", "field": "people"}
          }
        ],
  
        "axes": [
          {"orient": "bottom", "scale": "x", "format": "s", "title": "Females"}
        ],
  
        "marks": [
          {
            "type": "rect",
            "from": {"data": "females"},
            "encode": {
              "enter": {
                "x": {"scale": "x", "field": "people"},
                "x2": {"scale": "x", "value": 0},
                "y": {"scale": "y", "field": "age"},
                "height": {"scale": "y", "band": 1, "offset": -1},
                "fillOpacity": {"value": 0.6},
                "fill": {"scale": "c", "field": "sex"}
              }
            }
          }
        ]
      },
      {
        "type": "group",
  
        "encode": {
          "update": {
            "x": {"signal": "chartWidth + chartPad"},
            "height": {"signal": "height"}
          }
        },
  
        "scales": [
          {
            "name": "x",
            "type": "linear",
            "range": [0, {"signal": "chartWidth"}],
            "nice": true, "zero": true,
            "domain": {"data": "population", "field": "people"}
          }
        ],
  
        "axes": [
          {"orient": "bottom", "scale": "x", "format": "s", "title": "Males"}
        ],
  
        "marks": [
          {
            "type": "rect",
            "from": {"data": "males"},
            "encode": {
              "enter": {
                "x": {"scale": "x", "field": "people"},
                "x2": {"scale": "x", "value": 0},
                "y": {"scale": "y", "field": "age"},
                "height": {"scale": "y", "band": 1, "offset": -1},
                "fillOpacity": {"value": 0.6},
                "fill": {"scale": "c", "field": "sex"}
              }
            }
          }
        ]
      }
    ]
}

export const tooltip_us_county_map_spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "An example of a custom tooltip (on a map)",
    "width": 960,
    "height": 500,
    "padding": {"top": 30, "right": 120, "bottom": 100},
    "background": "white",
    "autosize": "none",
    "signals": [
      {"name": "mapCenter", "description": "Map center", "value": [-95, 38]},
      {"name": "scale", "description": "Map scale", "value": 900},
      {
        "name": "zoom",
        "description": "Map scale multiplier for the tooltip",
        "value": 3
      },
      {
        "name": "tooltipSize",
        "description": "Tooltip width/height",
        "value": 150
      },
      {
        "name": "tooltipStroke",
        "description": "Tooltip outline color",
        "value": "#BBBBBB"
      },
      {
        "name": "tooltipCountyStroke",
        "description": "Tooltip county outline color",
        "value": "#000000"
      },
      {
        "name": "tooltipFill",
        "description": "Tooltip fill color",
        "value": "#FFFFFF"
      },
      {
        "name": "tooltipTextFill",
        "description": "Tooltip text fill color",
        "value": "#000000"
      },
      {
        "name": "tooltipTextFontSize",
        "description": "Tooltip text font size",
        "value": 16
      },
      {
        "name": "tooltipFillOpacity",
        "description": "Tooltip fill opacity",
        "value": 0.7
      },
      {
        "name": "tooltipStrokeWidth",
        "description": "Tooltip outline width",
        "value": 0.5
      },
      {
        "name": "tooltipCountyStrokeWidth",
        "description": "Tooltip county outline width",
        "value": 0.5
      },
      {
        "name": "county",
        "description": "County under cursor",
        "value": null,
        "on": [
          {
            "events": "@shapeMap:pointerover",
            "update": "datum.id",
            "force": true
          },
          {"events": "@shapeMap:pointerout", "update": "null", "force": true}
        ]
      },
      {
        "name": "mousePositionXY",
        "description": "Mouse [x,y] position over the map",
        "value": [null, null],
        "on": [
          {"events": "@shapeMap:pointermove", "update": "xy()"},
          {
            "events": "@shapeMap:pointerout",
            "update": "[null, null]",
            "force": true
          }
        ]
      },
      {
        "name": "countyCentroid",
        "description": "Centroid coordinates of the county under cursor",
        "value": [null, null],
        "on": [
          {
            "events": "@shapeMap:pointermove",
            "update": "data('data-county')[0]['centroid']"
          }
        ]
      }
    ],
    "data": [
      {
        "name": "unemp",
        "url": "https://vega.github.io/vega/data/unemployment.tsv",
        "format": {"type": "tsv", "parse": "auto", "delimiter": "\t"}
      },
      {
        "name": "counties-json",
        "url": "https://vega.github.io/vega/data/us-10m.json",
        "format": {"type": "topojson", "feature": "counties"}
      },
      {
        "name": "data-counties",
        "source": ["counties-json"],
        "transform": [
          {
            "type": "formula",
            "expr": "invert('projection', geoCentroid('projection', datum))",
            "as": "centroid"
          },
          {
            "type": "lookup",
            "from": "unemp",
            "key": "id",
            "fields": ["id"],
            "values": ["rate"]
          },
          {"type": "filter", "expr": "datum.rate != null"}
        ]
      },
      {
        "name": "data-county",
        "source": "data-counties",
        "transform": [{"type": "filter", "expr": "datum.id==county"}]
      }
    ],
    "projections": [
      {
        "name": "projection",
        "type": "mercator",
        "scale": {"signal": "scale"},
        "center": [{"signal": "mapCenter[0]"}, {"signal": "mapCenter[1]"}],
        "translate": [{"signal": "width/2"}, {"signal": "height/2"}]
      },
      {
        "name": "projectionCounty",
        "type": "mercator",
        "scale": {"signal": "scale*zoom"},
        "rotate": [0, 0, 0],
        "center": [
          {"signal": "countyCentroid[0]"},
          {"signal": "countyCentroid[1]"}
        ],
        "translate": [
          {"signal": "tooltipSize/2"},
          {"signal": "tooltipSize/2*1.25"}
        ]
      }
    ],
    "scales": [
      {
        "name": "color",
        "type": "quantize",
        "domain": [0, 0.15],
        "range": {"scheme": "blues", "count": 7}
      }
    ],
    "legends": [
      {
        "fill": "color",
        "orient": "bottom-right",
        "title": "Unemployment",
        "format": "0.1%"
      }
    ],
    "marks": [
      {
        "name": "shapeMap",
        "interactive": true,
        "type": "shape",
        "from": {"data": "data-counties"},
        "encode": {"update": {"fill": {"scale": "color", "field": "rate"}}},
        "transform": [{"type": "geoshape", "projection": "projection"}]
      },
      {
        "name": "grpTooltip",
        "type": "group",
        "zindex": 1,
        "encode": {
          "enter": {
            "clip": {"signal": "true"},
            "cornerRadius": {"signal": "100"},
            "strokeWidth": {"signal": "tooltipStrokeWidth"},
            "stroke": {"signal": "tooltipStroke"},
            "fill": {"signal": "tooltipFill"},
            "fillOpacity": {"signal": "tooltipFillOpacity"}
          },
          "update": {
            "x": {"signal": "mousePositionXY[0]"},
            "y": {"signal": "mousePositionXY[1]"},
            "width": {"signal": "county==null ? 0 : tooltipSize"},
            "height": {"signal": "county==null ? 0 : tooltipSize"}
          }
        },
        "marks": [
          {
            "name": "shapeCountyInTooltip",
            "type": "shape",
            "from": {"data": "data-county"},
            "encode": {
              "enter": {
                "fill": {"scale": "color", "field": "rate"},
                "stroke": {"signal": "tooltipCountyStroke"},
                "strokeWidth": {"signal": "tooltipCountyStrokeWidth"}
              }
            },
            "transform": [{"type": "geoshape", "projection": "projectionCounty"}]
          },
          {
            "type": "text",
            "from": {"data": "shapeCountyInTooltip"},
            "encode": {
              "enter": {
                "fontSize": {"signal": "tooltipTextFontSize"},
                "fontWeight": {"value": "bold"},
                "align": {"value": "center"},
                "fill": {"signal": "tooltipTextFill"},
                "lineBreak": {"value": "/"}
              },
              "update": {
                "text": {
                  "signal": "'County '+datum.datum.id+'/'+format(datum.datum.rate, '0.1%')"
                },
                "x": {"signal": "tooltipSize/2"},
                "y": {"signal": "tooltipSize/4"}
              }
            }
          }
        ]
      }
    ]
}