(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("oz",function(k){function g(a){return new RegExp("^(("+a.join(")|(")+"))\\b")}function e(a,b){if(a.eatSpace())return null;if(a.match(/[{}]/))return"bracket";if(a.match("[]"))return"keyword";if(a.match(t)||a.match(u))return"operator";if(a.match(v))return"atom";var c=a.match(w);if(c)return b.doInCurrentLine?
b.doInCurrentLine=!1:b.currentIndent++,"proc"==c[0]||"fun"==c[0]?b.tokenize=x:"class"==c[0]?b.tokenize=y:"meth"==c[0]&&(b.tokenize=z),"keyword";if(a.match(l)||a.match(A))return"keyword";if(a.match(m))return b.currentIndent--,"keyword";c=a.next();if('"'==c||"'"==c)return b.tokenize=B(c),b.tokenize(a,b);if(/[~\d]/.test(c)){if("~"==c){if(!/^[0-9]/.test(a.peek()))return null;if("0"==a.next()&&a.match(/^[xX][0-9a-fA-F]+/)||a.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/))return"number"}return"0"==c&&a.match(/^[xX][0-9a-fA-F]+/)||
a.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/)?"number":null}if("%"==c)return a.skipToEnd(),"comment";if("/"==c&&a.eat("*"))return b.tokenize=n,n(a,b);if(C.test(c))return"operator";a.eatWhile(/\w/);return"variable"}function y(a,b){if(a.eatSpace())return null;a.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/);b.tokenize=e;return"variable-3"}function z(a,b){if(a.eatSpace())return null;a.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/);b.tokenize=e;return"def"}function x(a,b){if(a.eatSpace())return null;if(!b.hasPassedFirstStage&&
a.eat("{"))return b.hasPassedFirstStage=!0,"bracket";if(b.hasPassedFirstStage)return a.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)|\$/),b.hasPassedFirstStage=!1,b.tokenize=e,"def";b.tokenize=e;return null}function n(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize=e;break}c="*"==d}return"comment"}function B(a){return function(b,c){for(var d=!1,h,p=!1;null!=(h=b.next());){if(h==a&&!d){p=!0;break}d=!d&&"\\"==h}if(p||!d)c.tokenize=e;return"string"}}var C=/[\^@!\|<>#~\.\*\-\+\\/,=]/,u=/(<-)|(:=)|(=<)|(>=)|(<=)|(<:)|(>:)|(=:)|(\\=)|(\\=:)|(!!)|(==)|(::)/,
t=/(:::)|(\.\.\.)|(=<:)|(>=:)/,q="in then else of elseof elsecase elseif catch finally with require prepare import export define do".split(" "),r=["end"],v=g(["true","false","nil","unit"]),A=g("andthen at attr declare feat from lex mod div mode orelse parser prod prop scanner self syn token".split(" ")),w=g("local proc fun case class if cond or dis choice not thread try raise lock for suchthat meth functor".split(" ")),l=g(q),m=g(r);return{startState:function(){return{tokenize:e,currentIndent:0,doInCurrentLine:!1,
hasPassedFirstStage:!1}},token:function(a,b){a.sol()&&(b.doInCurrentLine=0);return b.tokenize(a,b)},indent:function(a,b){b=b.replace(/^\s+|\s+$/g,"");return b.match(m)||b.match(l)||b.match(/(\[])/)?k.indentUnit*(a.currentIndent-1):0>a.currentIndent?0:a.currentIndent*k.indentUnit},fold:"indent",electricInput:function(){var a=q.concat(r);return new RegExp("[\\[\\]]|("+a.join("|")+")$")}(),lineComment:"%",blockCommentStart:"/*",blockCommentEnd:"*/"}});f.defineMIME("text/x-oz","oz")});
