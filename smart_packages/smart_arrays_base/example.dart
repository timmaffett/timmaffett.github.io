// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import "dart:typed_data";
import 'package:smart_arrays_base/smart_arrays_base.dart';

main() {
  // Create a matrix whose elements have the form row.col, e.g. 120.231.
  // The number before the decimal point is the row number, the number
  // after the decimal point is the column number.
  final int NROWS = 123, NCOLS = 234;
  List<Float64List> matrix = List<Float64List>.filled(NROWS, Float64List(NCOLS));
  for (int i = 0; i < NROWS; i++) {
    Float64List row = matrix[i];
    for (int k = 0; k < NCOLS; k++) {
      row[k] = double.parse("$i.$k");
    }
  }  // once its created and filled with valid lists
  Float64List? row100 = Array2D.getRow(matrix, 101); // extract row 101
  Float64List? col100 = Array2D.getColumn(matrix, 105); // extract column 105

  // get the submatrix including rows 100-109 and columns 200-219.
  List<Float64List> sub_matrix =
      Array2D.getSubmatrix(matrix, 100, 110, 200, 220, false);

  // get the minimum and maximum in the submatrix
  MinMax minmax = Array2D.getMinMax(sub_matrix);

  // now print the results

  print("matrix row 100 = ${row100}");
  print("matrix col 100 = ${col100}");

  // print submatrix
  for (int i = 0; i < sub_matrix.length; i++) {
    Float64List row = sub_matrix[i];
    print("submatrix row $i=${row}");
  }

  // print minimum and maximum
  print("Minimum value ${minmax.minValue} occurred at submatrix row/col " +
      " ${minmax.minValueIndexRow} / ${minmax.minValueIndexCol}");
  print("Maximum value ${minmax.maxValue} occurred at submatrix row/col " +
      " ${minmax.maxValueIndexRow} / ${minmax.maxValueIndexCol}");
}
