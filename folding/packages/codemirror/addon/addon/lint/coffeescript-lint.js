(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){a.registerHelper("lint","coffeescript",function(b){var c=[];if(!window.coffeelint)return window.console&&window.console.error("Error: window.coffeelint not defined, CodeMirror CoffeeScript linting cannot run."),c;try{var f=coffeelint.lint(b);for(b=0;b<f.length;b++){var e=f[b],g=e.lineNumber;c.push({from:a.Pos(g-
1,0),to:a.Pos(g,0),severity:e.level,message:e.message})}}catch(d){c.push({from:a.Pos(d.location.first_line,0),to:a.Pos(d.location.last_line,d.location.last_column),severity:"error",message:d.message})}return c})});
