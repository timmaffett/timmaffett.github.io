// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:typed_data';
import 'dart:convert';
import 'dart:math' as math;

import 'package:smart_arrays_lmfit/smart_arrays_lmfit.dart';
import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';

/// Demonstrates thes usage of this package by fitting data to a Gaussian.
main() async {
  // Define the "fit model" to which a data array should be fitted: a Gaussian
  double fitFunctionGAUSS(double x, List<double> params) {
    // amplitude, center, width, y offset:
    double a = params[0], c = params[1], w = params[2], y0 = params[3];
    final FGAUSS = 4 * math.log(2); // normalization constant
    return y0 + a * math.exp(-FGAUSS * ((x - c) / w) * ((x - c) / w));
  }

  final int NPOINTS = 50;

  // Compute "experimental data" to be fitted to a Gaussian:
  // We compute an exact Gaussian, then add some random noise to it.
  List<double> computeGaussianArray(List<double> params, double? noiseAmpl) {
    List<double> yvals = List<double>.filled(NPOINTS,0.0);
    math.Random rand = math.Random();
    for (int i = 0; i < NPOINTS; i++) {
      yvals[i] = fitFunctionGAUSS(i.toDouble(), params);
      if (noiseAmpl != null) {
        double noise = (2.0 * rand.nextDouble() - 1.0) * yvals[i] * noiseAmpl;
        yvals[i] += noise;
      }
    }
    return yvals;
  }

  double a = 100, c = 25, w = 10, y0 = 10;
  final List<double> GAUSS_PARS = [a, c, w, y0];
  List<double> expGaussian = computeGaussianArray(GAUSS_PARS, 0.1);

  // initial parameters for the fit, derived from the exact parameters
  final List<double> INITIAL_PARS = [a * 0.8, c * 0.9, w * 1.2, y0];

  // use these fitting options
  Map<String, List<String?>> fitOptions = {
    LMfit.FIT_OPT_TOLERANCE: ["1e-10"],
    LMfit.PARAM_DELTA_CONVERGE: ["0.0001"],
    LMfit.MAX_ITERATIONS: ["200"],
    LMfit.PAR_INFO: [null, null, null, "y0 fixed null null"]
  };

  // start fitting the "experimental data" to a Gaussian, wait till done
  LMfit lm = LMfit();
  Map<String, List<String?>> fitResult = await lm.lmfit(fitFunctionGAUSS, null, expGaussian, INITIAL_PARS, fitOptions);
  
  // from the fit result, compute the Gaussian fit curve
  List<double> fittedPars = [
    double.parse(fitResult[LMfit.PARAMS]?[0] ?? '-1'), // a
    double.parse(fitResult[LMfit.PARAMS]?[1] ?? '-1'), // c
    double.parse(fitResult[LMfit.PARAMS]?[2] ?? '-1'), // w
    double.parse(fitResult[LMfit.PARAMS]?[3] ?? '-1') // y0
  ];
  List<double> fittedGaussian = computeGaussianArray(fittedPars, null);

  // extract more fit results and prepare for printing
  List<String> fitResultPrintOut = [
    "exact Gaussian parameters (height, center, width, y offset)=${GAUSS_PARS}",
    "initial parameters for fit=${fitResult[LMfit.INITIAL_PARAMS]}",
    """fitted (iterated) parameters=[${fittedPars[0].toStringAsFixed(2)},
    ${fittedPars[1].toStringAsFixed(2)},
    ${fittedPars[2].toStringAsFixed(2)},
    ${fittedPars[3].toStringAsFixed(2)}]""",
    "iterations=${fitResult[LMfit.ITERATIONS]![0]}",
    "stop reason=${fitResult[LMfit.STOP_REASON]![0]}",
    "time [milliseconds]=${fitResult[LMfit.TIME]![0]}",
    "chi squared=${fitResult[LMfit.CHI2]![0]}",
    "",
    "Reload app to change the experimental points!"
  ];

  // show everything in the browser
  plot(expGaussian, fittedGaussian, fitResultPrintOut);
}

/// Displays the data computed by [main] in the browser using the
/// package 'smart_arrays_plot_polyline'.
void plot(List<double> expGaussian, List<double> fittedGaussian,
    List<String> fitResultPrintOut) {
  // get divs from 'example.html' (application and plot containers)
  DivElement appDiv = (querySelector("#app_div") as DivElement);
  DivElement plotDiv = (querySelector("#plot_div") as DivElement);

  // the plot will take all available space of [appDiv] in this example
  plotDiv.style
    ..width = "${appDiv.clientWidth}px"
    ..height = "${appDiv.clientHeight}px";

  int npoints = expGaussian.length;

  // experimental Gaussian points to be plotted as circles, not as a polyline
  List<String> pointList = [POLYLINE_POINT_SHAPE_CIRCLE_EMPTY, ""];
  for (int i = 0; i < npoints; i++) {
    pointList.add("${i}");
    pointList.add("${expGaussian[i]}");
  }

  // setup some attributes for polyline, axis and legend
  List<Map<PyA, String>> polyAttr = [
    {
      PyA.YPOSITION_ZERO: "0.85",
      PyA.POINT_LIST: json.encode(pointList),
      PyA.POINT_LIST_STROKE: "red"
    },
  ];

  Map<AxA, String> xaxisAttr = {
    AxA.PHYS_X_START: "0",
    AxA.PHYS_X_WIDTH: "${npoints}",
    AxA.LEGENDTEXT: "Number of points"
  };

  Map<AxA, String> yaxisAttr = {AxA.LEGENDTEXT: "Gaussian value"};

  Map<LegA, String> legendAttr = {
    LegA.TOP_TITLE: "Fitting a Gaussian to 'experimental' points",
    LegA.SUB_TITLES: json.encode(["Fitted curve", "Experiment"]),
    LegA.X: "45",
    LegA.Y: "15"
  };

  // plot experimental points, fittedGaussian, axes, legend into plotDiv
  SimplePlot plot = SimplePlot([Float64List.fromList(fittedGaussian)], plotDiv,
      polyAttr, xaxisAttr, yaxisAttr, legendAttr, null);

  // In a 2nd legend2, we'll display the fitResultPrintOut
  Map<LegA, String> legend2Attr = {
    LegA.TOP_TITLE: "Fit result:",
    LegA.SUB_TITLES: json.encode(fitResultPrintOut),
    LegA.TEXT_COLOR: "darkgreen",
    LegA.X: "45",
    LegA.Y: "100"
  };

  // append the fitResultPrintOut legend to the plot's data area
  Legend legend2 = SimplePlot.createLegend(legend2Attr, null)!;

  plot.pl.dataAreas[0]!.append(legend2.legendContainer);
}
