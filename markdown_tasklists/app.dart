// Copyright (c) 2020, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:html';
import 'package:markdown/markdown.dart' as md;

import 'highlight.dart';

final markdownInput = querySelector('#markdown') as TextAreaElement;
final htmlDiv = querySelector('#html') as DivElement;
final versionSpan = querySelector('.version') as SpanElement;

final nullSanitizer = NullTreeSanitizer();
const typing = Duration(milliseconds: 150);
final introText = '''
## GFM color chips/swatches
-------------------------------------------------------
- `#F00`
- `#F00A`
- `#FF0000`
- `#FF0000AA`
- `#00ffff99`
- `RGB(0,255,0)`
- `RGB(0%,100%,0%)`
- `RGBA(0,255,0,0.3)`
- `HSL(540,70%,50%)`
- `HSLA(540,70%,50%,0.3)`

## GFM style checkbox task list
---------------------------------------------------

- [x]      Completed task
- [ ] Incomplete task
  - [ ] Sub-task 1
  - [x] Sub-task 2
  - [ ] Sub-task 3


1. [x]   Completed task
1. [ ] Incomplete task
   1. [ ] Sub-task 1
   1. [x] Sub-task 2

''';

// Flavor support.
final basicRadio = querySelector('#basic-radio') as HtmlElement;
final commonmarkRadio = querySelector('#commonmark-radio') as HtmlElement;
final gfmRadio = querySelector('#gfm-radio') as HtmlElement;
md.ExtensionSet? extensionSet;

final extensionSets = {
  'basic-radio': md.ExtensionSet.none,
  'commonmark-radio': md.ExtensionSet.commonMark,
  'gfm-radio': md.ExtensionSet.gitHubWeb,
};

void main() {
  versionSpan.text = 'v${md.version}';
  markdownInput.onKeyUp.listen(_renderMarkdown);

  final savedMarkdown = window.localStorage['markdown'];

  if (savedMarkdown != null &&
      savedMarkdown.isNotEmpty &&
      savedMarkdown != introText) {
    markdownInput.value = savedMarkdown;
    markdownInput.focus();
    _renderMarkdown();
  } else {
    _typeItOut(introText, introText.length);
  }

  // GitHub is the default extension set.
  gfmRadio.attributes['checked'] = '';
  gfmRadio.querySelector('.glyph')!.text = 'radio_button_checked';
  extensionSet = extensionSets[gfmRadio.id];
  _renderMarkdown();

  basicRadio.onClick.listen(_switchFlavor);
  commonmarkRadio.onClick.listen(_switchFlavor);
  gfmRadio.onClick.listen(_switchFlavor);
}

void _renderMarkdown([Event? event]) {
  final markdown = markdownInput.value!;

  htmlDiv.setInnerHtml(
    md.markdownToHtml(markdown, extensionSet: extensionSet),
    treeSanitizer: nullSanitizer,
  );

  for (final block in htmlDiv.querySelectorAll('pre code')) {
    try {
      highlightElement(block);
    } catch (e) {
      window.console.error('Error highlighting markdown:');
      window.console.error(e);
    }
  }

  if (event != null) {
    // Not simulated typing. Store it.
    window.localStorage['markdown'] = markdown;
  }
}

void _typeItOut(String msg, int pos) {
  late Timer timer;
  markdownInput.onKeyUp.listen((_) {
    timer.cancel();
  });
  void addCharacter() {
    if (pos > msg.length) {
      return;
    }
    markdownInput.value = msg.substring(0, pos);
    markdownInput.focus();
    _renderMarkdown();
    pos++;
    timer = Timer(typing, addCharacter);
  }

  timer = Timer(typing, addCharacter);
}

void _switchFlavor(Event e) {
  final target = e.currentTarget as HtmlElement;
  if (!target.attributes.containsKey('checked')) {
    if (basicRadio != target) {
      basicRadio.attributes.remove('checked');
      basicRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }
    if (commonmarkRadio != target) {
      commonmarkRadio.attributes.remove('checked');
      commonmarkRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }
    if (gfmRadio != target) {
      gfmRadio.attributes.remove('checked');
      gfmRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }

    target.attributes['checked'] = '';
    target.querySelector('.glyph')!.text = 'radio_button_checked';
    extensionSet = extensionSets[target.id];
    _renderMarkdown();
  }
}

class NullTreeSanitizer implements NodeTreeSanitizer {
  @override
  void sanitizeTree(Node node) {}
}
