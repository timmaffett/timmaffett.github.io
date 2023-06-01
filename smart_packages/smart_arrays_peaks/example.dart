// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import 'dart:html';
import 'dart:convert';
import 'dart:typed_data';
import 'dart:math' as math;
import 'package:smart_arrays_peaks/smart_arrays_peaks.dart';
import 'package:smart_arrays_sample_data/smart_arrays_sample_data.dart';
import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';
import 'package:smart_lorentz_gauss/smart_lorentz_gauss.dart';

/// Demonstrates peak picking for 1D and 2D arrays.
/// The result is shown in the browser.
main() {
  // compute a 1D array containing a sinc function
  final double VAL0 = 100.0, NOISE = 0.01 * VAL0;
  Float64List array = Sinc1D(1000, VAL0, 0.0, 8, 0.0).array;
  // add random "noise" to simulate "experimental" data
  math.Random rand = math.Random();
  for (int i = 0; i < array.length; i++) {
    array[i] += NOISE * (2 * rand.nextDouble() - 1.0).sign;
  }

  // Pick peaks on [array], neglect "noise peaks"
  List<int> peakIndices = PeakPicker1D.detectPeaks(
      array, 0, array.length, 2 * NOISE, 0.001, PeakPicker1D.PICK_POSNEG, 0)!;

  // Compute a sample 2D matrix with a negative and a positive peak
  // (the sum of 2 Lorentzian line shapes
  List<Float64List> matrix = LorentzGaussMatrix(
          rows_cols, amplitudes, centers, lineWidths, mixingFactors)
      .matrix;

  // Pick the 2D peaks on [matrix]
  List<List<int>> peakIndices2D = PeakPicker2D().detectPeaks(
      matrix,
      0,
      matrix.length,
      0,
      matrix[0].length,
      0.0,
      0.0,
      PeakPicker1D.PICK_POSNEG,
      0);

  // show result in the browser
  plotResult(array, matrix, peakIndices, peakIndices2D, null);
}

/// The Lorentz-Gauss shape parameters
List<int> rows_cols = [200, 300];
List<double> amplitudes = [100, -150];
List<List<double>> centers = [
  [80, 100],
  [150, 200]
];
List<List<double>> lineWidths = [
  [15, 15],
  [20, 20]
];
List<List<double>> mixingFactors = [
  [0.0, 0.0],
  [0.0, 0.0]
];

/// Displays the [matrix] computed by [main] in the browser using the
/// package 'smart_arrays_plot_polyline'.
void plotResult(
    Float64List array,
    List<Float64List> matrix,
    List<int> peakIndices,
    List<List<int>> peakIndices2D,
    List<Map<MarA, String>>? markerAttrList) {
  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  // setup some polyline, axis and legend attributes
  List<Map<PyA, String>> plotAttr = [
    {PyA.YPOSITION_ZERO: "0.8"}
  ];

  // x axis labeling
  Map<AxA, String> xaxisAttr = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "${array.length}",
    AxA.LEGENDTEXT: "Number of points"
  };

  // y axis labeling
  Map<AxA, String> yaxisAttr = {AxA.LEGENDTEXT: "Function value"};

  // legend text and position
  Map<LegA, String> legendAttr = {
    LegA.TOP_TITLE: "Peak picking a noisy sinc function: " +
        "Red ticks = positive peaks, green ticks = negative peaks",
    LegA.SUB_TITLES: json.encode(["100 * sin(x) / x"]),
    LegA.X: "45",
    LegA.Y: "15"
  };

  // plot the arrays into [plotDiv]
  SimplePlot splot = SimplePlot(
      [array], plotDiv, plotAttr, xaxisAttr, yaxisAttr, legendAttr, null);

  // setup peak marker: Use peak indices and respective array values for output
  List<double> markerIndices = List<double>.filled(peakIndices.length,0.0);
  List<String> markerLabels = List<String>.filled(peakIndices.length,'');
  for (int i = 0; i < peakIndices.length; i++) {
    int ipeak = peakIndices[i];
    markerIndices[i] = ipeak.toDouble();
    markerLabels[i] = "$ipeak / ${array[ipeak].toStringAsFixed(2)}";
  }

  // draw the peak markers
  splot.polylines[0]!.drawMarkers(markerIndices, markerLabels, markerAttrList);

  List<String> peak2DPrintout = [];
  peak2DPrintout.add("Result of Lorentz-Gauss matrix peak picking");
  peak2DPrintout.add("# / row / col / value: ");
  for (int i = 0; i < peakIndices2D.length; i++) {
    int row = peakIndices2D[i][0];
    int col = peakIndices2D[i][1];

    peak2DPrintout
        .add("${i + 1} / $row / $col / ${matrix[row][col].toStringAsFixed(2)}");
  }

  Map<LegA, String> legend2Attr = {
    LegA.TOP_TITLE: "2D peak picking result:",
    LegA.SUB_TITLES: json.encode(peak2DPrintout),
    LegA.TEXT_COLOR: "darkgreen",
    LegA.X: "${splot.pl.dataAreaRects[0]!.width ~/ 3}",
    LegA.Y: "100"
  };

  // append the fitResultPrintOut legend to the plot's data area
  Legend legend2 = SimplePlot.createLegend(legend2Attr, null)!;
  splot.pl.dataAreas[0]!.append(legend2.legendContainer);
}
