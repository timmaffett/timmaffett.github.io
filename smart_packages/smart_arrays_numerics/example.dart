// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
import 'package:smart_arrays_numerics/smart_arrays_numerics.dart';

/// Demonstrates matrix inversion, diagonal, transpose.
main() {
  Numerics nu = Numerics();
  final List<List<double>> mat = [
    [1, 1, 1, 0],
    [0, 3, 1, 2],
    [2, 3, 1, 0],
    [1, 0, 2, 1]
  ];

  List<List<double>> inverse, identity;

  try {
    inverse = nu.invMatrix(mat); // invert
    identity = nu.dotMM(mat, inverse); // product must give identity
    print("inverse=$inverse");
    print("identity=$identity");
    print("diagonal inverse=${nu.getDiag(inverse)}");
  } catch (e) {
    print("not invertible: $mat");
  }

  final List<List<double>> mat2 = [
    [1, 1, 1],
    [0, 3, 1],
    [2, 3, 1],
    [1, 0, 2]
  ];

  List<List<double>> transposed = nu.transpose(mat2);
  print("transposed=$transposed");
  print("diagonal transposed=${nu.getDiag(transposed)}");
}
