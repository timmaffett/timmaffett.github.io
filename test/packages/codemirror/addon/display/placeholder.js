(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){function f(a){a.state.placeholder&&(a.state.placeholder.parentNode.removeChild(a.state.placeholder),a.state.placeholder=null)}function g(a){f(a);var b=a.state.placeholder=document.createElement("pre");b.style.cssText="height: 0; overflow: visible";b.style.direction=a.getOption("direction");b.className=
"CodeMirror-placeholder CodeMirror-line-like";var c=a.getOption("placeholder");"string"==typeof c&&(c=document.createTextNode(c));b.appendChild(c);a.display.lineSpace.insertBefore(b,a.display.lineSpace.firstChild)}function l(a){setTimeout(function(){var b=!1;1==a.lineCount()&&(b=a.getInputField(),b="TEXTAREA"==b.nodeName?!a.getLine(0).length:!/[^\u200b]/.test(b.querySelector(".CodeMirror-line").textContent));b?g(a):f(a)},20)}function h(a){k(a)&&g(a)}function e(a){var b=a.getWrapperElement(),c=k(a);
b.className=b.className.replace(" CodeMirror-empty","")+(c?" CodeMirror-empty":"");c?g(a):f(a)}function k(a){return 1===a.lineCount()&&""===a.getLine(0)}d.defineOption("placeholder","",function(a,b,c){c=c&&c!=d.Init;b&&!c?(a.on("blur",h),a.on("change",e),a.on("swapDoc",e),d.on(a.getInputField(),"compositionupdate",a.state.placeholderCompose=function(){l(a)}),e(a)):!b&&c&&(a.off("blur",h),a.off("change",e),a.off("swapDoc",e),d.off(a.getInputField(),"compositionupdate",a.state.placeholderCompose),f(a),
c=a.getWrapperElement(),c.className=c.className.replace(" CodeMirror-empty",""));b&&!a.hasFocus()&&h(a)})});