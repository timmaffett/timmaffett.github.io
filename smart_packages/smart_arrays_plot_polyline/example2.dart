import 'dart:html';
import 'dart:convert';
import 'dart:typed_data';

import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';
import 'package:smart_arrays_sample_data/smart_arrays_sample_data.dart';

/// Demonstrates the usage of the package 'smart_arrays_plot_polyline' for
/// the case that several plots should be places into the same browser area
/// (div element).
main() {
  // compute some arrays with a sinc, a sine and a cosine function.
  Float64List sinc = Sinc1D(1000, 100.0, 0.0, 8, 0.0).array;
  Float64List sine = Sine1D(2000, 20.0, 0.0, 8, 0.0, 0.0).array;
  Float64List cosine = Sine1D(600, 50.0, 3.1415926 / 2, 6, 0.0, 0.0).array;

  // setup array data for 3 plots
  List<List<Float64List>> dataArrays = [
    [sinc, sine], // to be contained in 1st plot
    [sinc], // to be contained in 2nd plot
    [cosine] // to be contained in 3rd plot
  ];

  // setup the attributes for each plot
  List<List<Map<PyA, String>?>?> plotAttr = List<List<Map<PyA, String>?>?>.filled(dataArrays.length,null);
  List<Map<AxA, String>?> xaxisAttr = List<Map<AxA, String>?>.filled(dataArrays.length,null),
      yaxisAttr = List<Map<AxA, String>?>.filled(dataArrays.length,null);
  List<Map<LegA, String>?> legendAttr = List<Map<LegA, String>?>.filled(dataArrays.length,null);

  plotAttr[0] = [
    {PyA.YPOSITION_ZERO: "0.8"}, // rel. y position of the value 0
    {PyA.YPOSITION_ZERO: "0.8"}
  ];

  plotAttr[1] = [
    {PyA.YPOSITION_ZERO: "0.8"}, // rel. y position of the value 0
  ];

  plotAttr[2] = [
    {
      PyA.YPOSITION_ZERO: "0.5", // rel. y position of the value 0
      PyA.YSCALE: "0.85", // don't overlap legend (make smaller)
      PyA.STROKE: "magenta"
    },
  ];

  final String GREEK_PI = '\u03C0';
  xaxisAttr[0] = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "8",
    AxA.LEGENDTEXT: "Number of periods (2*$GREEK_PI)"
  };

  xaxisAttr[1] = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "8",
    AxA.LEGENDTEXT: "Number of periods (2*$GREEK_PI)"
  };

  xaxisAttr[2] = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "600",
    AxA.LEGENDTEXT: "Number of points"
  };

  yaxisAttr[0] = {AxA.LEGENDTEXT: "Value"};
  yaxisAttr[1] = {AxA.LEGENDTEXT: "Intensity"};
  yaxisAttr[2] = {AxA.LEGENDTEXT: "Pressure"};

  legendAttr[0] = {
    LegA.TOP_TITLE: "Multi-plot (1) in same div",
    LegA.SUB_TITLES: json.encode(["100 * sin(x) / x", " 20 * sin(x)"]),
    LegA.X: "35",
    LegA.Y: "15"
  };

  legendAttr[1] = {
    LegA.TOP_TITLE: "Multi-plot (2) in same div",
    LegA.SUB_TITLES: json.encode(["100 * sin(x) / x"]),
    LegA.X: "35",
    LegA.Y: "15"
  };

  legendAttr[2] = {
    LegA.TOP_TITLE: "Multi-plot (3) in same div",
    LegA.SUB_TITLES: json.encode(["50 * cosine(x)"]),
    LegA.X: "35",
    LegA.Y: "15"
  };

  List<List<String>> poly_colors = [
    ["blue", "red"],
    ["darkred"],
    ["magenta"]
  ];

  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  // create the layout for 3 plots to be plotted into [plotDiv],
  // use the default layout attributes
  PlotLayoutSVG pl = PlotLayoutSVG.mult(
      plotDiv,
      false,
      [
        [0.0, 0.0, 0.5, 0.5],
        [0.5, 0.0, 0.5, 0.5],
        [0.1, 0.5, 0.7, 0.5],
      ],
      null);

  // append the plots to the layout
  for (int i = 0; i < dataArrays.length; i++) {
    SimplePlot.mult(dataArrays[i], plotAttr[i], xaxisAttr[i], yaxisAttr[i],
        legendAttr[i], poly_colors[i], pl, i);
  }
}
