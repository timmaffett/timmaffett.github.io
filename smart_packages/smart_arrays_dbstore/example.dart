import 'dart:typed_data';
import 'package:smart_arrays_dbstore/smart_arrays_dbstore.dart';

// This example demonstrates the basic use of the smart_arrays_dbstore package:
// A vector and a matrix will be stored in a database. Then the stored data will
// be loaded from the database and printed.
main() async {
  // define the base name for all databases where the datasets of this example
  // get stored. The individual db name for each dataset is constructed
  // automatically by appending a unique number to the base name.
  // Also define the name of the db containing common ("global") information
  // about the datasets.
  const DS_DB_NAME_BASE = "testdb.", DS_DB_NAME_GLOB = "testdb_glob";

  // create a dataset storage handler
  DSetStore? dsStore =
      await DSetDB.createDSetStore(DS_DB_NAME_BASE, DS_DB_NAME_GLOB);
  if (dsStore == null) {
    printError();
    return;
  }

  // in the following code, we store a vector and a matrix along with metadata
  VECTOR_METADATA["Storage Date"] = DateTime.now().toIso8601String();

  // create a dataset from VECTOR, its "imaginary" part, and its metadata
  DSet? ds1 = DSet(VECTOR, VECTOR_IMAG, VECTOR_METADATA);

  // Create a key under which [ds1] gets stored in the database.
  // The first argument is the actual dataset name, the 2nd allows one to put
  // datasets into the same or different categories ("projects"), and the 3rd
  // one is an arbitrary indicator for the type of data.
  DSKey dskey1 = DSKey("vector-1", "project-1", "spectrum-1D");
  await dsStore.dsSave(dskey1, ds1); // store [ds1] under [dskey1]

  MATRIX_METADATA["Storage Date"] = DateTime.now().toIso8601String();

  // create a dataset from MATRIX and its metadata, no "imaginary" data present
  DSet? ds2 = DSet.twoD(MATRIX, null, MATRIX_METADATA);

  // Create a key under which [ds2] gets stored in the database.
  // We store it under the category "project-2".
  DSKey dskey2 = DSKey("matrix-1", "project-2", "spectrum-2D");
  await dsStore.dsSave(dskey2, ds2); // store [ds2] under [dskey2]

  // save a a property common to [ds1] and [ds2] in the global database
  await dsStore.gpropSave(
      "Comment", "These are the stored data of 'example.dart:'");

  // now we load the data stored above and print the result.
  // create dataset storage handler for our databases
  dsStore = await DSetDB.createDSetStore(DS_DB_NAME_BASE, DS_DB_NAME_GLOB);

  print("Comment=${dsStore?.gpropGet("Comment")}");
  print("Projects defined=${dsStore?.projectsGet().keys}");

  // now load and print the datasets with their metadata
  ds1 = await dsStore?.dsLoad(dskey1);
  print("Loaded vector=${ds1?.values}");
  print("The vector's metadata=${ds1?.meta}");
  print("Imag=${(await dsStore?.dscompLoad(dskey1, DSetStore.DSC_IMAG))?[0]}");

  ds2 = await dsStore?.dsLoad(dskey2);
  print("Loaded matrix=${ds2?.values2D}");
  print("The matrix's metadata=${ds2?.meta}");
}

final Float64List VECTOR =
    Float64List.fromList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
final Float64List VECTOR_IMAG =
    Float64List.fromList([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);

Map<String, String> VECTOR_METADATA = {
  "TITLE": "VECTOR metadata",
  "ORIGIN": "Example app.",
  "Array size": "${VECTOR.length}",
};

final List<Float64List> MATRIX = [
  Float64List.fromList([1, 1, 1, 0]),
  Float64List.fromList([0, 3, 1, 2]),
  Float64List.fromList([2, 3, 1, 0]),
  Float64List.fromList([1, 0, 2, 1])
];

Map<String, String> MATRIX_METADATA = {
  "TITLE": "MATRIX metadata",
  "ORIGIN": "Example app.",
  "Number of rows": "${MATRIX.length}",
  "Number of columns": "${MATRIX[0].length}"
};

printError() {
  print("Can't open or create an 'indexeddb' database");
  print("If creation failure: perhaps browser doesn't support 'IndexedDB'.");
  print("Note: Chrome on all platforms and Safari iOS do support it.");
  print("If open failure: probably database doesn't exist.");
}
