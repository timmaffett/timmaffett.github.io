(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("sieve",function(l){function h(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function f(a,b){var c=a.next();if("/"==c&&a.eat("*"))return b.tokenize=k,k(a,b);if("#"===c)return a.skipToEnd(),"comment";if('"'==c)return b.tokenize=m(c),b.tokenize(a,b);if("("==c)return b._indent.push("("),
b._indent.push("{"),null;if("{"===c)return b._indent.push("{"),null;")"==c&&(b._indent.pop(),b._indent.pop());if("}"===c)return b._indent.pop(),null;if(","==c||";"==c||/[{}\(\),;]/.test(c))return null;if(/\d/.test(c))return a.eatWhile(/[\d]/),a.eat(/[KkMmGg]/),"number";if(":"==c)return a.eatWhile(/[a-zA-Z_]/),a.eatWhile(/[a-zA-Z0-9_]/),"operator";a.eatWhile(/\w/);c=a.current();return"text"==c&&a.eat(":")?(b.tokenize=n,"string"):p.propertyIsEnumerable(c)?"keyword":q.propertyIsEnumerable(c)?"atom":
null}function n(a,b){b._multiLineString=!0;if(!a.sol()){a.eatSpace();if("#"==a.peek())return a.skipToEnd(),"comment";a.skipToEnd();return"string"}"."==a.next()&&a.eol()&&(b._multiLineString=!1,b.tokenize=f);return"string"}function k(a,b){for(var c=!1,d;null!=(d=a.next());){if(c&&"/"==d){b.tokenize=f;break}c="*"==d}return"comment"}function m(a){return function(b,c){for(var d=!1,g;null!=(g=b.next())&&(g!=a||d);)d=!d&&"\\"==g;d||(c.tokenize=f);return"string"}}var p=h("if elsif else stop require"),q=
h("true false not"),r=l.indentUnit;return{startState:function(a){return{tokenize:f,baseIndent:a||0,_indent:[]}},token:function(a,b){return a.eatSpace()?null:(b.tokenize||f)(a,b)},indent:function(a,b){a=a._indent.length;b&&"}"==b[0]&&a--;0>a&&(a=0);return a*r},electricChars:"}"}});e.defineMIME("application/sieve","sieve")});
