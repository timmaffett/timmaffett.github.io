import 'dart:html';
import 'dart:typed_data';
import 'package:smart_arrays_contour_finder/smart_arrays_contour_finder.dart';
import 'package:smart_arrays_base/smart_arrays_base.dart';
import 'package:smart_lorentz_gauss/smart_lorentz_gauss.dart';
import 'package:smart_arrays_plot_polyline/smart_arrays_plot_polyline.dart';

/// Demonstrates searching for contours in a sample matrix consisting of
/// a sum of 2D Lorentz-Gauss functions with positive and negative amplitudes.
/// The result is displayed in the browser.
main() {
  // Create a sample 2D matrix to be contoured.
  LorentzGaussMatrix lg2D = LorentzGaussMatrix(
      rows_cols, amplitudes, centers, lineWidths, mixingFactors);

  // Compute equally spaced contour levels from the matrix's min/max values
  final int NLEVELS = 16;
  MinMax minmax = Array2D.getMinMax(lg2D.matrix);
  double levelDelta = (minmax.maxValue - minmax.minValue).abs() / (NLEVELS - 1);
  Float64List levels = Float64List(NLEVELS);
  for (int i = 0; i < NLEVELS; i++) {
    levels[i] = (minmax.minValue + i * levelDelta) * 0.98;
  }

  // construct a ContourFinder to find the contours and draw them using
  // the specified contour renderer
  ContourFinder contourFinder = ContourFinder(createSimpleContourRenderer());

  // Start contour search and rendering using [ContourRendererSample].
  contourFinder.findContour(
      lg2D.matrix, // search in this matrix
      0, // from this row
      lg2D.matrix.length - 1, // to this row
      0, // from this col
      lg2D.matrix[0].length - 1, // to this col
      lg2D.yRowCoordinates, // normalized row coordinates (0...1)
      lg2D.xColCoordinates, // normalized col coordinates (0...1)
      levels.length, // number of levels
      levels); // contour levels to draw
}

/// Data for the sample matrix
List<int> rows_cols = [200, 300];
List<double> amplitudes = [200.0, -160.0, 120, -150, 120, -130];
List<List<double>> centers = [
  [90, 50],
  [90, 50],
  [130, 150],
  [60, 130],
  [40, 180],
  [70, 250]
];
List<List<double>> lineWidths = [
  [15, 30],
  [40, 20],
  [50, 30],
  [15, 15],
  [30, 40],
  [40, 40]
];
List<List<double>> mixingFactors = [
  [0.0, 0.0],
  [0.0, 0.0],
  [1.0, 0.0],
  [0.0, 0.8],
  [1.0, 0.0],
  [0.5, 0.5]
];

/// A sample contour renderer drawing the contours into 2D html canvas element
/// defined in [example.html]. By default, negative contours are drawn in
/// magenta, positive ones in blue.
SimpleContourRenderer createSimpleContourRenderer() {
  /// Sets up the graphics 2D context to which drawing will be performed.
  CanvasElement contourCanvas = document.getElementById("contour_canvas")! as CanvasElement;
  contourCanvas.style
    ..position = "absolute"
    ..backgroundColor = "transparent";

  SimpleContourRenderer sctr = SimpleContourRenderer(
      contourCanvas, contourCanvas.width!,  contourCanvas.height!, 0, 0, null);
  return sctr;
}

