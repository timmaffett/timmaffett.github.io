import 'dart:html';
import 'dart:convert';

import 'package:smart_arrays_sample_data/smart_arrays_sample_data.dart';
import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';

/// Demonstrates the usage of the package 'smart_arrays_sample_data' by
/// computing and displaying two arrays (containing some periods of sin(x)
/// and a sin(x)/x).
main() {
  // compute 2 arrays with a sinc and a sine function, to be displayed later
  Sinc1D sinc1d = Sinc1D(1000, 100.0, 0.0, 8, 0.0);
  Sine1D sine1d = Sine1D(2000, 20.0, 0.0, 8, 0.0, 0.0);

  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  // setup some polyline, axis and legend attributes
  List<Map<PyA, String>> plotAttr = [
    {PyA.YPOSITION_ZERO: "0.8"}, // rel. y position of the value 0
    {PyA.YPOSITION_ZERO: "0.8"}
  ];

  final String GREEK_PI = '\u03C0';
  Map<AxA, String> xaxisAttr = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "8",
    AxA.LEGENDTEXT: "Number of periods (2*$GREEK_PI)"
  };

  Map<AxA, String> yaxisAttr = {AxA.LEGENDTEXT: "Function value ('intensity')"};
  Map<LegA, String> legendAttr = {
    LegA.TOP_TITLE: "Displays some arrays computed by 'smart_arrays_sample_data'",
    LegA.SUB_TITLES: json.encode(["100 * sin(x) / x", " 20 * sin(x)"]),
    LegA.X: "45",
    LegA.Y: "15"
  };

  // plot the arrays into [plotDiv]
  SimplePlot([sinc1d.array, sine1d.array], plotDiv, plotAttr, xaxisAttr,
      yaxisAttr, legendAttr, null);
}
