// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import 'dart:html';
import 'dart:typed_data';
import 'dart:convert';
import 'dart:math' as math;

import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';
import 'package:smart_arrays_sample_data/smart_arrays_sample_data.dart';
import 'package:smart_signal_processing/smart_signal_processing.dart';

/// Signal processing example:
/// - Computes NPERIODS periods of a cosine shape with NPOINTS data points.
/// - Applies an exponential function, resulting in a decaying oscillation.
/// - Applies a real Fourier transform, resulting in a complex-valued line shape
///   whose real part is an absorption mode Lorentzian, and whose imaginary
///   part is a dispersion mode Lorentzian. The real part's maximum is at the
///   index defined by the number of cosine periods (NPERIODS).
/// - Plots the real and imaginary parts and the cosine in the browser.
main() {
  // Generate a cosine
  Sine1D sine1d = Sine1D(NPOINTS, 100.0, math.pi / 2, NPERIODS, 0.0, 0.0);
  Float64List reals = sine1d.array;
  Float64List imags = Float64List(reals.length); // remains zero

  // Make cosine exponentially decaying
  double decayFactor = -3.0 / (reals.length - 1);
  WinFunc.expMult(reals, decayFactor, false, "0");
  Float64List decayingCosine = Float64List.fromList(reals); // save for plotting

  // In-place transform: initially [imags] has only zeroes. After transform,
  // [reals] contains absorption mode and [imags] dispersion mode Lorentzian shape.
  FFT.transform(reals, imags);

  // Plot the result: Due to the symmetry properties of the FFT only the first
  // halfs play a role. The second halfs contain identical information
  // (corresonding to "negative frequencies"). Only half of the cosine is
  // plotted to obtain for the x axis to be valid for all 3 displayed curves.
  plotArrays([
    reals.sublist(0, reals.length ~/ 2),
    imags.sublist(0, imags.length ~/ 2),
    decayingCosine.sublist(0, decayingCosine.length ~/ 2),
  ]);
}

final int NPOINTS = 512, NPERIODS = 50;

/// Displays the [arrays] computed by [main] in the browser using the
/// package 'smart_arrays_plot_polyline'.
void plotArrays(List<Float64List> arrays) {
  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  // setup some polyline, axis and legend attributes
  List<Map<PyA, String>> plotAttr = [
    {PyA.YPOSITION_ZERO: "0.6"}, // for real part
    {PyA.YPOSITION_ZERO: "0.6"}, // the same for the imaginary part
    {PyA.YPOSITION_ZERO: "0.895", PyA.YSCALE: "5"} // scale and shift the cosine
  ];

  // x axis labeling
  Map<AxA, String> xaxisAttr = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "${arrays[0].length}", // from real part
    AxA.LEGENDTEXT: "Number of points"
  };

  // y axis labeling
  Map<AxA, String> yaxisAttr = {AxA.LEGENDTEXT: "Relative units"};

  // legend text and position
  Map<LegA, String> legendAttr = {
    LegA.TOP_TITLE:
        "Fourier Transform of a decaying cosine with $NPERIODS periods",
    LegA.SUB_TITLES: json.encode([
      "Real part after transform",
      "Imaginary part after transform",
      "Decaying cosine (first half, vertically expanded and shifted down)"
    ]),
    LegA.X: "45",
    LegA.Y: "15"
  };

  // plot the arrays into [plotDiv]
  SimplePlot(arrays, plotDiv, plotAttr, xaxisAttr, yaxisAttr, legendAttr, null);
}
