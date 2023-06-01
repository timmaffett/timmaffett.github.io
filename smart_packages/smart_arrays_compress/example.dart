// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import 'package:smart_arrays_compress/smart_arrays_compress.dart';
import 'dart:typed_data';
import 'dart:math' as math;

/// Demonstrates the usage of 1D and 2D array compression.
main() {
  math.Random rand = math.Random();

  // Example 1: compress a 1D array
  // Create a large vector with: Acending positive numbers and descending
  // negative numbers. The sign is randomly chosen.
  final int VSIZE = 16000;
  Float64List vector = Float64List(VSIZE);
  for (int i = 0; i < VSIZE; i++) {
    double randSign = (2 * rand.nextDouble() - 1.0).sign;
    vector[i] = i * randSign;
  }

  // compress the vector to 100 min/max pairs
  CompressedArray1D c1d =
      CompressedArray1D.compress(vector, 0, vector.length - 1, false, 100);

  // print the result.
  print("Result 1D: Compression interval length = ${c1d.cpdIndexIncrement}");
  print("Result 1D: cValues.length = ${c1d.cArray.length}");
  print("Result 1D: uIndices.length = ${c1d.uIndices.length}");
  print("Result 1D: cValues = ${c1d.cArray}");
  print("Result 1D: uIndices = ${c1d.uIndices}");
  print("");

  // Example 2: compress a 2D array
  // Create a large matrix with random numbers between -1 and 1.
  final int NROWS = 1234, NCOLS = 2345, NROWS_NEW = 200, NCOLS_NEW = 500;
  List<Float64List> matrix = List<Float64List>.filled(NROWS, Float64List(NCOLS));
  for (int i = 0; i < NROWS; i++) {
    Float64List row = matrix[i];

    for (int k = 0; k < NCOLS; k++) {
      row[k] = 2 * rand.nextDouble() - 1.0;
    }
  }

  // fill in some non-random values acting as minima and maxima
  matrix[30][40] = 100;
  matrix[300][400] = 150;
  matrix[303][405] = 250;
  matrix[350][450] = -150;
  matrix[1000][2000] = 200;
  matrix[1050][2100] = -300;

  // compress the matrix
  CompressedArray2D c2d = CompressedArray2D();
  c2d.compress(matrix, 0, matrix.length - 1, 0, matrix[0].length - 1, NROWS_NEW,
      NCOLS_NEW, true);

  // the result are 2 matrices containg positive (or zero) and negative (or zero)
  // values only. Print absolute values > 1, must be the same as above.
  for (int i = 0; i < c2d.cvalsPos.length; i++)
    for (int k = 0; k < c2d.cvalsPos[0].length; k++)
      if (c2d.cvalsPos[i][k] > 1)
        print("Pos. 2D: retained (row,col,val) = $i $k ${c2d.cvalsPos[i][k]}");

  for (int i = 0; i < c2d.cvalsNeg.length; i++)
    for (int k = 0; k < c2d.cvalsNeg[0].length; k++)
      if (c2d.cvalsNeg[i][k] < -1)
        print("Neg. 2D: retained (row,col,val) = $i $k ${c2d.cvalsNeg[i][k]}");
}
