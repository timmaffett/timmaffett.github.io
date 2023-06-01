// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import 'dart:typed_data';
import 'dart:html';
import 'dart:convert';

import 'package:smart_lorentz_gauss/smart_lorentz_gauss.dart';
import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';

/// Creates three arrays containing a Lorentzian, a Gaussian and a mixed
/// line shape. The resulting curves are displayed in the browser.
main() {
  final int NPOINTS = 200; // array length
  List<double> height = [100, 100, 100], // function value of line shape maxima
      center = [120, 120, 120], // the maxima should be at this array position
      width = [15, 15, 15]; // width at half height of maximum (points)
  Float64List lor_array = Float64List(NPOINTS), // array for the Lorentzian
      gaus_array = Float64List(NPOINTS), // array for the Gaussian
      mixed_array = Float64List(NPOINTS); // array for the mixed shape

  // construct 3 line shapes, 100% Lorentzian, 100% Gaussian, mixed 50% / 50%
  LorentzGauss lor =
          LorentzGauss.fromPars(height[0], [center[0]], [width[0]], [0.0]),
      gaus = LorentzGauss.fromPars(height[1], [center[1]], [width[1]], [1.0]),
      mixed = LorentzGauss.fromPars(height[1], [center[1]], [width[1]], [0.5]);

  // fill arrays with line shape values
  for (int k = 0; k < NPOINTS; k++) {
    lor_array[k] = lor.getValueAt([k.toDouble()]);
    gaus_array[k] = gaus.getValueAt([k.toDouble()]);
    mixed_array[k] = mixed.getValueAt([k.toDouble()]);
  }

  plotResult(
      [lor_array, gaus_array, mixed_array]); // show computed arrays in browser
}

/// Displays the [arrays] computed by [main] in the browser using the
/// package 'smart_arrays_plot_polyline'.
void plotResult(List<Float64List> arrays) {
  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  // setup some polyline, axis and legend attributes
  List<Map<PyA, String>> plotAttr = [
    {PyA.YPOSITION_ZERO: "0.8"}, // rel. y position of the shape value 0
    {PyA.YPOSITION_ZERO: "0.8"},
    {PyA.YPOSITION_ZERO: "0.8"}
  ];

  // x axis labeling
  Map<AxA, String> xaxisAttr = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "200",
    AxA.LEGENDTEXT: "Number of points"
  };

  // y axis labeling
  Map<AxA, String> yaxisAttr = {AxA.LEGENDTEXT: "Function value"};

  // legend text and position
  Map<LegA, String> legendAttr = {
    LegA.TOP_TITLE: "Lorentz / Gauss line shapes",
    LegA.SUB_TITLES:
        json.encode(["Pure Lorentzian", " Pure Gaussian", " Mixed 50% / 50%"]),
    LegA.X: "45",
    LegA.Y: "15"
  };

  // plot the arrays into [plotDiv]
  SimplePlot(arrays, plotDiv, plotAttr, xaxisAttr, yaxisAttr, legendAttr, null);
}
