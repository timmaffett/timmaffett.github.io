// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.
//
// To execute this example, visit the following page:
//   https://timmaffett.github.io/smart_packages/smart_dialogs/example.html

import 'package:smart_dialogs/smart_dialogs.dart';

import 'dart:html';
import 'src/examples.dart';

main() {
  ExampleDispatcher();
}

/// Displays a dialog to select and execute examples
class ExampleDispatcher {
  static List<String>? itemsChecked;
  static late DivElement app_div;

  List<String> items = [
    "Info Dialog",
    "Confirm Dialog",
    "Single-Line Input Dialog",
    "Multi-Line Input Dialog",
    "Advanced Input Dialog with Check Buttons",
    "Advanced Input Dialog with Radio Buttons",
    "Advanced Input Dialog with Radio Buttons, 2D",
    "Non-Modal Dialog",
    "System's File Selection Dialog",
    "Change Dialog Attributes",
    "Icon Panel",
    "Popup Menu",
    "Simple Table",
    "Interactive Table"
  ];

  List<Function> itemsFuncs = [
    showInfoDialog,
    showConfirmDialog,
    showSingleLineInputDialog,
    showMultiLineInputDialog,
    showAdvancedInputDialogCheckButtons,
    showAdvancedInputDialogRadioButtons,
    showAdvancedInputDialog2D,
    showNonModalDialog,
    showFileInputDialog,
    DialogAttributeChanger.changeDialogAttributes,
    showIconPanel,
    showPopupMenu,
    showSimpleTable,
    showInterActiveTable
  ];

  ExampleDispatcher() {
    showDialogExamples();
  }

  /// Shows the example options and displays the selected dialog example
  void showDialogExamples() async {
    app_div = (querySelector("#app_div") as DivElement);
    if (itemsChecked == null) {
      itemsChecked = List<String>.filled(items.length, DiaUtils.FALSE);
      itemsChecked![0] = DiaUtils.TRUE;
    }

    UserInput uin = await Info.get(
        DiaAttr.RADIO,
        "Examples for the Dart package *smart_dialogs</i>." +
            "<br>Please select an example and press OK",
        items,
        null,
        List.filled(items.length, null),
        List<int>.filled(items.length, 0),
        itemsChecked,
        true,
        null);
    if (uin.buttonCode == DiaAttr.DIA_ACT_OK) {
      itemsChecked = List<String>.filled(items.length, DiaUtils.FALSE);
      for (int i = 0; i < items.length; i++) {
        if (uin.getCheckedState(i) == DiaUtils.TRUE) {
          itemsChecked![i] = DiaUtils.TRUE;
          DiaAttr.initAttrFromDefaults();
          await itemsFuncs[i](); // execute selected example
          break;
        }
      }
    }
  }
}
