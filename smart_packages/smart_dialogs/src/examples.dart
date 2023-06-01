// Copyright (c) 2019, Dr. Bruno Guigas. All rights reserved. Use of this source
// code is governed by a BSD-style license that can be found in the LICENSE file.

/// This file conatins all examples for this package.
import 'dart:html';
import 'package:smart_dialogs/smart_dialogs.dart';
import '../main.dart';

////////////////////////////////////////////////////////////////////////////////

void showInfoDialog() async {
  await Info.show("A modal dialog displaying this *html</i> text.");
  main(); // redisplay examples
} // showInfoDialog()

////////////////////////////////////////////////////////////////////////////////

Future<void> showConfirmDialog() async {
  UserInput uin = await Info.confirm(
      "A modal ConfirmDialog.<br>" +
          "Any dialog may have multiple buttons.<br>" +
          "Please press a button.",
      ["Yes", "No", "Options"]);

  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
    await Info.show("The 'Yes' button was pressed.");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_BUT2) {
    await Info.show("The 'No' button was pressed.");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_BUT3) {
    await Info.show("The 'Options' button was pressed.");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  await showConfirmDialog(); // redisplay this dialog
} // showConfirmDialog()

////////////////////////////////////////////////////////////////////////////////

Future<void> showSingleLineInputDialog() async {
  UserInput uin = await Info.get(
      null, // no check button or radio button
      "A single-line input dialog.", // title
      ["Name:&nbsp;"], // input field label
      null, // not required because arg1 is null
      ['my-new-name'], // default new value
      [20], // width of text input field
      [''], // not required because arg1 is null
      false, // not required because single line input
      null); // null means just an OK button is shown

  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
    String? newname = uin.getUserInput(0)?[0];
    await Info.show("You entered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>'$newname'");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  await showSingleLineInputDialog(); // repeat
} // showSingleLineInputDialog()

////////////////////////////////////////////////////////////////////////////////

void showMultiLineInputDialog() async {
  UserInput uin = await Info.get(
      null, // no check button or radio button
      "A 2-lines input dialog.", // title
      ["New Name:&nbsp;", "New Extension:&nbsp;"], // input field label
      null, // not required because arg1 is null
      ["my-new-name", ".com"], // default new value
      [20, 20], // width of text input fields
      ['', ''], // not required because arg1 is null
      false, // not required because single line input
      null); // null means just an OK button is shown

  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
    String? newname = uin.getUserInput(0)?[0]; // [0]: don't expect csv input
    String? newext = uin.getUserInput(1)?[0];
    await Info.show("You entered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>" +
        "'$newname'<br>'$newext'");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  showMultiLineInputDialog(); // repeat
} // showMultiLineInputDialog()

////////////////////////////////////////////////////////////////////////////////

Future<void> showAdvancedInputDialogCheckButtons() async {
  // define combo box contents
  final String COMBO_EXP = "Exponential", COMBO_GAUS = "Gaussian";
  final List<String> COMBO_SELECTIONS = [COMBO_EXP, COMBO_GAUS];

  // count lines in dialog
  int lineCount = 0;
  final int LINE_BC = lineCount++,
      LINE_WINFUNC = lineCount++,
      LINE_EM = lineCount++,
      LINE_GM = lineCount++,
      LINE_FT = lineCount++;

  // default values of text entry fields and combo box
  final Map<int, List<String>> defPars = {
    LINE_BC: [DiaUtils.FALSE, ''],
    LINE_WINFUNC: ['true', COMBO_EXP],
    LINE_EM: ['', '0.3'],
    LINE_GM: ['', '0.5, -1.0'],
    LINE_FT: [DiaUtils.TRUE, '${16 * 1024}']
  };

  // text labels
  final List<String> labels = [
    'Baseline offset correction',
    'Window function',
    'Exponential lb[Hz]:',
    'Gaussian gb[0..1], lb[Hz]<0:',
    'Fourier transform, # real points:'
  ];

  final int IX_CBUT = 0, IX_INPUT = 1;

  // display the dialog
  UserInput uin = await Info.get(
      DiaAttr.CHECKBOX, // dialog has check buttons
      'An advanced input dialog with check buttons.', // dialog title
      labels, // text entry field labels
      [null, COMBO_SELECTIONS, null, null, null], // 1 combo box present
      [
        defPars[LINE_BC]![IX_INPUT], // default text field contents
        defPars[LINE_WINFUNC]![IX_INPUT],
        defPars[LINE_EM]![IX_INPUT],
        defPars[LINE_GM]![IX_INPUT],
        "${16 * 1024}"
      ],
      [0, 7, 7, 7, 7], // text entry field widths
      [
        defPars[LINE_BC]![IX_CBUT], // initial check button states
        defPars[LINE_WINFUNC]![IX_CBUT],
        defPars[LINE_EM]![IX_CBUT],
        defPars[LINE_GM]![IX_CBUT],
        defPars[LINE_FT]![IX_CBUT]
      ],
      false, // no alternate line coloring
      null // buttons, null means just an OK button
      );

  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_OK) {
    StringBuffer out = StringBuffer();
    out.write("Collected user input<br><br>");
    for (int i = 0; i < defPars.keys.length; i++) {
      out.write("${labels[i]}: Check button state=${uin.getCheckedState(i)}");
      out.write(", Entered value=${uin.getUserInput(i)}");
      out.write("<br>");
    }
    await Info.show("${out}");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  await showAdvancedInputDialogCheckButtons(); // repeat
} // showAdvancedInputDialogCheckButtons()

////////////////////////////////////////////////////////////////////////////////

Future<void> showAdvancedInputDialogRadioButtons() async {
  // define combo box contents
  final String COMBO_LORENTZ = "Lorentz",
      COMBO_GAUSS_LOR = "Gauss-Lorentz",
      COMBO_FIT_OPTIONS = "Fitting Options",
      COMBO_PICK_POS = "positive",
      COMBO_PICK_NEG = "negative",
      COMBO_PICK_POSNEG = "pos+neg";

  final List<String> COMBO_SELECTIONS_PEAK = [
    COMBO_PICK_POS,
    COMBO_PICK_NEG,
    COMBO_PICK_POSNEG
  ];

  final List<String> COMBO_SELECTIONS_FIT = [
    COMBO_LORENTZ,
    COMBO_GAUSS_LOR,
    COMBO_FIT_OPTIONS
  ];

  // count lines in dialog
  int dialogItemCount = 0;
  final int LINE_REMOVE = dialogItemCount++,
      LINE_AUTOPICK = dialogItemCount++,
      LINE_NOISE_FACT = dialogItemCount++,
      LINE_PEAK_SIGN = dialogItemCount++,
      LINE_FIT_PEAKS = dialogItemCount++,
      LINE_SHOW_TABLE = dialogItemCount++;

  // default values of text entry fields and combo box
  Map<int, List<String>> defPars = {
    LINE_REMOVE: ['false', ''],
    LINE_AUTOPICK: ['true', "3.14"],
    LINE_NOISE_FACT: ['false', '1.0'],
    LINE_PEAK_SIGN: ['false', COMBO_PICK_POS],
    LINE_FIT_PEAKS: ['false', COMBO_LORENTZ],
    LINE_SHOW_TABLE: ['false', ''],
  };

  // text labels
  final List<String> labels = [
    'Remove all peaks in displayed region',
    'Auto-pick displayed region above threshold:',
    'Picking sensitivity (factor of sigma SD):',
    'Sign of picked peaks',
    'Fit the picked peaks of display area',
    'Show peak table'
  ];

  final int IX_CBUT = 0, IX_INPUT = 1;

  // display the dialog
  UserInput uin = await Info.get(
      DiaAttr.RADIO, // dialog has radio buttons
      'An advanced input dialog with radio buttons.', // dialog title
      labels, // text entry field labels
      [null, null, null, COMBO_SELECTIONS_PEAK, COMBO_SELECTIONS_FIT, null],
      [
        defPars[LINE_REMOVE]![IX_INPUT], // default text field contents
        defPars[LINE_AUTOPICK]![IX_INPUT],
        defPars[LINE_NOISE_FACT]![IX_INPUT],
        defPars[LINE_PEAK_SIGN]![IX_INPUT],
        defPars[LINE_FIT_PEAKS]![IX_INPUT],
        defPars[LINE_SHOW_TABLE]![IX_INPUT]
      ],
      [0, 10, 10, 10, 10, 0], // text entry field widths
      [
        defPars[LINE_REMOVE]![IX_CBUT], // defaults of radio buttons
        defPars[LINE_AUTOPICK]![IX_CBUT],
        defPars[LINE_NOISE_FACT]![IX_CBUT],
        defPars[LINE_PEAK_SIGN]![IX_CBUT],
        defPars[LINE_FIT_PEAKS]![IX_CBUT],
        defPars[LINE_SHOW_TABLE]![IX_CBUT]
      ],
      true, // alternate line coloring
      ["Execute"] // Single button at bottom of dialog
      );

  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
    StringBuffer out = StringBuffer();
    out.write("Collected user input<br><br>");
    for (int i = 0; i < defPars.keys.length; i++) {
      out.write("${labels[i]}: Radio=${uin.getCheckedState(i)}");
      out.write(", Value=${uin.getUserInput(i)}");
      out.write("<br>");
    }
    await Info.show("${out}");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  await showAdvancedInputDialogRadioButtons(); // repeat
} // showAdvancedInputDialogRadioButtons()

////////////////////////////////////////////////////////////////////////////////

Future<void> showAdvancedInputDialog2D() async {
  final String COMBO_NO_ACTION = "No action",
      COMBO_EXP = "Exponential",
      COMBO_GAUS = "Gaussian",
      COMBO_FT_COMPLEX = "Complex";

  final List<String> COMBO_SELECTIONS_WIN = [
    InputDialog.ENABLE_TEXTINPUT_COMBO + COMBO_NO_ACTION,
    COMBO_EXP,
    COMBO_GAUS
  ];
  final List<String> COMBO_SELECTIONS_FT = [COMBO_NO_ACTION, COMBO_FT_COMPLEX];

  int lineCount = 0;
  final int LINE_BC = lineCount++,
      LINE_WINFUNC = lineCount++,
      LINE_EM = lineCount++,
      LINE_GM = lineCount++,
      LINE_FT_TYPE = lineCount++,
      LINE_FTSIZE = lineCount++;

  // default values for text entry fields, column 1
  Map<int, List<String>> defPars = {
    LINE_BC: ['false', ''],
    LINE_WINFUNC: ['true', COMBO_EXP],
    LINE_EM: ['', '0.3'],
    LINE_GM: ['', '0.5, -1.0'],
    LINE_FT_TYPE: ['true', COMBO_FT_COMPLEX],
    LINE_FTSIZE: ['', '']
  };

  // default values for text entry fields, column 2
  Map<int, List<String>> defParsCol2 = {
    LINE_BC: ['false', ''],
    LINE_WINFUNC: ['true', COMBO_GAUS],
    LINE_EM: ['', '0.5'],
    LINE_GM: ['', '0.1, -1.0'],
    LINE_FT_TYPE: ['true', COMBO_FT_COMPLEX],
    LINE_FTSIZE: ['', '']
  };

  // text labels
  final List<String> labels = [
    'Baseline offset correction',
    'Window function',
    'Exponential lb[Hz]:',
    'Gaussian gb[0..1], lb[Hz]<0:',
    'Fourier transform type',
    'Fourier transform, # real points:'
  ];

  final int IX_CBOX = 0, IX_INPUT = 1;

  // display the 2D dialog
  UserInput uin = await Info.get2D(
      DiaAttr.CHECKBOX,
      "Advanced input dialog with 2 input columns, e.g. for 2D data processing",
      labels, // text entry field labels
      {
        InputDialog.COL1: [
          null, // define combo boxes for col 1 (null = none in this line)
          COMBO_SELECTIONS_WIN,
          null,
          null,
          COMBO_SELECTIONS_FT,
          null
        ],
        InputDialog.COL2: [
          null, // define combo boxes for col 2 (null = none in this line)
          COMBO_SELECTIONS_WIN,
          null,
          null,
          COMBO_SELECTIONS_FT,
          null
        ]
      },
      {
        InputDialog.COL1: [
          defPars[LINE_BC]![IX_INPUT], // default text field contents, col 1
          defPars[LINE_WINFUNC]![IX_INPUT],
          defPars[LINE_EM]![IX_INPUT],
          defPars[LINE_GM]![IX_INPUT],
          defPars[LINE_FT_TYPE]![IX_INPUT],
          "${4 * 1024}"
        ],
        InputDialog.COL2: [
          defParsCol2[LINE_BC]![IX_INPUT], // default text field contents, col 2
          defParsCol2[LINE_WINFUNC]![IX_INPUT],
          defParsCol2[LINE_EM]![IX_INPUT],
          defParsCol2[LINE_GM]![IX_INPUT],
          defPars[LINE_FT_TYPE]![IX_INPUT],
          "512"
        ]
      },
      [0, 7, 7, 7, 7, 7], // text field widths
      [
        defPars[LINE_BC]![IX_CBOX], // default radio button states
        defPars[LINE_WINFUNC]![IX_CBOX],
        defPars[LINE_EM]![IX_CBOX],
        defPars[LINE_GM]![IX_CBOX],
        defPars[LINE_FT_TYPE]![IX_CBOX],
        defPars[LINE_FTSIZE]![IX_CBOX]
      ],
      false, // no alternating line color
      null); // null = just an OK button is displayed

  // Result format: check button, COL1 values, COL2 values
  //  The first half of the non-check button value list constitue the COL1 values,
  //  The second half the COL2 values.
  //  {0: [false, null, null],
  //  1: [true, Exponential, Gaussian],
  //  2: [null, 0.3, 0.3], 3: [null, 0.5, -1.0, 0.1, -1.0],
  //  4: [true, 2048, 256]}
  // evaluate buttons pressed
  if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
    StringBuffer out = StringBuffer();
    out.write("Collected user input<br><br>");
    for (int i = 0; i < defPars.keys.length; i++) {
      String? val_checked = uin.getCheckedState(i);
      int nvals = uin.getUserInput(i)?.length??0 ~/ 2; // cvs per column
      List<String?>? vals_col1 = uin.getUserInput(i)?.sublist(0, nvals);
      List<String?>? vals_col2 = uin.getUserInput(i)?.sublist(nvals);

      out.write("${labels[i]}: Radio=${val_checked}");
      out.write(", Col1=${vals_col1}");
      out.write(", Col2=${vals_col2}");
      out.write("<br>");
    }
    await Info.show("${out}");
  } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
    return;
  }
  await showAdvancedInputDialog2D(); // repeat
} // showAdvancedInputDialog2D()

////////////////////////////////////////////////////////////////////////////////

void showNonModalDialog() {
  final RED = '<span style="color:red">';
  void closeCallback(UserInput results) {
    Info.show('${RED}Non-modal dialog closed.');
  }

  showAdvancedInputDialog2D(); // first show a modal dialog
  String? buttontype;
  String htmlTitleText = '${RED}' +
      'This is a non-modal dialog displayed in addition to a modal one.' +
      'You can still work inside the modal dialog';

  // show the non-modal one with trivial parameters
  List<String>? inputTextLabelInfo;
  List<int>? sizes;
  List<String>? isChecked;
  bool alternateRowColor = false;
  List<String> buttonLabels = []; // don't show any buttons at bottom
  InputDialog.noModal(buttontype, htmlTitleText, inputTextLabelInfo, null, null,
      sizes, isChecked, closeCallback, alternateRowColor, buttonLabels);
} // showNonModalDialog()

////////////////////////////////////////////////////////////////////////////////

class DialogAttributeChanger {
  static Map<String, String>? dia_attr_saved, but_attr_saved;

  static changeDialogAttributes() async {
    void change() {
      Map<String, String> myAttr = {
        DiaAttr.DIALOG_TEXT_FONTSIZE: "14",
        DiaAttr.DIALOG_HEADER_COLOR: "Brown",
        DiaAttr.DIALOG_HEADER_FONTSIZE: "20",
        DiaAttr.DIALOG_BACKGROUND: "orange",
        DiaAttr.DIALOG_BORDER_RADIUS: "0"
      };
      DiaAttr.setAttr(myAttr);

      Map<String, String> myButAttr = {
        ActButton.BUT_BACKGROUND: "DarkBlue",
        ActButton.BUT_OPACITY_LEAVE: "0.7",
        ActButton.BUT_COLOR: "yellow",
        ActButton.BUT_BORDER_RADIUS: "0px"
      };
      ActButton.setAttr(myButAttr);
    }

    void reset() {
      DiaAttr.setAttr(Map.from(dia_attr_saved ?? {}));
      ActButton.setAttr(Map.from(but_attr_saved ?? {}));
    }

    // first save the default attributes
    if (dia_attr_saved == null) {
      dia_attr_saved = Map.from(DiaAttr.attr);
    }

    if (but_attr_saved == null) {
      but_attr_saved = Map.from(ActButton.but_attr ?? {});
    }

    // open the example dialog
    UserInput uin = await Info.confirm(
        "This example illustrates how to change some dialog attributes." +
            "<br>Please press a button.",
        ["Change", "Reset", "Help"]);

    // evaluate buttons pressed: change or reset attributes, or a help message
    if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
      change();
      changeDialogAttributes();
    } else if (uin.buttonCode == DiaAttr.DIA_ACT_BUT2) {
      reset();
      changeDialogAttributes();
    } else if (uin.buttonCode == DiaAttr.DIA_ACT_BUT3) {
      await Info.show(
          "The available dialog attributes are defined in the file<br>'dia_attr.dart'." +
              "<br>The action button attributes are defined in<br>'dia_button.dart'.");
      changeDialogAttributes();
    } else if (uin.buttonCode == DiaAttr.DIA_ACT_ABORT) {
      reset();
      main(); // redisplay examples
    }
  } // changeDialogAttributes()
} // DialogAttributeChanger

////////////////////////////////////////////////////////////////////////////////

showIconPanel() async {
  final int iconSize = 20; // show icons in panel inthis size
  final int NCOLS = 3; // this many icons per row
  final int iconPadding = 5; // distance between icons
  final String ICON_PATH = "icons"; // subdir of where example.html is

  // show these icons in this order
  final List<String> iconList = [
    "asterisk-D8F0E3-24.png",
    "divide-D8F0E3-24.png",
    "vreset-D8F0E3-24.png",
    "exactzoom-D8F0E3-24.png",
    "axis-white-24.png",
    "info-white-24.png"
  ];

  IconPanel? iconPanel;
  List<IconCallback> getIconCallbacks() {
    void out(String iconName) async {
      UserInput uin = await Info.confirm(
          "'$iconName' icon pressed!" +
              "<br>Hit 'Close' to close the icon panel.",
          ["Close"]);
      if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) iconPanel?.close(null);
    }

    void asteriskCallback(UIEvent e) {
      out("asterisk");
    }

    void divideCallback(UIEvent e) {
      out("divide");
    }

    void vresetCallback(UIEvent e) {
      out("vreset");
    }

    void exactZoomCallback(UIEvent e) {
      out("exactzoom");
    }

    void axisCallback(UIEvent e) {
      out("axis");
    }

    void infoCallback(UIEvent e) {
      out("info");
    }

    List<IconCallback> iconCallbacks;
    // 2D
    iconCallbacks = [
      asteriskCallback,
      divideCallback,
      vresetCallback,
      exactZoomCallback,
      axisCallback,
      infoCallback
    ];
    assert(iconCallbacks.length == iconList.length);
    return iconCallbacks;
  }

  // Called when icon panel closed
  void closeCallback(UserInput results) {
    main(); // redisplay examples
  }

  int panelWidth = NCOLS * (iconSize + iconPadding) + 8;
  // place panel here
  int x = 100;
  int y = 20;
  DivElement iconParent = ExampleDispatcher.app_div;

  // create panel
  iconPanel = IconPanel(iconParent, "example panel", ICON_PATH, iconList,
      getIconCallbacks, closeCallback, x, y, panelWidth, iconSize, NCOLS, true);
} // showIconPanel()

////////////////////////////////////////////////////////////////////////////////

showFileInputDialog() async {
  // Called when user selected 1 or more files in the system's file dialog,
  // but not of the user cancelled it.
  void fileInputCallback(List<File>? fileList) async {
    final RED = '<span style="color:red">';
    if (fileList == null) {
      // no system file dialog was displayed
      main(); // redisplay examples
      return;
    }

    int nselected = fileList.length;
    StringBuffer out = StringBuffer();
    for (int i = 0; i < nselected; i++) {
      out.write(fileList[i].name + "<br>");
    }

    final String MSG1 = "You selected the following ${fileList.length} files";
    final String MSG2 = "You selected the following file";
    String msg = MSG1;
    if (fileList.length == 1) msg = MSG2;
    UserInput uin = await Info.confirm(
        "$msg:<br>" +
            "$RED${out}</span>" +
            "<br>Hit 'OK' to re-open the file dialog.",
        ["OK"]);

    if (uin.buttonCode == DiaAttr.DIA_ACT_BUT1) {
      showFileInputDialog();
    } else {
      main(); // redisplay examples
    }
  }

  FileSelectionDialog(
      "A dialog providing access to the system's file selection dialog. " +
          "Press the button below.",
      fileInputCallback);
} // showFileInputDialog()

////////////////////////////////////////////////////////////////////////////////

void showPopupMenu() async {
  final String RED = '<span style="color:red">';
  final String TITLE = "TITLE";

  // define the text rows displayed in the popups
  final String TEXT_1 = "Popup Item 1",
      TEXT_2 = "Popup Item 2 (disabled)",
      TEXT_3 = "Popup Item 3",
      TEXT_4 = "Popup Item 4";

  // define the action codes for the popup rows
  final String ACTION_1 = "ACTION_1",
      ACTION_2 = "ACTION_2",
      ACTION_3 = "ACTION_3",
      ACTION_4 = "ACTION_4";

  // define the popup contents: text and actions
  final List<String> POPUP_ITEMS = [
    "${RED}Example Popup${DiaUtils.SEP_STAN}$TITLE",
    "$TEXT_1${DiaUtils.SEP_STAN}$ACTION_1",
    "${PopupMenu.POPUP_SPAN_GREYOUT}$TEXT_2${PopupMenu.POPUP_SPAN_END}${DiaUtils.SEP_STAN}$ACTION_2",
    "$TEXT_3${DiaUtils.SEP_STAN}$ACTION_3",
    "$TEXT_4${DiaUtils.SEP_STAN}$ACTION_4"
  ];

  final int size = POPUP_ITEMS.length;
  List<String> button_types = List<String>.filled(size,'');
  List<String> is_checked = List<String>.filled(size,'');

  // last popup item gets displayed with a "checked" checkbox.
  button_types[size - 1] = DiaAttr.CHECKBOX;
  is_checked[size - 1] = DiaUtils.TRUE;

  // define the popup location
  int x = 100;
  int y = 20;
  DivElement popupParent = ExampleDispatcher.app_div;

  // create an show the popup
  UserInput ui = await PopupMenu.show(
      popupParent, "", POPUP_ITEMS, button_types, is_checked, x, y, true);
  String popupAction = ui.buttonCode;
  UserInput? cui;
  for (String item in POPUP_ITEMS) {
    List<String> textAct = item.split(DiaUtils.SEP_STAN);
    String itemText = textAct[0];
    String actionCode = textAct[1];
    if (actionCode == TITLE) continue; // TITLE item
    if (popupAction == actionCode) {
      cui = await Info.confirm("${itemText}<br>was selected.", ["Close"]);
      break;
    }
  }

  if (cui?.buttonCode == DiaAttr.DIA_ACT_ABORT) {
    main(); // redisplay examples
  } else {
    showPopupMenu();
  }
} // showPopupMenu()

////////////////////////////////////////////////////////////////////////////////

void showSimpleTable() {
  // table closed
  void closeCallback(UserInput userInput) async {
    main(); // redisplay examples
  }

  // [tableData] is the contents of table, however the cells [0][i] are not displayed
  // but reserved for arbitrary information to be used elsewhere.
  // In this exammple this cell[0][0] is displayed before the table in the dialog
  // containg the table.
  List<List<String>> tableData = ExampleData.TABLEDATA_SIMPLE;

  // create the table and append it to the dialog.
  BasicTable btable = BasicTable(tableData, null);

  // Show an Info dialog with tableData[0][0] as a header text.
  // The width of the header defines the width of the dialog.
  // Default header alignmanet is "center", we want "left".
  DiaAttr.setAttr({DiaAttr.DIALOG_HEADER_TEXTALIGN: "left"});
  InfoDialog infdia = InfoDialog(tableData[0][0], closeCallback);
  infdia.dia.style.marginTop = "5px"; // place dia near top of screen
  infdia.dia.append(btable.getTable);
} // showSimpleTable()

////////////////////////////////////////////////////////////////////////////////

void showInterActiveTable() {
  late BasicTable btable;
  // table closed
  void closeCallback(UserInput userInput) async {
    main(); // redisplay examples
  }

  // called when a table button clicked:
  // finds out which button was clicked and what the user entered into the
  // text entry fields.
  void tableButtonClickListener(ButtonElement button) {
    TableElement table = btable.getTable; // the displayed table element
    TableRowElement row;
    dynamic inputField; // expected in our case: TextAreaElement or InputElement
    StringBuffer userInput = StringBuffer();
    userInput.write("Contents of text entry fields:<br>");

    String newValue='';
    final int TF_COL = 3; // only this column contains text fields
    // find the text entry fields in the table and collect their contents
    for (int i = 1; i < table.rows.length; i++) {
      row = table.rows[i];
      // try for a single-line text 'input' field, or 'textarea'
      // (depends on how table was constructed)
      inputField = row.cells[TF_COL].querySelector('input');
      if (inputField == null) {
        inputField = row.cells[TF_COL].querySelector('textarea');
      }

      if (inputField != null) {
        // InputElement or TextAreaElement found, get entered value
        newValue = inputField.value;
        if (newValue.isNotEmpty) {
          userInput.write("row $i: value=${newValue}<br>");
        }
      }
    }
    // print collected input
    if (newValue.isEmpty) userInput.write("Nothing entered.");
    Info.show("You clicked the button with id = ${button.id}<br>${userInput}");
  }

  // [padding] defines width of dialog containing table, and therefore also
  // the width of the table.
  String padding = '';
  for (int i = 0; i < 100; i++) {
    padding += '&nbsp;';
  }

  List<List<String>> tableData = ExampleData.TABLEDATA_INTERACTIVE;
  btable = BasicTable(tableData, tableButtonClickListener);

  String extraInfo = tableData[0][0] + padding; // use as dialog header
  InfoDialog infdia = InfoDialog(extraInfo, closeCallback);
  infdia.dia.style.marginTop = "5px"; // place dia near top of screen

  infdia.dia.append(btable.getTable);
} // showInterActiveTable()

///////////////////////////////////////////////////////////////////////////////

/// Example data for table display
class ExampleData {
  /// Table data for showSimpleTable()
  static final List<List<String>> TABLEDATA_SIMPLE = [
    [
      'Peak table for data set: <span style="color:rgb(52,120,188)">a-ionon-predict-1H-assigned / 1D</span><br>Date and local time: <span style="color:rgb(52,120,188)">2019-02-27 10:33:44.198362</span><br>Picking threshold (w.r.t. file / normalized intensities): <span style="color:rgb(52,120,188)">17894557.73779 / 3.33997</span><br>Intensity Normalization Factor: <span style="color:rgb(52,120,188)">100.0</span><br>Frequency at 0 ppm [Mhz]: <span style="color:rgb(52,120,188)">400</span><br>Software: <span style="color:rgb(52,120,188)">smart_dialogs 1.0. <br>',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ],
    [
      '',
      '#',
      'Index',
      'ppm',
      'Hz',
      'ΔHz',
      'Intensity<br>(file)',
      'Intensity<br>(normalized)'
    ],
    [
      '',
      '1',
      '6098.3',
      '6.90606',
      '2762.42309',
      '-',
      '21148859.40625',
      '3.91259'
    ],
    [
      '',
      '2',
      '6117.6',
      '6.89307',
      '2757.22992',
      '5.19317',
      '20711549.46875',
      '3.83169'
    ],
    [
      '',
      '3',
      '6157.0',
      '6.86660',
      '2746.63858',
      '10.59134',
      '24617763.18750',
      '4.55434'
    ],
    [
      '',
      '4',
      '6176.2',
      '6.85375',
      '2741.49891',
      '5.13968',
      '23990366.50000',
      '4.43827'
    ],
    [
      '',
      '5',
      '7287.6',
      '6.10751',
      '2443.00444',
      '298.49447',
      '45221782.62500',
      '8.36614'
    ],
    [
      '',
      '6',
      '7346.2',
      '6.06820',
      '2427.28028',
      '15.72416',
      '42454406.00000',
      '7.85416'
    ]
  ];

///////////////////////////////////////////////////////////////////////////////

  /// Table data for showInterActiveTable()
  static final List<List<String>> TABLEDATA_INTERACTIVE = [
    [
      'User Preferences <span style="font-weight:normal">',
      '',
      '',
      '',
      '',
    ],
    [
      '',
      'Item',
      'Default Value',
      'Current Value',
      'New value',
    ],
    [
      '',
      '<span style="font-weight:bold">Peak Picking',
      '',
      '',
      'BUTTON||Reset all values<br><span style="color:red">(Button 1)||B1',
    ],
    [
      '',
      'Peak label font size',
      '12',
      '14',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      'Peak label color',
      'DarkRed',
      'Blue',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      '<span style="font-weight:bold">Sidebar',
      '',
      '',
      'BUTTON||Apply New Values<br><span style="color:red">(Button 2)||B2',
    ],
    [
      '',
      'Sidebar Width',
      '0.25',
      '0.25',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      'Font size',
      '14',
      '16',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      'Cell height',
      '25px',
      '25px',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      '<span style="font-weight:bold">Dialogs',
      '',
      '',
      'BUTTON||Apply New Values<br><span style="color:red">(Button 3)||B3',
    ],
    [
      '',
      'Text font size',
      '16',
      '16',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      'Buttons font size',
      '14',
      '12',
      'EMPTY_INPUT_CELL',
    ],
    [
      '',
      'Dialog header text',
      '',
      '',
      'EMPTY_TEXT_AREA',
    ]
  ];

///////////////////////////////////////////////////////////////////////////////
} // ExampleData
