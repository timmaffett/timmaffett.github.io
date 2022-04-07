(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.registerHelper("wordChars","r",/[\w.]/);e.defineMode("r",function(h){function f(a){for(var b={},c=0;c<a.length;++c)b[a[c]]=!0;return b}function k(a,b){d=null;var c=a.next();if("#"==c)return a.skipToEnd(),"comment";if("0"==c&&a.eat("x"))return a.eatWhile(/[\da-f]/i),"number";if("."==c&&a.eat(/\d/))return a.match(/\d*(?:e[+\-]?\d+)?/),
"number";if(/\d/.test(c))return a.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/),"number";if("'"==c||'"'==c)return b.tokenize=u(c),"string";if("`"==c)return a.match(/[^`]+`/),"variable-3";if("."==c&&a.match(/.(?:[.]|\d+)/))return"keyword";if(/[a-zA-Z\.]/.test(c))return a.eatWhile(/[\w\.]/),b=a.current(),v.propertyIsEnumerable(b)?"atom":w.propertyIsEnumerable(b)?(x.propertyIsEnumerable(b)&&!a.match(/\s*if(\s+|$)/,!1)&&(d="block"),"keyword"):y.propertyIsEnumerable(b)?"builtin":"variable";if("%"==c)return a.skipTo("%")&&
a.next(),"operator variable-2";if("<"==c&&a.eat("-")||"<"==c&&a.match("<-")||"-"==c&&a.match(/>>?/))return"operator arrow";if("="==c&&b.ctx.argList)return"arg-is";if(n.test(c)){if("$"==c)return"operator dollar";a.eatWhile(n);return"operator"}return/[\(\){}\[\];]/.test(c)?(d=c,";"==c?"semi":null):null}function u(a){return function(b,c){if(b.eat("\\"))return c=b.next(),"x"==c?b.match(/^[a-f0-9]{2}/i):("u"==c||"U"==c)&&b.eat("{")&&b.skipTo("}")?b.next():"u"==c?b.match(/^[a-f0-9]{4}/i):"U"==c?b.match(/^[a-f0-9]{8}/i):
/[0-7]/.test(c)&&b.match(/^[0-7]{1,2}/),"string-2";for(var l;null!=(l=b.next());){if(l==a){c.tokenize=k;break}if("\\"==l){b.backUp(1);break}}return"string"}}function g(a,b,c){a.ctx={type:b,indent:a.indent,flags:0,column:c.column(),prev:a.ctx}}function p(a,b){var c=a.ctx;a.ctx={type:c.type,indent:c.indent,flags:c.flags|b,column:c.column,prev:c.prev}}function m(a){a.indent=a.ctx.indent;a.ctx=a.ctx.prev}var q="NULL NA Inf NaN NA_integer_ NA_real_ NA_complex_ NA_character_ TRUE FALSE".split(" "),r="list quote bquote eval return call parse deparse".split(" "),
t="if else repeat while function for in next break".split(" ");e.registerHelper("hintWords","r",q.concat(r,t));var v=f(q),y=f(r),w=f(t),x=f("if else repeat while function for".split(" ")),n=/[+\-*\/^<>=!&|~$:]/,d;return{startState:function(){return{tokenize:k,ctx:{type:"top",indent:-h.indentUnit,flags:2},indent:0,afterIdent:!1}},token:function(a,b){a.sol()&&(0==(b.ctx.flags&3)&&(b.ctx.flags|=2),b.ctx.flags&4&&m(b),b.indent=a.indentation());if(a.eatSpace())return null;var c=b.tokenize(a,b);"comment"!=
c&&0==(b.ctx.flags&2)&&p(b,1);";"!=d&&"{"!=d&&"}"!=d||"block"!=b.ctx.type||m(b);"{"==d?g(b,"}",a):"("==d?(g(b,")",a),b.afterIdent&&(b.ctx.argList=!0)):"["==d?g(b,"]",a):"block"==d?g(b,"block",a):d==b.ctx.type?m(b):"block"==b.ctx.type&&"comment"!=c&&p(b,4);b.afterIdent="variable"==c||"keyword"==c;return c},indent:function(a,b){if(a.tokenize!=k)return 0;b=b&&b.charAt(0);a=a.ctx;var c=b==a.type;a.flags&4&&(a=a.prev);return"block"==a.type?a.indent+("{"==b?0:h.indentUnit):a.flags&1?a.column+(c?0:1):a.indent+
(c?0:h.indentUnit)},lineComment:"#"}});e.defineMIME("text/x-rsrc","r")});